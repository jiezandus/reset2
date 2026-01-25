import { useState } from 'react';
import { Share2, Copy, Check, Heart } from 'lucide-react';

interface GameEndScreenProps {
  senderName: string;
  recipientName: string;
  winner: 'recipient' | 'sender';
}

const REPLY_MESSAGES = [
  { emoji: '💛', text: "Apology accepted! Let's move on." },
  { emoji: '🤗', text: "I forgive you. Hugs!" },
  { emoji: '😊', text: "We're good now. Thanks for playing!" },
  { emoji: '🎮', text: "Good game! All is forgiven." },
  { emoji: '💕', text: "I missed you too. Let's talk." },
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
          title: 'RESET - Ice Breaker Reply',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
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
    <div className="w-full aspect-[4/3] bg-screen flex flex-col items-center justify-center p-4 text-center">
      {winner === 'recipient' ? (
        <>
          <div className="animate-pop-in">
            <Heart className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce-soft" fill="currentColor" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1 animate-slide-up">
            You Won! 🎉
          </h2>
          <p className="text-sm text-muted-foreground mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {senderName}'s apology is accepted
          </p>

          <p className="text-xs text-muted-foreground mb-3">
            Choose a reply to send back:
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-4 max-w-xs">
            {REPLY_MESSAGES.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedReply(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                  ${selectedReply === idx 
                    ? 'bg-primary text-foreground scale-105' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
              >
                {msg.emoji} {msg.text.slice(0, 20)}...
              </button>
            ))}
          </div>

          <button
            onClick={handleShare}
            disabled={selectedReply === null}
            className={`action-button px-5 py-2.5 rounded-xl font-bold text-foreground flex items-center gap-2
              ${selectedReply === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share Reply
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <p className="text-4xl mb-3">🫣</p>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Oops! {senderName} Won?
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            That wasn't supposed to happen...
          </p>
          <button
            onClick={() => window.location.reload()}
            className="action-button px-5 py-2.5 rounded-xl font-bold text-foreground"
          >
            Try Again 🔄
          </button>
        </>
      )}
    </div>
  );
};

export default GameEndScreen;
