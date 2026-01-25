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
      <div className="p-6 bg-screen min-h-[300px]">
        {!generatedLink ? (
          <div className="space-y-4 animate-slide-up">
            <div className="text-center mb-6">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce-soft" fill="currentColor" />
              <h1 className="text-xl font-bold text-foreground">Break the Ice</h1>
              <p className="text-sm text-muted-foreground">Create an apology game</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="playdate-input w-full px-4 py-3 rounded-xl text-foreground font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Their Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who are you apologizing to?"
                  className="playdate-input w-full px-4 py-3 rounded-xl text-foreground font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  What happened?
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="I'm sorry for..."
                  rows={2}
                  className="playdate-input w-full px-4 py-3 rounded-xl text-foreground font-medium focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              onClick={generateLink}
              disabled={!senderName || !recipientName || !reason}
              className={`action-button w-full py-3 rounded-xl font-bold text-foreground
                ${(!senderName || !recipientName || !reason) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Generate Link 🎮
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-pop-in">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                <Check className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Ready to Share!</h2>
              <p className="text-sm text-muted-foreground">
                Send this link to {recipientName}
              </p>
            </div>

            <div className="bg-muted rounded-xl p-3 break-all text-xs text-muted-foreground font-mono">
              {generatedLink}
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                  ${copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
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
                className="action-button flex-1 py-3 rounded-xl font-bold text-foreground flex items-center justify-center gap-2"
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
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
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
