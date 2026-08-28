import React, { useEffect, useState } from 'react';
import { soundManager } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('INITIALIZING MISSION CONTROL SYSTEM...');
  const [isReady, setIsReady] = useState<boolean>(false);

  const calibrationSteps = [
    { threshold: 20, text: 'CALIBRATING LUNAR TERRAIN SHADERS...' },
    { threshold: 45, text: 'ACQUIRING ORBITAL TELEMETRY & TRACKS...' },
    { threshold: 70, text: 'CALIBRATING GROUND STATIONS & DEEP SPACE RELAYS...' },
    { threshold: 90, text: 'SYNCHRONIZING CELESTIAL BODIES (MOON, EARTH, MARS)...' },
    { threshold: 100, text: 'SYSTEM ONLINE • MISSION CONTROL READY' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          soundManager.playRadarPing();
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentStep = calibrationSteps.find(step => next <= step.threshold);
        if (currentStep) {
          setStatusMessage(currentStep.text);
        }
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    soundManager.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060c] text-slate-100 font-mono select-none px-4">
      {/* Background Radar sweep effect */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-cyan-500/10 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[350px] h-[350px] rounded-full border border-cyan-500/20 flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/30" />
        </div>
        <div className="absolute w-full h-[1px] bg-cyan-500/20" />
        <div className="absolute h-full w-[1px] bg-cyan-500/20" />
        <div className="absolute w-full h-full rounded-full animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_0deg_300deg,rgba(0,240,255,0.15)_360deg)]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-xl w-full text-center hud-panel p-8 rounded-lg border border-yellow-500/30 bg-slate-950/90 shadow-2xl">
        <div className="hud-panel-corner hud-corner-tl" />
        <div className="hud-panel-corner hud-corner-tr" />
        <div className="hud-panel-corner hud-corner-bl" />
        <div className="hud-panel-corner hud-corner-br" />

        {/* Title Header */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            ORBITAL RADAR • SUSMIT BHAR
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-widest text-amber-400 glow-text-gold uppercase">
            MISSION CONTROL
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Electrical Engineering • Software Systems • Space Technology
          </p>
        </div>

        {/* Status Message */}
        <div className="h-6 mb-4 text-xs font-mono text-cyan-300 flex items-center justify-center gap-2">
          <span>&gt;</span>
          <span>{statusMessage}</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 border border-slate-700 h-3 rounded overflow-hidden p-0.5 mb-6">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 transition-all duration-200 shadow-[0_0_12px_rgba(255,183,3,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Numbers */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-8 border-t border-b border-slate-800/80 py-2 px-2">
          <span>CALIBRATING GROUND TRACKS: <strong className="text-amber-400">{progress}%</strong></span>
          <span>ACQUIRING <strong className="text-cyan-400">16,200</strong> SATELLITES</span>
        </div>

        {/* Enter Button */}
        {isReady ? (
          <button
            onClick={handleEnter}
            className="w-full py-3 px-6 bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400 text-cyan-300 font-display uppercase tracking-widest text-sm font-bold rounded transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] animate-pulse-cyan cursor-pointer"
          >
            ENTER MISSION CONTROL
          </button>
        ) : (
          <div className="text-xs uppercase tracking-widest text-slate-500 font-mono">
            SYSTEM BOOT IN PROGRESS...
          </div>
        )}
      </div>
    </div>
  );
};
