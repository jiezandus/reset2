import { ReactNode } from 'react';

interface ConsoleFrameProps {
  children: ReactNode;
  showDpad?: boolean;
  onDpadUp?: () => void;
  onDpadDown?: () => void;
}

const ConsoleFrame = ({ children, showDpad, onDpadUp, onDpadDown }: ConsoleFrameProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* Console body */}
      <div className="console-frame rounded-3xl p-6 md:p-8 max-w-md w-full animate-slide-up">
        {/* Speaker grille decoration */}
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-8 h-1 rounded-full bg-console-shadow opacity-50"
            />
          ))}
        </div>

        {/* Screen */}
        <div className="console-screen rounded-2xl overflow-hidden">
          {children}
        </div>

        {/* Controls area */}
        <div className="mt-6 flex items-center justify-between">
          {/* D-pad */}
          {showDpad ? (
            <div className="dpad-container rounded-full p-1">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Up */}
                <button
                  onTouchStart={onDpadUp}
                  onMouseDown={onDpadUp}
                  className="dpad-button absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-lg active:bg-opacity-80"
                  aria-label="Move up"
                />
                {/* Down */}
                <button
                  onTouchStart={onDpadDown}
                  onMouseDown={onDpadDown}
                  className="dpad-button absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-b-lg active:bg-opacity-80"
                  aria-label="Move down"
                />
                {/* Left */}
                <button
                  className="dpad-button absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-l-lg opacity-50 cursor-not-allowed"
                  aria-label="Move left"
                  disabled
                />
                {/* Right */}
                <button
                  className="dpad-button absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-r-lg opacity-50 cursor-not-allowed"
                  aria-label="Move right"
                  disabled
                />
                {/* Center */}
                <div className="w-8 h-8 rounded-full bg-console-shadow" />
              </div>
            </div>
          ) : (
            <div className="w-24" />
          )}

          {/* RESET branding */}
          <div className="text-center">
            <span className="text-primary font-extrabold text-xl tracking-wider">
              RESET
            </span>
          </div>

          {/* Action buttons placeholder */}
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-console-shadow opacity-30" />
            <div className="w-10 h-10 rounded-full bg-primary opacity-80 animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-muted-foreground text-sm text-center">
        Break the ice, one game at a time 💛
      </p>
    </div>
  );
};

export default ConsoleFrame;
