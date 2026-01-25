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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-2">
      {/* Console body - Playdate style */}
      <div className="playdate-body relative w-full max-w-sm">
        {/* Main body */}
        <div className="relative bg-primary rounded-[2rem] p-3 shadow-playdate">
          {/* Top edge highlight */}
          <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
          
          {/* Screen bezel */}
          <div className="relative bg-console-shadow rounded-xl p-1.5 shadow-screen-inset">
            {/* Screen */}
            <div className="console-screen rounded-lg overflow-hidden aspect-[4/3]">
              {children}
            </div>
          </div>

          {/* Controls area */}
          <div className="mt-4 flex items-center justify-between px-2">
            {/* D-pad */}
            <div className="relative">
              {showDpad ? (
                <div className="dpad-cross">
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-24 bg-console-shadow rounded-lg flex flex-col">
                    {/* Up button */}
                    <button
                      onTouchStart={(e) => { e.preventDefault(); onDpadUp?.(); }}
                      onTouchEnd={(e) => { e.preventDefault(); onDpadRelease?.(); }}
                      onMouseDown={onDpadUp}
                      onMouseUp={onDpadRelease}
                      onMouseLeave={onDpadRelease}
                      className="flex-1 flex items-center justify-center active:bg-black/20 rounded-t-lg"
                      aria-label="Move up"
                    >
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-muted-foreground/50" />
                    </button>
                    {/* Down button */}
                    <button
                      onTouchStart={(e) => { e.preventDefault(); onDpadDown?.(); }}
                      onTouchEnd={(e) => { e.preventDefault(); onDpadRelease?.(); }}
                      onMouseDown={onDpadDown}
                      onMouseUp={onDpadRelease}
                      onMouseLeave={onDpadRelease}
                      className="flex-1 flex items-center justify-center active:bg-black/20 rounded-b-lg"
                      aria-label="Move down"
                    >
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-muted-foreground/50" />
                    </button>
                  </div>
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-24 h-8 bg-console-shadow rounded-lg flex">
                    {/* Left button (disabled) */}
                    <div className="flex-1 flex items-center justify-center opacity-40 rounded-l-lg">
                      <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-r-muted-foreground/50" />
                    </div>
                    {/* Right button (disabled) */}
                    <div className="flex-1 flex items-center justify-center opacity-40 rounded-r-lg">
                      <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-muted-foreground/50" />
                    </div>
                  </div>
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-console-shadow border-2 border-black/20" />
                </div>
              ) : (
                <div className="dpad-cross">
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-24 bg-console-shadow rounded-lg opacity-60" />
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-24 h-8 bg-console-shadow rounded-lg opacity-60" />
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-console-shadow border-2 border-black/20 opacity-60" />
                </div>
              )}
              {/* D-pad container size */}
              <div className="w-24 h-24" />
            </div>

            {/* RESET branding - centered */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
              <span className="text-console-shadow font-black text-sm tracking-widest opacity-60">
                RESET
              </span>
            </div>

            {/* A/B Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onButtonB}
                className="ab-button w-11 h-11 rounded-full bg-console-shadow flex items-center justify-center shadow-button active:shadow-button-pressed active:translate-y-0.5"
                aria-label="B button"
              >
                <span className="text-primary/70 font-bold text-sm">B</span>
              </button>
              <button
                onClick={onButtonA}
                className="ab-button w-11 h-11 rounded-full bg-console-shadow flex items-center justify-center shadow-button active:shadow-button-pressed active:translate-y-0.5"
                aria-label="A button"
              >
                <span className="text-primary/70 font-bold text-sm">A</span>
              </button>
            </div>
          </div>
        </div>

        {/* Side crank decoration (like Playdate) */}
        <div className="absolute -right-3 top-8 w-6 h-14 bg-primary rounded-r-lg shadow-md flex items-center justify-center">
          <div className="w-3 h-10 bg-console-shadow rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <p className="mt-4 text-muted-foreground text-xs text-center">
        Break the ice, one game at a time 💛
      </p>
    </div>
  );
};

export default ConsoleFrame;
