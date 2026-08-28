import React, { useState } from 'react';
import { X, Eye, MapPin, Sun, Clock } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleClose = () => {
    soundManager.playClick();
    if (dontShowAgain) {
      localStorage.setItem('orbit_welcome_dismissed', 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono select-none">
      <div className="relative max-w-lg w-full hud-panel p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-[#070d18]/95 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-slate-100">
        <div className="hud-panel-corner hud-corner-tl" />
        <div className="hud-panel-corner hud-corner-tr" />
        <div className="hud-panel-corner hud-corner-bl" />
        <div className="hud-panel-corner hud-corner-br" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors p-1 rounded"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-amber-300 animate-pulse" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-slate-100">
              Welcome to the Orbital Globe
            </h2>
            <p className="text-xs text-cyan-400 font-mono">
              Live tracking & surface intelligence — for Susmit Bhar
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-4 mb-8 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-2.5 rounded bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-100 block mb-0.5">Explore 3 Celestial Bodies</strong>
              <span>Switch between the <strong>MOON</strong> (Completed work & skills), <strong>EARTH</strong> (Active projects), and <strong>MARS</strong> (Future aspirations).</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-100 block mb-0.5">Explore Craters & Surface Nodes</strong>
              <span>Click color-coded markers inside major craters (Electrical Eng, Software, Aerospace, Robotics, Research) for mission dossiers.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-100 block mb-0.5">Interactive Map Layers</strong>
              <span>Use the right panel to filter completed projects, active engineering nodes, research stations, and orbit paths.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded bg-indigo-500/10 text-indigo-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-100 block mb-0.5">Orbital Playback Scrubber</strong>
              <span>Scrub the bottom timeline to advance planetary rotation and inspect orbital telemetry.</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="accent-cyan-400 rounded border-slate-700 bg-slate-900"
            />
            <span>Don't show again</span>
          </label>

          <button
            onClick={handleClose}
            className="py-2.5 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display uppercase tracking-wider text-xs font-bold rounded shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
          >
            Explore System
          </button>
        </div>
      </div>
    </div>
  );
};
