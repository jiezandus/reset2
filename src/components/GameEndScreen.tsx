import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { t, Language, getReplyOptions } from '@/lib/i18n';
import LuckyWheel, { type LuckyWheelRef } from '@/components/LuckyWheel';

type GamePhase = 'apology' | 'wheel' | 'coupon' | 'reply' | 'success';

interface GameEndScreenProps {
  senderName: string;
  recipientName: string;
  reason: string;
  language: Language;
  winner: 'recipient' | 'sender';
  onBack?: () => void;
}

export interface GameEndScreenRef {
  pressB: () => void;
  pressA: () => void;
}

const GameEndScreen = forwardRef<GameEndScreenRef, GameEndScreenProps>(
  ({ senderName, recipientName, reason, language, winner, onBack }, ref) => {
  const [phase, setPhase] = useState<GamePhase>('apology');
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const wheelRef = useRef<LuckyWheelRef | null>(null);

  const replyOptions = getReplyOptions(language);

  const selectedOption = replyOptions.find(opt => opt.id === selectedReply);

  const getShareMessage = () => {
    if (!selectedOption) return '';
    const couponText = wonPrize ? t('couponAppend', language, { prize: wonPrize }) : '';
    return t('replyShareMessage', language, {
      reply: selectedOption.text,
      coupon: couponText,
    }).trim();
  };

  const handleShare = async () => {
    const shareText = getShareMessage();
    copyToClipboard(shareText);
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

  useImperativeHandle(
    ref,
    () => ({
      pressB: () => {
        if (winner === 'sender') return;
        if (phase === 'apology') return setPhase('wheel');
        if (phase === 'wheel') return; // no action during wheel
        if (phase === 'coupon') return setPhase('reply');
        if (phase === 'reply') return setPhase('coupon');
        return setPhase('reply'); // success -> back to reply
      },
      pressA: () => {
        if (phase === 'wheel') {
          wheelRef.current?.spin();
        }
      },
    }),
    [phase, winner]
  );

  // Sender won (recipient lost)
  if (winner === 'sender') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in">
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
            {t('oops', language)}
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            {t('senderWonMessage', language, { name: senderName })}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bit-button px-4 py-2 text-xs"
          >
            {t('tryAgain', language)}
          </button>
        </div>
      </div>
    );
  }

  // Phase: Apology reveal
  if (phase === 'apology') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in">
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
            {t('youWon', language)}
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            {t('hereIsWhatTheySaid', language, { name: senderName })}
          </p>

          <div className="border-2 border-current px-4 py-3 mb-4 max-w-[220px]">
            <p className="text-xs bit-text">
              {t('iAmSorryFor', language, { reason: reason.slice(0, 70) + (reason.length > 70 ? '...' : '') })}
            </p>
          </div>

          <p className="text-[9px] bit-text opacity-50">
            {t('wouldYouLikeToReply', language)}
          </p>
          <button 
            onClick={() => setPhase('wheel')}
            className="text-[10px] bit-text opacity-70 mt-2 animate-blink-cursor hover:opacity-100 transition-opacity"
          >
            {t('pressBToContinue', language)}
          </button>
        </div>
      </div>
    );
  }

  // Phase: Lucky Wheel
  if (phase === 'wheel') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in">
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">
            {t('spinTheWheel', language)}
          </h2>
          <p className="text-[9px] bit-text opacity-60 mb-2">
            {t('wheelSubtitle', language, { name: senderName })}
          </p>
          <LuckyWheel
            ref={wheelRef}
            language={language}
            onResult={(prize) => {
              setWonPrize(prize);
              setTimeout(() => setPhase('coupon'), 600);
            }}
          />
        </div>
      </div>
    );
  }

  // Phase: Coupon reveal
  if (phase === 'coupon') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in">
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-2">
            {t('youGot', language)}
          </h2>

          {/* Coupon card */}
          <div className="border-4 border-dashed border-current px-5 py-4 mb-3 max-w-[220px]">
            <p className="text-[9px] bit-text opacity-60 mb-2 uppercase">
              {t('couponFrom', language, { name: senderName })}
            </p>
            <p className="text-xs bit-text font-bold">
              🎟️ {wonPrize}
            </p>
          </div>

          <p className="text-[9px] bit-text opacity-50 mb-3">
            {t('redeemCoupon', language)}
          </p>

          <button 
            onClick={() => setPhase('reply')}
            className="text-[10px] bit-text opacity-70 animate-blink-cursor hover:opacity-100 transition-opacity"
          >
            {t('pressBToContinue', language)}
          </button>
        </div>
      </div>
    );
  }

  // Phase: Reply selection
  if (phase === 'reply') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
        <div className="flex flex-col items-center animate-pop-in w-full max-w-[240px]">
          <h2 className="text-sm font-bold bit-text pixel-text uppercase mb-1">
            {t('yourReply', language)}
          </h2>
          <p className="text-[10px] bit-text opacity-60 mb-4">
            {t('howToRespond', language)}
          </p>

          <div className="flex flex-col gap-2 w-full mb-4">
            {replyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedReply(option.id)}
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
              onClick={() => setPhase('coupon')}
              className="bit-button-outline flex-1 px-3 py-2 text-[10px]"
            >
              {t('back', language)}
            </button>
            <button
              onClick={handleShare}
              disabled={!selectedReply}
              className="bit-button flex-1 px-3 py-2 text-[10px] flex items-center justify-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  {t('ok', language)}
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  {t('copyAndSend', language)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phase: Success
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bit-bg">
      <div className="flex flex-col items-center animate-pop-in">
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
          {t('messageSent', language)}
        </h2>
        <p className="text-[10px] bit-text opacity-70 mb-3 px-4">
          {t('responseCopied', language, { name: senderName })}
        </p>

        {selectedOption && (
          <div className="border-2 border-current px-4 py-2 mb-4 max-w-[200px]">
            <p className="text-[9px] bit-text opacity-60 mb-1">{t('youSaid', language)}</p>
            <p className="text-[10px] bit-text">"{selectedOption.text}"</p>
          </div>
        )}

        <p className="text-[10px] bit-text opacity-60 mb-1 px-4">
          {t('relationshipsPrecious', language)}
        </p>
        <p className="text-[10px] bit-text opacity-50 mb-4 px-4">
          {t('cherishThem', language)}
        </p>

        <button
          onClick={() => setPhase('reply')}
          className="bit-button-outline px-4 py-2 text-[10px]"
        >
          {t('back', language)}
        </button>
      </div>
    </div>
  );
});

GameEndScreen.displayName = 'GameEndScreen';

export default GameEndScreen;
