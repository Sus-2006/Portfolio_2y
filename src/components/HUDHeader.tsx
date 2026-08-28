import React from 'react';
import { CelestialBodyId } from '../types/portfolio';
import { Volume2, VolumeX, HelpCircle, Radio, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HUDHeaderProps {
  activeBody: CelestialBodyId;
  isMuted: boolean;
  onSelectBody: (body: CelestialBodyId) => void;
  onToggleMute: () => void;
  onOpenHelp: () => void;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({
  activeBody,
  isMuted,
  onSelectBody,
  onToggleMute,
  onOpenHelp
}) => {
  const handleBodyClick = (body: CelestialBodyId) => {
    soundManager.playClick();
    onSelectBody(body);
  };

  return (
    <header className="absolute top-3 left-3 right-3 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-none font-mono">
      {/* Top Left Branding & Mission Title */}
      <div className="hud-panel px-4 py-2 rounded-md flex items-center gap-3 pointer-events-auto border-cyan-500/30">
        <div className="hud-panel-corner hud-corner-tl" />
        <div className="hud-panel-corner hud-corner-br" />
        
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
        </div>

        <div>
          <div className="font-display font-black text-sm tracking-widest text-slate-100 uppercase flex items-center gap-2">
            SUSMIT BHAR <span className="text-cyan-400 text-xs font-normal">/ MISSION CONTROL</span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span>EE • BUILDER • EXPLORER</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400">v2.4 ORBITAL ENGINE</span>
          </div>
        </div>
      </div>

      {/* Top Center Celestial Body Selector Tabs */}
      <div className="hud-panel p-1 rounded-md flex items-center gap-1 pointer-events-auto border-cyan-500/40 bg-slate-950/90 shadow-lg">
        <button
          onClick={() => handleBodyClick('moon')}
          onMouseEnter={() => soundManager.playHover()}
          className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeBody === 'moon'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <span className="text-sm">🌕</span>
          <span>MOON</span>
          <span className="text-[9px] px-1 bg-slate-800 text-cyan-400 rounded">PRESENT</span>
        </button>

        <button
          onClick={() => handleBodyClick('earth')}
          onMouseEnter={() => soundManager.playHover()}
          className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeBody === 'earth'
              ? 'bg-blue-500/25 text-blue-300 border border-blue-400 shadow-[0_0_12px_rgba(26,121,255,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <span className="text-sm">🌍</span>
          <span>EARTH</span>
          <span className="text-[9px] px-1 bg-slate-800 text-blue-400 rounded">ACTIVE</span>
        </button>

        <button
          onClick={() => handleBodyClick('mars')}
          onMouseEnter={() => soundManager.playHover()}
          className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeBody === 'mars'
              ? 'bg-amber-500/25 text-amber-300 border border-amber-400 shadow-[0_0_12px_rgba(255,183,3,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <span className="text-sm">♂️</span>
          <span>MARS</span>
          <span className="text-[9px] px-1 bg-slate-800 text-amber-400 rounded">FUTURE</span>
        </button>
      </div>

      {/* Top Right System Telemetry & Utility Actions */}
      <div className="hud-panel px-3 py-2 rounded-md flex items-center gap-3 pointer-events-auto border-cyan-500/30 text-xs">
        <div className="hud-panel-corner hud-corner-tr" />
        <div className="hud-panel-corner hud-corner-bl" />

        <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase text-emerald-400 tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </div>

        <div className="hidden md:block w-px h-4 bg-slate-800" />

        <div className="hidden md:block text-[10px] text-slate-400">
          LATENCY: <strong className="text-cyan-400">1.28s</strong>
        </div>

        <div className="w-px h-4 bg-slate-800" />

        {/* Audio Mute Button */}
        <button
          onClick={onToggleMute}
          onMouseEnter={() => soundManager.playHover()}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Help Guide Modal Toggle */}
        <button
          onClick={onOpenHelp}
          onMouseEnter={() => soundManager.playHover()}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          title="Open Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
