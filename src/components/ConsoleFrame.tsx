import { ReactNode } from 'react';

interface ConsoleFrameProps {
  children: ReactNode;
  showDpad?: boolean;
  onDpadUp?: () => void;
  onDpadDown?: () => void;
  onDpadRelease?: () => void;
  onButtonA?: () => void;
  onButtonB?: () => void;
}

const ConsoleFrame = ({ 
  children, 
  showDpad, 
  onDpadUp, 
  onDpadDown, 
  onDpadRelease,
  onButtonA,
  onButtonB 
}: ConsoleFrameProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      {/* Console body - Playdate style, fills screen */}
      <div className="playdate-console relative w-full h-full max-w-[420px] max-h-[100dvh] flex flex-col">
        {/* Main body */}
        <div className="relative flex-1 flex flex-col bg-primary rounded-[2.5rem] shadow-console-3d mx-2 my-2">
          {/* Top edge highlight */}
          <div className="absolute top-0 left-6 right-6 h-1.5 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
          
          {/* Speaker grille */}
          <div className="flex justify-center gap-1 pt-4 pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-console-shadow/30" />
            ))}
          </div>
          
          {/* Screen bezel - takes most space */}
          <div className="relative flex-1 mx-4 mb-4 bg-console-shadow rounded-2xl p-2 shadow-screen-bezel">
            {/* Screen */}
            <div className="console-screen-1bit rounded-xl overflow-hidden h-full">
              {children}
            </div>
          </div>

          {/* Controls area - fixed at bottom */}
          <div className="flex items-center justify-between px-4 pb-6 pt-2">
            {/* D-pad */}
            <div className="relative">
              {showDpad ? (
                <div className="dpad-container relative w-20 h-20">
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-7 h-20 bg-primary rounded-md flex flex-col shadow-dpad-extruded">
                    {/* Up button */}
                    <button
                      onTouchStart={(e) => { e.preventDefault(); onDpadUp?.(); }}
                      onTouchEnd={(e) => { e.preventDefault(); onDpadRelease?.(); }}
                      onMouseDown={onDpadUp}
                      onMouseUp={onDpadRelease}
                      onMouseLeave={onDpadRelease}
                      className="flex-1 flex items-center justify-center active:bg-black/10 rounded-t-md transition-colors"
                      aria-label="Move up"
                    >
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-foreground/60" />
                    </button>
                    {/* Down button */}
                    <button
                      onTouchStart={(e) => { e.preventDefault(); onDpadDown?.(); }}
                      onTouchEnd={(e) => { e.preventDefault(); onDpadRelease?.(); }}
                      onMouseDown={onDpadDown}
                      onMouseUp={onDpadRelease}
                      onMouseLeave={onDpadRelease}
                      className="flex-1 flex items-center justify-center active:bg-black/10 rounded-b-md transition-colors"
                      aria-label="Move down"
                    >
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-foreground/60" />
                    </button>
                  </div>
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-20 h-7 bg-primary rounded-md flex shadow-dpad-extruded">
                    {/* Left button (disabled) */}
                    <div className="flex-1 flex items-center justify-center opacity-30 rounded-l-md">
                      <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-r-[7px] border-t-transparent border-b-transparent border-r-foreground/60" />
                    </div>
                    {/* Right button (disabled) */}
                    <div className="flex-1 flex items-center justify-center opacity-30 rounded-r-md">
                      <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[7px] border-t-transparent border-b-transparent border-l-foreground/60" />
                    </div>
                  </div>
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border border-foreground/20 shadow-inner" />
                </div>
              ) : (
                <div className="dpad-container relative w-20 h-20 opacity-50">
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-7 h-20 bg-primary rounded-md shadow-dpad-extruded" />
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-20 h-7 bg-primary rounded-md shadow-dpad-extruded" />
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border border-foreground/20 shadow-inner" />
                </div>
              )}
            </div>

            {/* RESET branding - centered */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
              <span className="text-console-shadow font-black text-[10px] tracking-[0.3em] opacity-40 uppercase">
                Reset
              </span>
            </div>

            {/* A/B Buttons - flipped order */}
            <div className="flex gap-2">
              <button
                onClick={onButtonA}
                className="ab-button w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-ab-extruded active:shadow-ab-pressed active:translate-y-0.5 transition-all"
                aria-label="A button"
              >
                <span className="text-foreground font-bold text-xs">A</span>
              </button>
              <button
                onClick={onButtonB}
                className="ab-button w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-ab-extruded active:shadow-ab-pressed active:translate-y-0.5 transition-all"
                aria-label="B button"
              >
                <span className="text-foreground font-bold text-xs">B</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConsoleFrame;
