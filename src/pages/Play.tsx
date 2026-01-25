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
        <div className="p-4 h-full flex flex-col items-center justify-center text-center bit-bg">
          {/* Pixel X mark */}
          <div className="inline-block mb-3">
            <div className="flex justify-center gap-[2px]">
              <div className="w-2 h-2 bit-fg" />
              <div className="w-2 h-2" />
              <div className="w-2 h-2 bit-fg" />
            </div>
            <div className="flex justify-center gap-[2px]">
              <div className="w-2 h-2" />
              <div className="w-2 h-2 bit-fg" />
              <div className="w-2 h-2" />
            </div>
            <div className="flex justify-center gap-[2px]">
              <div className="w-2 h-2 bit-fg" />
              <div className="w-2 h-2" />
              <div className="w-2 h-2 bit-fg" />
            </div>
          </div>
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">Invalid Link</h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            This game link is broken.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bit-button px-4 py-2 text-xs"
          >
            Create New ►
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