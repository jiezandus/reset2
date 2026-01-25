import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface GameEndScreenProps {
  senderName: string;
  recipientName: string;
  winner: 'recipient' | 'sender';
}

const REPLY_MESSAGES = [
  { text: "ACCEPTED!" },
  { text: "FORGIVEN!" },
  { text: "WE'RE GOOD!" },
  { text: "GG!" },
  { text: "MISSED U!" },
];

const GameEndScreen = ({ senderName, recipientName, winner }: GameEndScreenProps) => {
  const [selectedReply, setSelectedReply] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (selectedReply === null) return;

    const reply = REPLY_MESSAGES[selectedReply];
    const shareText = `From ${recipientName}: "${reply.text}" — via RESET`;

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
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
      {winner === 'recipient' ? (
        <div className="flex flex-col items-center animate-pop-in">
          {/* Pixel heart */}
          <div className="inline-block mb-3 animate-bounce-soft">
            <div className="flex justify-center gap-[2px]">
              <div className="w-3 h-3 bit-fg" />
              <div className="w-3 h-3" />
              <div className="w-3 h-3 bit-fg" />
            </div>
            <div className="flex justify-center gap-[2px]">
              <div className="w-3 h-3 bit-fg" />
              <div className="w-3 h-3 bit-fg" />
              <div className="w-3 h-3 bit-fg" />
            </div>
            <div className="flex justify-center gap-[2px] mt-[2px]">
              <div className="w-3 h-3" />
              <div className="w-3 h-3 bit-fg" />
              <div className="w-3 h-3" />
            </div>
          </div>
          
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">
            You Won!
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            {senderName}'s apology accepted
          </p>

          <p className="text-[9px] bit-text uppercase tracking-wide mb-2">
            Send a reply:
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-w-full">
            {REPLY_MESSAGES.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedReply(idx)}
                className={`px-2 py-1.5 text-[9px] font-bold transition-all ${
                  selectedReply === idx 
                    ? 'bit-button scale-105' 
                    : 'bit-button-outline'
                }`}
              >
                {msg.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleShare}
            disabled={selectedReply === null}
            className="bit-button px-4 py-2 text-xs flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                OK!
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                Share
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-pop-in">
          {/* Pixel sad face */}
          <div className="inline-block mb-3">
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bit-fg" />
              <div className="w-2 h-2" />
              <div className="w-2 h-2 bit-fg" />
            </div>
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-2" />
              <div className="w-2 h-2" />
              <div className="w-2 h-2" />
            </div>
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-2" />
              <div className="w-2 h-2 bit-fg" />
              <div className="w-2 h-2" />
            </div>
          </div>
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">
            Oops!
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            {senderName} won somehow...
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bit-button px-4 py-2 text-xs"
          >
            Try Again ►
          </button>
        </div>
      )}
    </div>
  );
};

export default GameEndScreen;