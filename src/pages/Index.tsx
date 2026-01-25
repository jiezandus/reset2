import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import ConsoleFrame from '@/components/ConsoleFrame';

const Index = () => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [reason, setReason] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!senderName || !recipientName || !reason) return;
    
    const params = new URLSearchParams({
      sender: senderName,
      recipient: recipientName,
      reason: reason,
    });
    
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/play?${params.toString()}`;
    setGeneratedLink(link);
  };

  const handleShare = async () => {
    if (!generatedLink) return;

    const shareText = `Hey ${recipientName}! ${senderName} wants to apologize. Play this game to accept! 💛`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RESET - Ice Breaker',
          text: shareText,
          url: generatedLink,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const shareMessage = `Hey ${recipientName}! 👀✨ Someone has something to say to you... Open this to find out! ${generatedLink}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ConsoleFrame>
      <div className="p-4 h-full flex flex-col bit-bg">
        {!generatedLink ? (
          <div className="flex-1 flex flex-col animate-slide-up">
            {/* Header */}
            <div className="text-center mb-4">
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
              <h1 className="text-sm font-bold bit-text pixel-text uppercase tracking-wider">Break the Ice</h1>
              <p className="text-[10px] bit-text opacity-60 mt-1">Create an apology game</p>
            </div>

            {/* Form */}
            <div className="space-y-3 flex-1">
              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name..."
                  className="bit-input w-full px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  Their Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who are you apologizing to?"
                  className="bit-input w-full px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold bit-text uppercase tracking-wide block mb-1">
                  I am sorry for....
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="being late/eating your food/ghosting you...etc"
                  rows={2}
                  className="bit-input w-full px-3 py-2 text-xs resize-none"
                />
              </div>
            </div>

            <button
              onClick={generateLink}
              disabled={!senderName || !recipientName || !reason}
              className="bit-button w-full py-3 text-xs mt-4"
            >
              Generate Invite ►
            </button>
          </div>
        ) : (
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
              <h2 className="text-sm font-bold bit-text pixel-text uppercase">Ready!</h2>
              <p className="text-[10px] bit-text opacity-60 mt-1">
                Send to {recipientName} via your messaging app
              </p>
            </div>

            {/* Message preview */}
            <div className="flex-1 border-3 border-current p-3 text-[10px] bit-text break-all overflow-auto" style={{ borderWidth: '3px', borderColor: 'hsl(40 10% 10%)' }}>
              <p className="mb-2">Hey {recipientName}! 👀✨</p>
              <p className="mb-2">Someone has something to say to you...</p>
              <p className="opacity-60 font-mono text-[8px]">{generatedLink}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={copyToClipboard}
                className={`flex-1 py-3 text-xs flex items-center justify-center gap-2 transition-colors ${
                  copied 
                    ? 'bit-button-outline' 
                    : 'bit-button-outline'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    OK!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setGeneratedLink('');
                  setSenderName('');
                  setRecipientName('');
                  setReason('');
                }}
                className="bit-button flex-1 py-3 text-xs flex items-center justify-center gap-2"
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </ConsoleFrame>
  );
};

export default Index;
