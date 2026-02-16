import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ConsoleFrame from '@/components/ConsoleFrame';
import LanguageToggle from '@/components/LanguageToggle';
import { encodeGameData } from '@/lib/urlEncoder';
import { t, Language, MessageCategory, getDefaultPrizes, getCategoryLabelKey, getCategoryPlaceholderKey } from '@/lib/i18n';

type SetupStep = 'form' | 'prizes' | 'link' | 'success';

const CATEGORIES: MessageCategory[] = ['apology', 'missyou', 'love', 'thankyou'];

const CATEGORY_EMOJI: Record<MessageCategory, string> = {
  apology: '💔',
  missyou: '🌙',
  love: '❤️',
  thankyou: '🙏',
};

const Index = () => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [reason, setReason] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [step, setStep] = useState<SetupStep>('form');
  const [prizes, setPrizes] = useState<string[]>(() => getDefaultPrizes('en'));
  const [category, setCategory] = useState<MessageCategory>('apology');

  const handleNextToprizes = () => {
    if (!senderName || !recipientName || !reason) return;
    setPrizes(getDefaultPrizes(language));
    setStep('prizes');
  };

  const updatePrize = (index: number, value: string) => {
    setPrizes(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const generateLink = () => {
    const encoded = encodeGameData({
      sender: senderName,
      recipient: recipientName,
      reason: reason,
      lang: language,
      category: category,
      prizes: prizes,
    });
    
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/play?d=${encoded}`;
    setGeneratedLink(link);
    setStep('link');
  };

  const shareMessage = t('shareText', language, { name: recipientName, link: generatedLink });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setStep('success');
      }, 500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetAll = () => {
    setGeneratedLink('');
    setSenderName('');
    setRecipientName('');
    setReason('');
    setCategory('apology');
    setStep('form');
  };

  

  return (
    <ConsoleFrame>
      <div className="p-4 h-full flex flex-col bit-bg">
        {step === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-pop-in">
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
              {t('youDidIt', language)}
            </h2>
            <p className="text-[11px] bit-text mb-3">
              {t('firstStepComplete', language)}
            </p>
            <p className="text-[10px] bit-text opacity-70 px-4 leading-relaxed mb-3">
              {t('rootingForYou', language, { name: recipientName })}
            </p>
            <p className="text-[10px] bit-text opacity-60 mb-3">
              {t('waitForResponse', language)}
            </p>
            <p className="text-[10px] bit-text opacity-50 mb-6">
              {t('goodLuck', language)}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => setStep('link')}
                className="bit-button-outline px-4 py-2 text-[10px]"
              >
                {t('back', language)}
              </button>
              <button
                onClick={resetAll}
                className="bit-button px-4 py-2 text-[10px]"
              >
                {t('createAnother', language)}
              </button>
            </div>
          </div>
        ) : step === 'prizes' ? (
          /* Prize customization step */
          <div className="flex-1 flex flex-col animate-slide-up">
            <div className="text-center mb-3">
              <h2 className="text-sm font-bold bit-text pixel-text uppercase">{t('customizePrizes', language)}</h2>
              <p className="text-[10px] bit-text opacity-60 mt-1">{t('customizePrizesSubtitle', language)}</p>
            </div>

            <div className="space-y-2 flex-1 overflow-auto">
              {prizes.map((prize, i) => (
                <div key={i}>
                  <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-0.5">
                    {t('prizeLabel', language, { num: String(i + 1) })}
                  </label>
                  <input
                    type="text"
                    value={prize}
                    onChange={(e) => updatePrize(i, e.target.value)}
                    className="bit-input w-full px-2 py-1.5 text-[11px]"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setStep('form')}
                className="bit-button-outline flex-1 py-2.5 text-xs"
              >
                {t('back', language)}
              </button>
              <button
                onClick={generateLink}
                disabled={prizes.some(p => !p.trim())}
                className="bit-button flex-1 py-2.5 text-xs"
              >
                {t('generateInvite', language)}
              </button>
            </div>
          </div>
        ) : step === 'form' ? (
          <div className="flex-1 flex flex-col animate-slide-up">
            {/* Header */}
            <div className="text-center mb-3 relative">
              {/* Language toggle - top right */}
              <div className="absolute top-0 right-0">
                <LanguageToggle language={language} onToggle={setLanguage} />
              </div>
              
              <div className="inline-block mb-2">
                {/* Cute pixel heart */}
                <div className="flex justify-center gap-[2px]">
                  <div className="w-2 h-2 bit-fg" />
                  <div className="w-2 h-2" />
                  <div className="w-2 h-2 bit-fg" />
                </div>
                <div className="flex justify-center gap-[2px]">
                  <div className="w-2 h-2 bit-fg" />
                  <div className="w-2 h-2 bit-fg" />
                  <div className="w-2 h-2 bit-fg" />
                </div>
                <div className="flex justify-center gap-[2px] mt-[2px]">
                  <div className="w-2 h-2" />
                  <div className="w-2 h-2 bit-fg" />
                  <div className="w-2 h-2" />
                </div>
              </div>
              <h1 className="text-sm font-bold bit-text pixel-text uppercase tracking-wider">{t('breakTheIce', language)}</h1>
              <p className="text-[10px] bit-text opacity-60 mt-1">{t('createApologyGame', language)}</p>
            </div>

            {/* Category Selector */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-1 text-[8px] font-bold uppercase tracking-wide transition-all ${
                    category === cat
                      ? 'bit-button'
                      : 'bit-button-outline opacity-70'
                  }`}
                >
                  <span className="text-sm">{CATEGORY_EMOJI[cat]}</span>
                  <span className="leading-tight">{t(`category${cat.charAt(0).toUpperCase() + cat.slice(1)}` as any, language)}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-3 flex-1">
              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  {t('yourName', language)}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t('enterYourName', language)}
                  className="bit-input w-full px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  {t('theirName', language)}
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t('whoApologizing', language)}
                  className="bit-input w-full px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  {t(getCategoryLabelKey(category), language)}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t(getCategoryPlaceholderKey(category), language)}
                  rows={2}
                  className="bit-input w-full px-3 py-2 text-xs resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleNextToprizes}
              disabled={!senderName || !recipientName || !reason}
              className="bit-button w-full py-3 text-xs mt-4"
            >
              {t('nextStep', language)}
            </button>
          </div>
        ) : (
          /* Link ready screen */
          <div className="flex flex-col h-full animate-pop-in">
            {/* Success header */}
            <div className="text-center mb-4">
              {/* Pixel checkmark */}
              <div className="inline-block mb-2">
                <div className="flex justify-center gap-[2px]">
                  <div className="w-2 h-2" />
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
                  <div className="w-2 h-2" />
                </div>
              </div>
              <h2 className="text-sm font-bold bit-text pixel-text uppercase">{t('ready', language)}</h2>
              <p className="text-[10px] bit-text opacity-60 mt-1">
                {t('sendTo', language, { name: recipientName })}
              </p>
            </div>

            {/* Message preview */}
            <div className="flex-1 border-3 border-current p-3 text-[15px] bit-text break-all overflow-auto" style={{ borderWidth: '3px', borderColor: 'hsl(40 10% 10%)' }}>
              <p className="mb-2">{t('shareMessageIntro', language, { name: recipientName })}</p>
              <p className="mb-2">{t('shareMessageBody', language)}</p>
              <p className="opacity-60 font-mono text-[12px]">{`${window.location.origin}/play?...`}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={resetAll}
                className="bit-button-outline flex-1 py-3 text-xs flex items-center justify-center gap-2"
              >
                {t('back', language)}
              </button>

              <button
                onClick={copyToClipboard}
                className={`flex-1 py-3 text-xs flex items-center justify-center gap-2 ${
                  copied 
                    ? 'bit-button-outline' 
                    : 'bit-button'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    {t('ok', language)}
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    {t('copy', language)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ConsoleFrame>
  );
};

export default Index;
