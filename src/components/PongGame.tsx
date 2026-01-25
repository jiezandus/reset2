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
    ballVX: 1.8, // 60% of original 3
    ballVY: 1.2, // 60% of original 2
    playerY: 0,
    aiY: 0,
    playerDir: 0,
    lastBubbleTime: 0,
    bubbleId: 0,
  });

  const PADDLE_HEIGHT = 120; // doubled from 60
  const PADDLE_WIDTH = 8;
  const BALL_SIZE = 6;
  const WINNING_SCORE = 10;
  const PIXEL_SIZE = 2;

  // 1-bit colors
  const BIT_WHITE = '#c8d4a2'; // LCD light
  const BIT_BLACK = '#1a1a1a'; // LCD dark

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

    ctx.imageSmoothingEnabled = false;

    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const state = gameStateRef.current;
    state.ballX = width / 2;
    state.ballY = height / 2;
    state.playerY = height / 2 - PADDLE_HEIGHT / 2;
    state.aiY = height / 2 - PADDLE_HEIGHT / 2;

    let animationId: number;
    let lastTime = 0;

    const snapToGrid = (val: number) => Math.floor(val / PIXEL_SIZE) * PIXEL_SIZE;

    const drawPixelRect = (x: number, y: number, w: number, h: number) => {
      ctx.fillStyle = BIT_BLACK;
      ctx.fillRect(snapToGrid(x), snapToGrid(y), snapToGrid(w), snapToGrid(h));
    };

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Clear with 1-bit white
      ctx.fillStyle = BIT_WHITE;
      ctx.fillRect(0, 0, width, height);

      // Draw dotted center line
      const dotSize = PIXEL_SIZE * 2;
      const gap = PIXEL_SIZE * 6;
      ctx.fillStyle = BIT_BLACK;
      for (let y = 0; y < height; y += dotSize + gap) {
        ctx.fillRect(snapToGrid(width / 2 - dotSize / 2), y, dotSize, dotSize);
      }

      // Update player paddle
      state.playerY += state.playerDir;
      state.playerY = Math.max(0, Math.min(height - PADDLE_HEIGHT, state.playerY));

      // AI paddle (intentionally bad)
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

      // Ball collision with player paddle
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

      // Ball collision with AI paddle
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
          addBubble(width - 100, state.aiY - 10);
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
        addBubble(width - 100, state.aiY);
      }

      // Draw paddles (chunky pixels)
      drawPixelRect(6, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
      drawPixelRect(width - PADDLE_WIDTH - 6, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball (square for 1-bit look)
      ctx.fillStyle = BIT_BLACK;
      ctx.fillRect(
        snapToGrid(state.ballX - BALL_SIZE),
        snapToGrid(state.ballY - BALL_SIZE),
        BALL_SIZE * 2,
        BALL_SIZE * 2
      );

      // Draw scores
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = BIT_BLACK;
      ctx.fillText(recipientScore.toString(), width / 4, 28);
      ctx.fillText(senderScore.toString(), (width / 4) * 3, 28);

      // Player labels
      ctx.font = 'bold 8px monospace';
      ctx.fillStyle = BIT_BLACK;
      const shortRecipient = recipientName.slice(0, 6).toUpperCase();
      const shortSender = senderName.slice(0, 6).toUpperCase();
      ctx.fillText(shortRecipient, width / 4, 42);
      ctx.fillText(shortSender, (width / 4) * 3, 42);

      animationId = requestAnimationFrame(gameLoop);
    };

    const resetBall = (w: number, h: number) => {
      state.ballX = w / 2;
      state.ballY = h / 2;
      state.ballVX = (Math.random() > 0.5 ? 1.8 : -1.8); // 60% speed
      state.ballVY = (Math.random() - 0.5) * 2.4; // 60% speed
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
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="space-y-3 animate-slide-up">
          <h2 className="text-xs font-bold bit-text pixel-text uppercase">
            HEY {recipientName.toUpperCase().slice(0, 8)}!
          </h2>
          <p className="text-[10px] bit-text opacity-70 px-4">
            {senderName} has prepared a surprise challenge for you.
          </p>
          <p className="text-[10px] bit-text opacity-70">
            Accept to beat them!
          </p>
          <div className="pt-3">
            <span className="text-[10px] bit-text animate-blink-cursor">
              ▶ PRESS A TO START
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full bit-bg"
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
