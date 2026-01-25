import { useState, useCallback, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ConsoleFrame from '@/components/ConsoleFrame';
import PongGame from '@/components/PongGame';
import GameEndScreen, { type GameEndScreenRef } from '@/components/GameEndScreen';
import { decodeGameData } from '@/lib/urlEncoder';

const Play = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const [winner, setWinner] = useState<'recipient' | 'sender'>('recipient');
  const [playerDir, setPlayerDir] = useState<'up' | 'down' | null>(null);
  const endScreenRef = useRef<GameEndScreenRef | null>(null);

  // Decode the obscured game data
  const gameData = useMemo(() => {
    const encoded = searchParams.get('d');
    if (encoded) {
      return decodeGameData(encoded);
    }
    // Fallback to legacy plain params for old links
    return {
      sender: searchParams.get('sender') || '',
      recipient: searchParams.get('recipient') || '',
      reason: searchParams.get('reason') || '',
    };
  }, [searchParams]);

  const senderName = gameData?.sender || 'Someone';
  const recipientName = gameData?.recipient || 'Friend';
  const reason = gameData?.reason || 'something';
  const handleGameEnd = useCallback((gameWinner: 'recipient' | 'sender') => {
    setWinner(gameWinner);
    setGameState('ended');
  }, []);

  // Validate that we have the required params
  if (!gameData?.sender || !gameData?.recipient) {
    return <ConsoleFrame>
        <div className="p-6 min-h-[300px] flex flex-col items-center justify-center text-center bg-secondary">
          <p className="text-4xl mb-3">🤔</p>
          <h2 className="text-xl font-bold text-foreground mb-2">Invalid Link</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This game link seems to be broken.
          </p>
          <button onClick={() => navigate('/')} className="action-button px-5 py-2.5 rounded-xl font-bold text-foreground">
            Create New Game
          </button>
        </div>
      </ConsoleFrame>;
  }
  const pongGameRef = useRef<import('@/components/PongGame').PongGameRef | null>(null);
  
  return <ConsoleFrame showDpad={gameState === 'playing'} onDpadUp={() => {
    pongGameRef.current?.moveUp();
  }} onDpadDown={() => {
    pongGameRef.current?.moveDown();
  }} onDpadRelease={() => {
    pongGameRef.current?.stopMove();
  }} onButtonA={() => {
    if (gameState === 'playing') {
      pongGameRef.current?.startGame();
    }
  }} onButtonB={gameState === 'ended' ? () => endScreenRef.current?.pressB() : undefined}>
      {gameState === 'playing' ? <PongGame ref={pongGameRef} senderName={senderName} recipientName={recipientName} reason={reason} onGameEnd={handleGameEnd} /> : <GameEndScreen ref={endScreenRef} senderName={senderName} recipientName={recipientName} reason={reason} winner={winner} onBack={() => setGameState('playing')} />}
    </ConsoleFrame>;
};
export default Play;