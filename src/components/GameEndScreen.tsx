import { forwardRef, useImperativeHandle, useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

type GamePhase = 'apology' | 'reply' | 'success';

interface GameEndScreenProps {
  senderName: string;
  recipientName: string;
  reason: string;
  winner: 'recipient' | 'sender';
  onBack?: () => void;
}

export interface GameEndScreenRef {
  pressB: () => void;
}

const REPLY_OPTIONS = [
  { id: 'ok', text: "I'm actually ok. Don't worry.", shortText: "ALL GOOD" },
  { id: 'talk', text: "Apology accepted. Let's talk.", shortText: "LET'S TALK" },
  { id: 'time', text: "Give me more time. I'll reach out.", shortText: "NEED TIME" },
];

const GameEndScreen = forwardRef<GameEndScreenRef, GameEndScreenProps>(
  ({ senderName, recipientName, reason, winner, onBack }, ref) => {
  const [phase, setPhase] = useState<GamePhase>('apology');
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleContinueToReply = () => {
    setPhase('reply');
  };

  const selectedOption = REPLY_OPTIONS.find(opt => opt.id === selectedReply);

  const getShareMessage = () => {
    if (!selectedOption) return '';
    return `Hey ${senderName}! 💌\n\n${recipientName} played your challenge and here's their response:\n\n"${selectedOption.text}"\n\n— via RESET`;
  };

  const handleShare = async () => {
    const shareText = getShareMessage();

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
      setTimeout(() => {
        setCopied(false);
        setPhase('success');
      }, 500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };


  const handleSelectReply = (replyId: string) => {
    setSelectedReply(replyId);
  };

  const handleBackFromReply = () => {
    setPhase('apology');
    setSelectedReply(null);
  };

  const handleBackFromSuccess = () => {
    setPhase('reply');
  };

  useImperativeHandle(
    ref,
    () => ({
      pressB: () => {
        if (winner === 'sender') return;

        if (phase === 'apology') return handleContinueToReply();
        if (phase === 'reply') return handleBackFromReply();
        return handleBackFromSuccess();
      },
    }),
    [phase, winner]
  );

  // Sender won (recipient lost)
  if (winner === 'sender') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
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
      </div>
    );
  }

  // Phase 1: Apology reveal
  if (phase === 'apology') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
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
          <p className="text-[10px] bit-text opacity-60 mb-1">
            10 out of 10! 🏆
          </p>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            Here's what {senderName} wanted to say:
          </p>

          <div className="border-2 border-current px-4 py-3 mb-4 max-w-[220px]">
            <p className="text-xs bit-text">
              I am sorry for {reason.slice(0, 70)}{reason.length > 70 ? '...' : ''}
            </p>
          </div>

          <p className="text-[9px] bit-text opacity-50">
            Would you like to send a reply?
          </p>
          <button 
            onClick={handleContinueToReply}
            className="text-[10px] bit-text opacity-70 mt-2 animate-blink-cursor hover:opacity-100 transition-opacity"
          >
            Press Ⓑ to continue
          </button>
        </div>
      </div>
    );
  }

  // Phase 2: Reply selection
  if (phase === 'reply') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in w-full max-w-[240px]">
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">
            Your Reply
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            How do you want to respond?
          </p>

          <div className="flex flex-col gap-2 w-full mb-4">
            {REPLY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectReply(option.id)}
                className={`px-3 py-2.5 text-[10px] text-left transition-all ${
                  selectedReply === option.id 
                    ? 'bit-button' 
                    : 'bit-button-outline'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={handleBackFromReply}
              className="bit-button-outline flex-1 px-3 py-2 text-[10px]"
            >
              ← Back
            </button>
            <button
              onClick={handleShare}
              disabled={!selectedReply}
              className="bit-button flex-1 px-3 py-2 text-[10px] flex items-center justify-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  OK!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy & Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: Success / Congratulation
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
      <div className="flex flex-col items-center animate-pop-in">
        {/* Pixel sparkles */}
        <div className="inline-block mb-4 animate-bounce-soft">
          <div className="flex justify-center gap-2 mb-1">
            <div className="w-1 h-1 bit-fg" />
            <div className="w-2 h-2 bit-fg" />
            <div className="w-1 h-1 bit-fg" />
          </div>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bit-fg" />
            <div className="w-3 h-3 bit-fg" />
            <div className="w-2 h-2 bit-fg" />
          </div>
          <div className="flex justify-center gap-2 mt-1">
            <div className="w-1 h-1 bit-fg" />
            <div className="w-2 h-2 bit-fg" />
            <div className="w-1 h-1 bit-fg" />
          </div>
        </div>
        
        <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-2">
          Message Sent!
        </h2>
        <p className="text-[10px] bit-text opacity-70 mb-3 px-4">
          Your response has been copied. Now paste it in your chat with {senderName}!
        </p>

        {selectedOption && (
          <div className="border-2 border-current px-4 py-2 mb-4 max-w-[200px]">
            <p className="text-[9px] bit-text opacity-60 mb-1">You said:</p>
            <p className="text-[10px] bit-text">"{selectedOption.text}"</p>
          </div>
        )}

        <p className="text-[10px] bit-text opacity-60 mb-1 px-4">
          Relationships are precious gifts.
        </p>
        <p className="text-[10px] bit-text opacity-50 mb-4 px-4">
          Cherish them always. Best wishes! ✨
        </p>

        <button
          onClick={handleBackFromSuccess}
          className="bit-button-outline px-4 py-2 text-[10px]"
        >
          ← Back
        </button>
      </div>
    </div>
  );
});

GameEndScreen.displayName = 'GameEndScreen';

export default GameEndScreen;
