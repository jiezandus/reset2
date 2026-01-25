import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import SpeechBubble from './SpeechBubble';

interface PongGameProps {
  senderName: string;
  recipientName: string;
  reason: string;
  onGameEnd: (winner: 'recipient' | 'sender') => void;
  onStartGame?: () => void;
}

export interface PongGameRef {
  moveUp: () => void;
  moveDown: () => void;
  stopMove: () => void;
  startGame: () => void;
}

interface Bubble {
  id: number;
  message: string;
  x: number;
  y: number;
}

const APOLOGY_MESSAGES = [
  "SORRY!",
  "MY BAD",
  "FORGIVE?",
  "OOPS",
  "PLEASE?",
  "I WAS WRONG",
  "MISS U",
  "IM SORRY",
];

const PongGame = forwardRef<PongGameRef, PongGameProps>(({ 
  senderName, 
  recipientName, 
  reason, 
  onGameEnd,
  onStartGame 
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [recipientScore, setRecipientScore] = useState(0);
  const [senderScore, setSenderScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gameStateRef = useRef({
    ballX: 0,
    ballY: 0,
    ballVX: 3,
    ballVY: 2,
    playerY: 0,
    aiY: 0,
    playerDir: 0,
    lastBubbleTime: 0,
    bubbleId: 0,
  });

  const PADDLE_HEIGHT = 40;
  const PADDLE_WIDTH = 6;
  const BALL_SIZE = 6;
  const WINNING_SCORE = 10;
  const PIXEL_SIZE = 2; // Base pixel size for retro look

  const addBubble = useCallback((x: number, y: number) => {
    const message = APOLOGY_MESSAGES[Math.floor(Math.random() * APOLOGY_MESSAGES.length)];
    const id = gameStateRef.current.bubbleId++;
    setBubbles(prev => [...prev, { id, message, x, y }]);
  }, []);

  const removeBubble = useCallback((id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  }, []);

  const movePlayerUp = useCallback(() => {
    gameStateRef.current.playerDir = -6;
  }, []);

  const movePlayerDown = useCallback(() => {
    gameStateRef.current.playerDir = 6;
  }, []);

  const stopPlayer = useCallback(() => {
    gameStateRef.current.playerDir = 0;
  }, []);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    onStartGame?.();
  }, [onStartGame]);

  useImperativeHandle(ref, () => ({
    moveUp: movePlayerUp,
    moveDown: movePlayerDown,
    stopMove: stopPlayer,
    startGame: handleStartGame,
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayerUp();
      if (e.key === 'ArrowDown' || e.key === 's') movePlayerDown();
      if (e.key === ' ' || e.key === 'Enter') {
        if (!gameStarted) handleStartGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) stopPlayer();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePlayerUp, movePlayerDown, stopPlayer, gameStarted, handleStartGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable image smoothing for pixelated look
    ctx.imageSmoothingEnabled = false;

    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize game state
    const state = gameStateRef.current;
    state.ballX = width / 2;
    state.ballY = height / 2;
    state.playerY = height / 2 - PADDLE_HEIGHT / 2;
    state.aiY = height / 2 - PADDLE_HEIGHT / 2;

    let animationId: number;
    let lastTime = 0;

    // Helper function to draw pixelated rectangle
    const drawPixelRect = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      // Snap to pixel grid
      const px = Math.floor(x / PIXEL_SIZE) * PIXEL_SIZE;
      const py = Math.floor(y / PIXEL_SIZE) * PIXEL_SIZE;
      const pw = Math.floor(w / PIXEL_SIZE) * PIXEL_SIZE;
      const ph = Math.floor(h / PIXEL_SIZE) * PIXEL_SIZE;
      ctx.fillRect(px, py, pw, ph);
    };

    // Helper function to draw pixelated circle (as square for retro look)
    const drawPixelBall = (x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      const px = Math.floor(x / PIXEL_SIZE) * PIXEL_SIZE;
      const py = Math.floor(y / PIXEL_SIZE) * PIXEL_SIZE;
      ctx.fillRect(px - size, py - size, size * 2, size * 2);
    };

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Clear canvas with retro cream/green-ish background
      ctx.fillStyle = '#c4cfa1'; // Classic LCD green tint
      ctx.fillRect(0, 0, width, height);

      // Draw dotted center line (pixelated)
      const dotSize = PIXEL_SIZE * 2;
      const gap = PIXEL_SIZE * 4;
      ctx.fillStyle = '#9ca87a';
      for (let y = 0; y < height; y += dotSize + gap) {
        const px = Math.floor((width / 2 - dotSize / 2) / PIXEL_SIZE) * PIXEL_SIZE;
        ctx.fillRect(px, y, dotSize, dotSize);
      }

      // Update player paddle
      state.playerY += state.playerDir;
      state.playerY = Math.max(0, Math.min(height - PADDLE_HEIGHT, state.playerY));

      // AI paddle logic (intentionally bad)
      const aiCenter = state.aiY + PADDLE_HEIGHT / 2;
      const targetY = state.ballX > width * 0.5 
        ? state.ballY + (Math.random() - 0.5) * 60
        : height / 2;
      
      const aiSpeed = 1.5 + Math.random() * 1.5;
      if (Math.random() > 0.2) {
        if (aiCenter < targetY - 25) state.aiY += aiSpeed;
        else if (aiCenter > targetY + 25) state.aiY -= aiSpeed;
      } else {
        if (aiCenter < targetY) state.aiY -= aiSpeed;
        else state.aiY += aiSpeed;
      }
      state.aiY = Math.max(0, Math.min(height - PADDLE_HEIGHT, state.aiY));

      // Update ball
      state.ballX += state.ballVX;
      state.ballY += state.ballVY;

      // Ball collision with top/bottom
      if (state.ballY <= BALL_SIZE || state.ballY >= height - BALL_SIZE) {
        state.ballVY *= -1;
        state.ballY = Math.max(BALL_SIZE, Math.min(height - BALL_SIZE, state.ballY));
      }

      // Ball collision with player paddle (left)
      if (
        state.ballX <= PADDLE_WIDTH + BALL_SIZE + 8 &&
        state.ballY >= state.playerY &&
        state.ballY <= state.playerY + PADDLE_HEIGHT
      ) {
        state.ballVX = Math.abs(state.ballVX) * 1.03;
        state.ballX = PADDLE_WIDTH + BALL_SIZE + 9;
        const hitPos = (state.ballY - state.playerY) / PADDLE_HEIGHT;
        state.ballVY = (hitPos - 0.5) * 6;
      }

      // Ball collision with AI paddle (right)
      if (
        state.ballX >= width - PADDLE_WIDTH - BALL_SIZE - 8 &&
        state.ballY >= state.aiY &&
        state.ballY <= state.aiY + PADDLE_HEIGHT
      ) {
        state.ballVX = -Math.abs(state.ballVX) * 1.02;
        state.ballX = width - PADDLE_WIDTH - BALL_SIZE - 9;
        const hitPos = (state.ballY - state.aiY) / PADDLE_HEIGHT;
        state.ballVY = (hitPos - 0.5) * 5;

        if (timestamp - state.lastBubbleTime > 1500) {
          state.lastBubbleTime = timestamp;
          addBubble(width - 60, state.aiY - 10);
        }
      }

      // Scoring
      if (state.ballX < 0) {
        setSenderScore(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            cancelAnimationFrame(animationId);
            onGameEnd('sender');
          }
          return newScore;
        });
        resetBall(width, height);
      } else if (state.ballX > width) {
        setRecipientScore(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            cancelAnimationFrame(animationId);
            onGameEnd('recipient');
          }
          return newScore;
        });
        resetBall(width, height);
        addBubble(width - 60, state.aiY);
      }

      // Draw paddles (dark color for LCD look)
      const paddleColor = '#1a1a1a';
      drawPixelRect(8, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT, paddleColor);
      drawPixelRect(width - PADDLE_WIDTH - 8, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT, paddleColor);

      // Draw ball
      drawPixelBall(state.ballX, state.ballY, BALL_SIZE, paddleColor);

      // Draw scores (pixelated)
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1a1a1a';
      
      // Score display
      ctx.fillText(recipientScore.toString(), width / 4, 24);
      ctx.fillText(senderScore.toString(), (width / 4) * 3, 24);

      // Player names (smaller)
      ctx.font = '8px monospace';
      ctx.fillStyle = '#4a4a4a';
      const shortRecipient = recipientName.slice(0, 8).toUpperCase();
      const shortSender = senderName.slice(0, 8).toUpperCase();
      ctx.fillText(shortRecipient, width / 4, 38);
      ctx.fillText(shortSender, (width / 4) * 3, 38);

      animationId = requestAnimationFrame(gameLoop);
    };

    const resetBall = (w: number, h: number) => {
      state.ballX = w / 2;
      state.ballY = h / 2;
      state.ballVX = (Math.random() > 0.5 ? 3 : -3);
      state.ballVY = (Math.random() - 0.5) * 4;
    };

    if (gameStarted) {
      animationId = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [gameStarted, recipientScore, senderScore, senderName, recipientName, addBubble, onGameEnd]);

  if (!gameStarted) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center" style={{ backgroundColor: '#c4cfa1' }}>
        <div className="space-y-3 animate-slide-up">
          <h2 className="text-lg font-bold text-foreground pixel-text" style={{ fontSize: '12px' }}>
            HEY {recipientName.toUpperCase().slice(0, 10)}!
          </h2>
          <p className="text-xs text-muted-foreground">
            {senderName} wants to say sorry for:
          </p>
          <p className="text-sm font-semibold text-foreground italic px-2">
            "{reason.slice(0, 50)}{reason.length > 50 ? '...' : ''}"
          </p>
          <div className="pt-2">
            <span className="text-xs text-muted-foreground animate-blink">
              ▶ PRESS A TO START
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground pt-2">
            Beat {senderName} to accept!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      style={{ backgroundColor: '#c4cfa1' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: 'pixelated' }} />
      {bubbles.map(bubble => (
        <SpeechBubble
          key={bubble.id}
          message={bubble.message}
          x={bubble.x}
          y={bubble.y}
          onComplete={() => removeBubble(bubble.id)}
        />
      ))}
    </div>
  );
});

PongGame.displayName = 'PongGame';

export default PongGame;
