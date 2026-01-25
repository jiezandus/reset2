import { useState } from 'react';
import { Copy, Check, Share2, Heart } from 'lucide-react';
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ConsoleFrame>
      <div className="p-4 h-full flex flex-col" style={{ backgroundColor: '#c4cfa1' }}>
        {!generatedLink ? (
          <div className="flex-1 flex flex-col animate-slide-up">
            <div className="text-center mb-3">
              <Heart className="w-6 h-6 text-foreground mx-auto mb-1 animate-bounce-soft" fill="currentColor" />
              <h1 className="text-sm font-bold text-foreground pixel-text">BREAK THE ICE</h1>
              <p className="text-xs text-muted-foreground">Create an apology game</p>
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="playdate-input w-full px-3 py-2 rounded-lg text-foreground text-sm font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Their Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who are you apologizing to?"
                  className="playdate-input w-full px-3 py-2 rounded-lg text-foreground text-sm font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  What happened?
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="I'm sorry for..."
                  rows={2}
                  className="playdate-input w-full px-3 py-2 rounded-lg text-foreground text-sm font-medium focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              onClick={generateLink}
              disabled={!senderName || !recipientName || !reason}
              className={`action-button w-full py-2.5 rounded-lg font-bold text-foreground text-sm mt-2
                ${(!senderName || !recipientName || !reason) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Generate Link 🎮
            </button>
          </div>
        ) : (
          <div className="text-center flex flex-col h-full animate-pop-in">
            <div className="mb-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-glow">
                <Check className="w-6 h-6 text-foreground" />
              </div>
              <h2 className="text-sm font-bold text-foreground pixel-text">READY!</h2>
              <p className="text-xs text-muted-foreground">
                Send to {recipientName}
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-2 break-all text-[10px] text-muted-foreground font-mono flex-1 overflow-auto">
              {generatedLink}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={copyToClipboard}
                className={`flex-1 py-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 text-sm transition-all
                  ${copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-console-shadow text-primary'
                  }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    OK!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="action-button flex-1 py-2.5 rounded-lg font-bold text-foreground flex items-center justify-center gap-1.5 text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <button
              onClick={() => {
                setGeneratedLink('');
                setSenderName('');
                setRecipientName('');
                setReason('');
              }}
              className="text-muted-foreground text-xs mt-2 hover:text-foreground transition-colors"
            >
              Create another →
            </button>
          </div>
        )}
      </div>
    </ConsoleFrame>
  );
};

export default Index;
