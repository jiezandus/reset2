import { useEffect, useRef, useState, useCallback } from 'react';
import SpeechBubble from './SpeechBubble';

interface PongGameProps {
  senderName: string;
  recipientName: string;
  reason: string;
  onGameEnd: (winner: 'recipient' | 'sender') => void;
}

interface Bubble {
  id: number;
  message: string;
  x: number;
  y: number;
}

const APOLOGY_MESSAGES = [
  "I'm sorry! 😢",
  "My bad...",
  "Forgive me? 🥺",
  "I messed up",
  "Please? 💛",
  "I was wrong",
  "Can we talk?",
  "Miss you 💔",
  "I regret it",
  "You're right",
];

const PongGame = ({ senderName, recipientName, reason, onGameEnd }: PongGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [recipientScore, setRecipientScore] = useState(0);
  const [senderScore, setSenderScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gameStateRef = useRef({
    ballX: 0,
    ballY: 0,
    ballVX: 4,
    ballVY: 3,
    playerY: 0,
    aiY: 0,
    playerDir: 0,
    lastBubbleTime: 0,
    bubbleId: 0,
  });

  const PADDLE_HEIGHT = 60;
  const PADDLE_WIDTH = 10;
  const BALL_SIZE = 10;
  const WINNING_SCORE = 10;

  const addBubble = useCallback((x: number, y: number) => {
    const message = APOLOGY_MESSAGES[Math.floor(Math.random() * APOLOGY_MESSAGES.length)];
    const id = gameStateRef.current.bubbleId++;
    setBubbles(prev => [...prev, { id, message, x, y }]);
  }, []);

  const removeBubble = useCallback((id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  }, []);

  const movePlayerUp = useCallback(() => {
    gameStateRef.current.playerDir = -8;
  }, []);

  const movePlayerDown = useCallback(() => {
    gameStateRef.current.playerDir = 8;
  }, []);

  const stopPlayer = useCallback(() => {
    gameStateRef.current.playerDir = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayerUp();
      if (e.key === 'ArrowDown' || e.key === 's') movePlayerDown();
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
  }, [movePlayerUp, movePlayerDown, stopPlayer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Clear canvas
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--screen-bg')
        .trim();
      ctx.fillStyle = '#f5f0e1';
      ctx.fillRect(0, 0, width, height);

      // Draw center line
      ctx.setLineDash([5, 10]);
      ctx.strokeStyle = '#d4cfc0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update player paddle
      state.playerY += state.playerDir;
      state.playerY = Math.max(0, Math.min(height - PADDLE_HEIGHT, state.playerY));

      // AI paddle logic (intentionally bad - follows with delay and misses)
      const aiCenter = state.aiY + PADDLE_HEIGHT / 2;
      const targetY = state.ballX > width * 0.5 
        ? state.ballY + (Math.random() - 0.5) * 80 // Add randomness when ball is near
        : height / 2;
      
      // AI moves slower and sometimes in wrong direction
      const aiSpeed = 2 + Math.random() * 2;
      if (Math.random() > 0.15) { // 85% chance to move towards ball
        if (aiCenter < targetY - 30) state.aiY += aiSpeed;
        else if (aiCenter > targetY + 30) state.aiY -= aiSpeed;
      } else {
        // Sometimes move wrong direction
        if (aiCenter < targetY) state.aiY -= aiSpeed;
        else state.aiY += aiSpeed;
      }
      state.aiY = Math.max(0, Math.min(height - PADDLE_HEIGHT, state.aiY));

      // Update ball
      state.ballX += state.ballVX;
      state.ballY += state.ballVY;

      // Ball collision with top/bottom
      if (state.ballY <= BALL_SIZE / 2 || state.ballY >= height - BALL_SIZE / 2) {
        state.ballVY *= -1;
        state.ballY = Math.max(BALL_SIZE / 2, Math.min(height - BALL_SIZE / 2, state.ballY));
      }

      // Ball collision with player paddle (left)
      if (
        state.ballX <= PADDLE_WIDTH + BALL_SIZE / 2 + 10 &&
        state.ballY >= state.playerY &&
        state.ballY <= state.playerY + PADDLE_HEIGHT
      ) {
        state.ballVX = Math.abs(state.ballVX) * 1.05;
        state.ballX = PADDLE_WIDTH + BALL_SIZE / 2 + 11;
        // Add spin based on where ball hits paddle
        const hitPos = (state.ballY - state.playerY) / PADDLE_HEIGHT;
        state.ballVY = (hitPos - 0.5) * 8;
      }

      // Ball collision with AI paddle (right)
      if (
        state.ballX >= width - PADDLE_WIDTH - BALL_SIZE / 2 - 10 &&
        state.ballY >= state.aiY &&
        state.ballY <= state.aiY + PADDLE_HEIGHT
      ) {
        state.ballVX = -Math.abs(state.ballVX) * 1.02;
        state.ballX = width - PADDLE_WIDTH - BALL_SIZE / 2 - 11;
        const hitPos = (state.ballY - state.aiY) / PADDLE_HEIGHT;
        state.ballVY = (hitPos - 0.5) * 6;

        // Show apology bubble
        if (timestamp - state.lastBubbleTime > 1500) {
          state.lastBubbleTime = timestamp;
          addBubble(width - 80, state.aiY - 10);
        }
      }

      // Scoring
      if (state.ballX < 0) {
        // AI scored (this should be rare)
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
        // Player scored!
        setRecipientScore(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            cancelAnimationFrame(animationId);
            onGameEnd('recipient');
          }
          return newScore;
        });
        resetBall(width, height);
        // Show celebration bubble
        addBubble(width - 80, state.aiY);
      }

      // Draw paddles
      ctx.fillStyle = '#2d2a26';
      // Player paddle (left)
      ctx.beginPath();
      ctx.roundRect(10, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 5);
      ctx.fill();
      // AI paddle (right)
      ctx.beginPath();
      ctx.roundRect(width - PADDLE_WIDTH - 10, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT, 5);
      ctx.fill();

      // Draw ball
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, BALL_SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Draw scores
      ctx.font = 'bold 24px Nunito';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#b8b3a4';
      ctx.fillText(recipientScore.toString(), width / 4, 40);
      ctx.fillText(senderScore.toString(), (width / 4) * 3, 40);

      // Draw player names
      ctx.font = '12px Nunito';
      ctx.fillStyle = '#8a857a';
      ctx.fillText(recipientName, width / 4, 60);
      ctx.fillText(senderName, (width / 4) * 3, 60);

      animationId = requestAnimationFrame(gameLoop);
    };

    const resetBall = (w: number, h: number) => {
      state.ballX = w / 2;
      state.ballY = h / 2;
      state.ballVX = (Math.random() > 0.5 ? 4 : -4);
      state.ballVY = (Math.random() - 0.5) * 6;
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
      <div className="relative w-full aspect-[4/3] bg-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Hey {recipientName}! 👋
        </h2>
        <p className="text-muted-foreground mb-4">
          {senderName} wants to say sorry for:
        </p>
        <p className="text-foreground font-semibold mb-6 italic">
          "{reason}"
        </p>
        <button
          onClick={() => setGameStarted(true)}
          className="action-button px-6 py-3 rounded-xl font-bold text-foreground"
        >
          Let's Play! 🎮
        </button>
        <p className="text-xs text-muted-foreground mt-4">
          Beat {senderName} in Pong to accept the apology
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-[4/3] bg-screen"
      onTouchStart={(e) => {
        const touch = e.touches[0];
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const y = touch.clientY - rect.top;
          if (y < rect.height / 2) movePlayerUp();
          else movePlayerDown();
        }
      }}
      onTouchEnd={stopPlayer}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
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
};

export default PongGame;
