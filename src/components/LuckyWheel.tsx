import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Language } from '@/lib/i18n';
import { getWheelPrizes } from '@/lib/i18n';

export interface LuckyWheelRef {
  spin: () => void;
}

interface LuckyWheelProps {
  language: Language;
  onResult: (prize: string) => void;
}

const SEGMENTS = 6;
const SPIN_DURATION = 3000;

const LuckyWheel = forwardRef<LuckyWheelRef, LuckyWheelProps>(({ language, onResult }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const targetRotationRef = useRef(0);
  const baseRotationRef = useRef(0);

  const prizes = getWheelPrizes(language);

  const drawWheel = useCallback((canvas: HTMLCanvasElement, currentRotation: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 8;
    const segAngle = (Math.PI * 2) / SEGMENTS;

    // LCD green bg
    ctx.fillStyle = '#c8d4a2';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentRotation);

    // Draw segments
    for (let i = 0; i < SEGMENTS; i++) {
      const startAngle = i * segAngle;
      const endAngle = startAngle + segAngle;

      // Alternating fill
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#2a2a1a' : '#c8d4a2';
      ctx.fill();
      ctx.strokeStyle = '#2a2a1a';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = i % 2 === 0 ? '#c8d4a2' : '#2a2a1a';

      // Wrap text in segment
      const text = prizes[i];
      const textRadius = radius * 0.6;
      
      // Split into short lines
      const maxChars = language === 'zh' ? 5 : 10;
      const words = language === 'zh' ? text.split('') : text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        const test = currentLine ? (language === 'zh' ? currentLine + word : currentLine + ' ' + word) : word;
        if (test.length > maxChars && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = test;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = 10;
      const startY = textRadius - ((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, li) => {
        ctx.fillText(line, 0, startY + li * lineHeight, radius * 0.5);
      });

      ctx.restore();
    }

    // Outer ring
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#2a2a1a';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#2a2a1a';
    ctx.fill();

    ctx.restore();

    // Pointer triangle at top
    ctx.fillStyle = '#2a2a1a';
    ctx.beginPath();
    ctx.moveTo(cx - 8, 4);
    ctx.lineTo(cx + 8, 4);
    ctx.lineTo(cx, 18);
    ctx.closePath();
    ctx.fill();
  }, [prizes, language]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawWheel(canvas, rotation);
  }, [rotation, drawWheel]);

  // Easing: decelerate
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animate = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / SPIN_DURATION, 1);
    const eased = easeOutCubic(progress);
    const current = baseRotationRef.current + targetRotationRef.current * eased;
    
    setRotation(current);

    if (progress < 1) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      setSpinning(false);
      // Determine which segment the pointer landed on
      const finalAngle = current % (Math.PI * 2);
      // Pointer is at top (negative y), so segment 0 starts at angle 0 (right)
      // Adjust: the pointer is at -PI/2 from the right
      const pointerAngle = (Math.PI * 2 - finalAngle + Math.PI * 1.5) % (Math.PI * 2);
      const segIndex = Math.floor(pointerAngle / (Math.PI * 2 / SEGMENTS)) % SEGMENTS;
      onResult(prizes[segIndex]);
    }
  }, [onResult, prizes]);

  const startSpin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    baseRotationRef.current = rotation;
    // 5-8 full rotations + random offset
    targetRotationRef.current = Math.PI * 2 * (5 + Math.random() * 3) + Math.random() * Math.PI * 2;
    startTimeRef.current = Date.now();
    animRef.current = requestAnimationFrame(animate);
  }, [spinning, rotation, animate]);

  useImperativeHandle(ref, () => ({
    spin: startSpin,
  }), [startSpin]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="mb-2"
        style={{ imageRendering: 'pixelated' }}
      />
      {!spinning && (
        <button onClick={startSpin} className="bit-button px-4 py-2 text-[10px]">
          {language === 'zh' ? '转！' : 'SPIN!'}
        </button>
      )}
      {spinning && (
        <p className="text-[10px] bit-text opacity-60 animate-blink-cursor">
          {language === 'zh' ? '转动中...' : 'Spinning...'}
        </p>
      )}
    </div>
  );
});

LuckyWheel.displayName = 'LuckyWheel';

export default LuckyWheel;
