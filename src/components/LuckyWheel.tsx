import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Language } from '@/lib/i18n';
import { getWheelPrizes } from '@/lib/i18n';

export interface LuckyWheelRef {
  spin: () => void;
  stop: () => void;
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
  const freeSpinRef = useRef(false);
  const freeSpinStartRef = useRef(0);

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

    // Match page background
    ctx.fillStyle = '#f7f5f0';
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
      ctx.fillStyle = i % 2 === 0 ? '#2a2a1a' : '#f7f5f0';
      ctx.fill();
      ctx.strokeStyle = '#2a2a1a';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw number only
      ctx.save();
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 14px monospace';
      ctx.fillStyle = i % 2 === 0 ? '#f7f5f0' : '#2a2a1a';
      ctx.fillText(String(i + 1), 0, radius * 0.6);
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
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawWheel(canvas, rotation);
  }, [rotation, drawWheel]);

  // Free-spin: constant speed while held
  const SPIN_SPEED = 0.05; // radians per frame

  const animateFreeSpin = useCallback(() => {
    setRotation(prev => prev + SPIN_SPEED);
    animRef.current = requestAnimationFrame(animateFreeSpin);
  }, []);

  const startSpin = useCallback(() => {
    if (freeSpinRef.current) return;
    freeSpinRef.current = true;
    setSpinning(true);
    freeSpinStartRef.current = Date.now();
    animRef.current = requestAnimationFrame(animateFreeSpin);
  }, [animateFreeSpin]);

  // Easing for deceleration after stop
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const stopSpin = useCallback(() => {
    if (!freeSpinRef.current) return;
    freeSpinRef.current = false;
    cancelAnimationFrame(animRef.current);

    // Now decelerate to a stop
    const baseRot = rotation;
    const extraRotation = Math.PI * 2 * (2 + Math.random() * 2) + Math.random() * Math.PI * 2;
    const startTime = Date.now();

    const decelerate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const eased = easeOutCubic(progress);
      const current = baseRot + extraRotation * eased;
      setRotation(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(decelerate);
      } else {
        setSpinning(false);
        const finalAngle = current % (Math.PI * 2);
        const pointerAngle = (Math.PI * 2 - finalAngle + Math.PI * 1.5) % (Math.PI * 2);
        const segIndex = Math.floor(pointerAngle / (Math.PI * 2 / SEGMENTS)) % SEGMENTS;
        onResult(prizes[segIndex]);
      }
    };
    animRef.current = requestAnimationFrame(decelerate);
  }, [rotation, onResult, prizes]);

  useImperativeHandle(ref, () => ({
    spin: startSpin,
    stop: stopSpin,
  }), [startSpin, stopSpin]);

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
        <p className="text-[10px] bit-text opacity-60 animate-blink-cursor">
          {language === 'zh' ? '按 A 开始转动' : 'Press A to spin'}
        </p>
      )}
      {spinning && (
        <p className="text-[10px] bit-text opacity-60 animate-blink-cursor">
          {language === 'zh' ? '按 B 停止' : 'Press B to stop'}
        </p>
      )}
    </div>
  );
});

LuckyWheel.displayName = 'LuckyWheel';

export default LuckyWheel;
