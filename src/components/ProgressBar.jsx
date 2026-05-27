import React from 'react';

export const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-black/50 border border-dark-border rounded-none h-3 relative overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,243,255,0.5)]"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] w-1/2 animate-[shimmer_2s_infinite]"></div>
      </div>
    </div>
  );
};
