import { useState } from 'react';
import { Share2, Copy, Check, Heart } from 'lucide-react';

interface GameEndScreenProps {
  senderName: string;
  recipientName: string;
  winner: 'recipient' | 'sender';
}

const REPLY_MESSAGES = [
  { emoji: '💛', text: "ACCEPTED!" },
  { emoji: '🤗', text: "FORGIVEN!" },
  { emoji: '😊', text: "WE'RE GOOD!" },
  { emoji: '🎮', text: "GG!" },
  { emoji: '💕', text: "MISSED U!" },
];

const GameEndScreen = ({ senderName, recipientName, winner }: GameEndScreenProps) => {
  const [selectedReply, setSelectedReply] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (selectedReply === null) return;

    const reply = REPLY_MESSAGES[selectedReply];
    const shareText = `${reply.emoji} From ${recipientName}: "${reply.text}" — via RESET 💛`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RESET - Reply',
          text: shareText,
        });
      } catch (err) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center" style={{ backgroundColor: '#c4cfa1' }}>
      {winner === 'recipient' ? (
        <div className="flex flex-col items-center">
          <div className="animate-pop-in">
            <Heart className="w-8 h-8 text-foreground mx-auto mb-2 animate-bounce-soft" fill="currentColor" />
          </div>
          <h2 className="text-sm font-bold text-foreground mb-1 pixel-text animate-slide-up">
            YOU WON!
          </h2>
          <p className="text-xs text-muted-foreground mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {senderName}'s apology accepted
          </p>

          <p className="text-[10px] text-muted-foreground mb-2">
            Send a reply:
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-3 max-w-full">
            {REPLY_MESSAGES.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedReply(idx)}
                className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200
                  ${selectedReply === idx 
                    ? 'bg-primary text-foreground scale-105' 
                    : 'bg-card text-muted-foreground'
                  }`}
              >
                {msg.emoji} {msg.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleShare}
            disabled={selectedReply === null}
            className={`action-button px-4 py-2 rounded-lg font-bold text-foreground flex items-center gap-1.5 text-sm
              ${selectedReply === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                OK!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-3xl mb-2">🫣</p>
          <h2 className="text-sm font-bold text-foreground mb-1 pixel-text">
            OOPS!
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            {senderName} won somehow...
          </p>
          <button
            onClick={() => window.location.reload()}
            className="action-button px-4 py-2 rounded-lg font-bold text-foreground text-sm"
          >
            Try Again 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default GameEndScreen;
