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
    const fadeIn = setTimeout(() => setOpacity(1), 50);
    
    const fadeOut = setTimeout(() => {
      setOpacity(0);
    }, 2000);

    const remove = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(remove);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="bit-speech-bubble absolute pointer-events-none z-10 transition-all duration-300 ease-out"
      style={{
        left: x,
        top: y,
        opacity,
        transform: `translateY(${opacity === 1 ? '-8px' : '0px'})`,
      }}
    >
      {message}
    </div>
  );
};

export default SpeechBubble;