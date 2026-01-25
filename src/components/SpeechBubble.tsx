import { useEffect, useState } from 'react';

interface SpeechBubbleProps {
  message: string;
  x: number;
  y: number;
  onComplete?: () => void;
}

const SpeechBubble = ({ message, x, y, onComplete }: SpeechBubbleProps) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    const fadeIn = setTimeout(() => setOpacity(1), 50);
    
    // Start fade out after 2.5 seconds
    const fadeOut = setTimeout(() => {
      setOpacity(0);
    }, 2500);

    // Remove after fade out
    const remove = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(remove);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="speech-bubble absolute px-3 py-2 rounded-xl text-foreground text-sm font-bold 
                 transition-all duration-500 ease-out pointer-events-none z-10 max-w-32 text-center"
      style={{
        left: x,
        top: y,
        opacity,
        transform: `translateY(${opacity === 1 ? '-10px' : '0px'})`,
      }}
    >
      {message}
    </div>
  );
};

export default SpeechBubble;
