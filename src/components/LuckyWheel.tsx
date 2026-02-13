import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Language } from '@/lib/i18n';
import { getWheelPrizes } from '@/lib/i18n';

export interface LuckyWheelRef {
  spin: () => void;
  stop: () => void;
}

interface LuckyWheelProps {
  language: Language;
  customPrizes?: string[];
  onResult: (prize: string) => void;
}

const SEGMENTS = 6;
const MAX_SPEED = 0.35; // radians per frame
const ACCEL = 0.004; // acceleration per frame
const DECEL_DURATION = 2500; // ms to decelerate

const LuckyWheel = forwardRef<LuckyWheelRef, LuckyWheelProps>(({ language, customPrizes, onResult }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [decelerating, setDecelerating] = useState(false);
  const animRef = useRef<number>(0);
  const phaseRef = useRef<'idle' | 'accel' | 'decel'>('idle');

  const prizes = getWheelPrizes(language, customPrizes);

  const drawWheel = useCallback((canvas: HTMLCanvasElement, currentRotation: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 8;
    const segAngle = (Math.PI * 2) / SEGMENTS;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(currentRotation);

    // Use the 1-bit screen color for light segments
    const bitWhite = getComputedStyle(document.documentElement).getPropertyValue('--bit-white').trim();
    const lightColor = bitWhite ? `hsl(${bitWhite})` : '#d4d0c8';

    for (let i = 0; i < SEGMENTS; i++) {
      const startAngle = i * segAngle;
      const endAngle = startAngle + segAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#2a2a1a' : lightColor;
      ctx.fill();
      ctx.strokeStyle = '#2a2a1a';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = i % 2 === 0 ? lightColor : '#2a2a1a';
      ctx.fillText(String(i + 1), 0, radius * 0.55);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#2a2a1a';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#2a2a1a';
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = '#2a2a1a';
    ctx.beginPath();
    ctx.moveTo(cx - 8, 4);
    ctx.lineTo(cx + 8, 4);
    ctx.lineTo(cx, 18);
    ctx.closePath();
    ctx.fill();
  }, []);

  // Single animation loop
  const animate = useCallback(() => {
    if (phaseRef.current === 'accel') {
      speedRef.current = Math.min(speedRef.current + ACCEL, MAX_SPEED);
      rotationRef.current += speedRef.current;
      const canvas = canvasRef.current;
      if (canvas) drawWheel(canvas, rotationRef.current);
      animRef.current = requestAnimationFrame(animate);
    }
  }, [drawWheel]);

  const startSpin = useCallback(() => {
    if (phaseRef.current !== 'idle') return;
    phaseRef.current = 'accel';
    speedRef.current = 0;
    setSpinning(true);
    setDecelerating(false);
    animRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const stopSpin = useCallback(() => {
    if (phaseRef.current !== 'accel') return;
    cancelAnimationFrame(animRef.current);
    phaseRef.current = 'decel';
    setDecelerating(true);

    const baseRot = rotationRef.current;
    const currentSpeed = speedRef.current;
    // Extra rotation proportional to current speed
    const extraRotation = (currentSpeed / MAX_SPEED) * Math.PI * 2 * (2 + Math.random() * 2) + Math.random() * Math.PI;
    const startTime = Date.now();

    const decelerate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / DECEL_DURATION, 1);
      const eased = easeOutCubic(progress);
      const current = baseRot + extraRotation * eased;
      rotationRef.current = current;
      const canvas = canvasRef.current;
      if (canvas) drawWheel(canvas, current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(decelerate);
      } else {
        phaseRef.current = 'idle';
        speedRef.current = 0;
        setSpinning(false);
        setDecelerating(false);
        const finalAngle = current % (Math.PI * 2);
        const pointerAngle = (Math.PI * 2 - finalAngle + Math.PI * 1.5) % (Math.PI * 2);
        const segIndex = Math.floor(pointerAngle / (Math.PI * 2 / SEGMENTS)) % SEGMENTS;
        onResult(prizes[segIndex]);
      }
    };
    animRef.current = requestAnimationFrame(decelerate);
  }, [onResult, prizes, drawWheel]);

  useImperativeHandle(ref, () => ({
    spin: startSpin,
    stop: stopSpin,
  }), [startSpin, stopSpin]);

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) drawWheel(canvas, rotationRef.current);
  }, [drawWheel]);

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
      {!spinning && !decelerating && (
        <p className="text-[10px] bit-text opacity-60 animate-blink-cursor">
          {language === 'zh' ? '按 A 开始转动' : 'Press A to spin'}
        </p>
      )}
      {spinning && !decelerating && (
        <p className="text-[10px] bit-text opacity-60 animate-blink-cursor">
          {language === 'zh' ? '按 B 停止' : 'Press B to stop'}
        </p>
      )}
      {decelerating && (
        <p className="text-[10px] bit-text opacity-60">
          {language === 'zh' ? '减速中...' : 'Stopping...'}
        </p>
      )}
    </div>
  );
});

LuckyWheel.displayName = 'LuckyWheel';

export default LuckyWheel;
