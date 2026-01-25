import { useState, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ConsoleFrame from '@/components/ConsoleFrame';
import PongGame, { PongGameRef } from '@/components/PongGame';
import GameEndScreen from '@/components/GameEndScreen';

const Play = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const [winner, setWinner] = useState<'recipient' | 'sender'>('recipient');
  const gameRef = useRef<PongGameRef>(null);

  const senderName = searchParams.get('sender') || 'Someone';
  const recipientName = searchParams.get('recipient') || 'Friend';
  const reason = searchParams.get('reason') || 'something';

  const handleGameEnd = useCallback((gameWinner: 'recipient' | 'sender') => {
    setWinner(gameWinner);
    setGameState('ended');
  }, []);

  // Validate that we have the required params
  if (!searchParams.get('sender') || !searchParams.get('recipient')) {
    return (
      <ConsoleFrame>
        <div className="p-4 min-h-full flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#c4cfa1' }}>
          <p className="text-3xl mb-2">🤔</p>
          <h2 className="text-sm font-bold text-foreground mb-1 pixel-text">INVALID LINK</h2>
          <p className="text-xs text-muted-foreground mb-3">
            This game link is broken.
          </p>
          <button
            onClick={() => navigate('/')}
            className="action-button px-4 py-2 rounded-lg font-bold text-foreground text-sm"
          >
            Create New
          </button>
        </div>
      </ConsoleFrame>
    );
  }

  return (
    <ConsoleFrame
      showDpad={gameState === 'playing'}
      onDpadUp={() => gameRef.current?.moveUp()}
      onDpadDown={() => gameRef.current?.moveDown()}
      onDpadRelease={() => gameRef.current?.stopMove()}
      onButtonA={() => gameRef.current?.startGame()}
      onButtonB={() => navigate('/')}
    >
      {gameState === 'playing' ? (
        <PongGame
          ref={gameRef}
          senderName={senderName}
          recipientName={recipientName}
          reason={reason}
          onGameEnd={handleGameEnd}
        />
      ) : (
        <GameEndScreen
          senderName={senderName}
          recipientName={recipientName}
          winner={winner}
        />
      )}
    </ConsoleFrame>
  );
};

export default Play;
