import React from 'react';
import { Play, Pause, FastForward, Navigation, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BottomTimelineBarProps {
  isPlaying: boolean;
  speed: number;
  coords: { lat: number; lon: number; alt: number };
  onTogglePlay: () => void;
  onChangeSpeed: (speed: number) => void;
}

export const BottomTimelineBar: React.FC<BottomTimelineBarProps> = ({
  isPlaying,
  speed,
  coords,
  onTogglePlay,
  onChangeSpeed
}) => {
  const speeds = [0.5, 1, 2, 5];

  const handlePlayToggle = () => {
    soundManager.playClick();
    onTogglePlay();
  };

  const handleSpeedChange = (newSpeed: number) => {
    soundManager.playClick();
    onChangeSpeed(newSpeed);
  };

  return (
    <footer className="absolute bottom-2 left-3 right-3 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-none font-mono text-xs select-none">
      {/* Left Coordinates & Telemetry Readout */}
      <div className="hud-panel px-3 py-1.5 rounded flex items-center gap-3 pointer-events-auto border-cyan-500/30 text-[11px] text-slate-300">
        <div className="hud-panel-corner hud-corner-bl" />
        <div className="flex items-center gap-1 text-cyan-400 font-bold uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>SUB-POINT:</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LAT: <strong className="text-slate-100">{coords.lat > 0 ? `+${coords.lat}` : coords.lat}°N</strong></span>
          <span>LON: <strong className="text-slate-100">{coords.lon}°W</strong></span>
          <span>ALT: <strong className="text-amber-400">{coords.alt}km</strong></span>
        </div>
      </div>

      {/* Center Orbital Timeline Scrubber & Speed Controls */}
      <div className="hud-panel px-4 py-1.5 rounded flex items-center gap-3 pointer-events-auto border-cyan-500/40 bg-slate-950/92">
        <button
          onClick={handlePlayToggle}
          onMouseEnter={() => soundManager.playHover()}
          className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 text-cyan-300 transition-colors cursor-pointer"
          title={isPlaying ? 'Pause Rotation' : 'Play Rotation'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1 border-l border-r border-slate-800 px-2">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider font-semibold text-emerald-400">LIVE ORBIT</span>
        </div>
      </div>

      {/* Right Interaction Hint */}
      <div className="hidden lg:flex hud-panel px-3 py-1.5 rounded items-center gap-2 pointer-events-auto border-slate-800 text-[10px] text-slate-400">
        <Navigation className="w-3 h-3 text-cyan-400" />
        <span>CLICK MARKER FOR DOSSIER • DRAG TO ROTATE • SCROLL TO ZOOM</span>
      </div>
    </footer>
  );
};
