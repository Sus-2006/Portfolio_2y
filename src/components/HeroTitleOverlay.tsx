import React from 'react';
import { CelestialBodyId, PortfolioItem } from '../types/portfolio';
import { CRATER_REGIONS } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface HeroTitleOverlayProps {
  activeBody: CelestialBodyId;
  selectedItem: PortfolioItem | null;
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem | null) => void;
  onSelectBody: (body: CelestialBodyId) => void;
}

export const HeroTitleOverlay: React.FC<HeroTitleOverlayProps> = ({
  activeBody,
  selectedItem,
  items,
  onSelectItem,
  onSelectBody
}) => {
  // If an item is actively selected, hide the central hero title to keep interface clean
  if (selectedItem) return null;

  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none text-center font-mono select-none px-4 max-w-2xl w-full">
      {/* Subtle Aerospace Crest / Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] text-cyan-300 uppercase tracking-[0.25em] mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        LUNAR MISSION CONTROL • LEO / DEEP SPACE
      </div>

      {/* Main Hero Name */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-slate-100 glow-text-cyan mb-2">
        SUSMIT BHAR
      </h1>

      {/* Subtitle */}
      <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
        Electrical & Electronics Engineering • Builder • Engineer • Explorer
      </div>

      {/* Mission Line */}
      <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto italic font-sans leading-relaxed mb-6 px-4 py-2 rounded bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
        "Building systems at the intersection of engineering, software and space."
      </p>

      {/* Quick Jump Crater Bar */}
      {activeBody === 'moon' && (
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {CRATER_REGIONS.map((crater) => {
            const count = items.filter(i => i.craterName === crater.name || i.category === crater.category).length;
            return (
              <button
                key={crater.name}
                onClick={() => {
                  soundManager.playClick();
                  const firstItem = items.find(i => i.craterName === crater.name || i.category === crater.category);
                  if (firstItem) onSelectItem(firstItem);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-2.5 py-1 rounded bg-slate-950/90 hover:bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-[10px] text-slate-300 hover:text-cyan-300 uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                ● {crater.name} <span className="text-amber-400 font-bold">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Jump for Earth */}
      {activeBody === 'earth' && (
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
          <div className="px-3 py-1 rounded bg-blue-950/80 border border-blue-400 text-xs text-blue-300 uppercase tracking-wider">
            🌍 EARTH MISSION STATION: CURRENT ACTIVE PROJECTS & LAB WORK
          </div>
        </div>
      )}

      {/* Quick Jump for Mars */}
      {activeBody === 'mars' && (
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
          <div className="px-3 py-1 rounded bg-amber-950/80 border border-amber-400 text-xs text-amber-300 uppercase tracking-wider">
            ♂️ MARS FUTURE OUTPOST: DEEP TECH ASPIRATIONS & LONG-TERM VISION
          </div>
        </div>
      )}
    </div>
  );
};
