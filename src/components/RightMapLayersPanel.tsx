import React from 'react';
import { CelestialBodyId, MapLayerState } from '../types/portfolio';
import { Layers, Thermometer, Globe, Sun, Compass, Radio } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RightMapLayersPanelProps {
  activeBody: CelestialBodyId;
  mapLayers: MapLayerState;
  onToggleLayer: (layerKey: keyof MapLayerState) => void;
}

export const RightMapLayersPanel: React.FC<RightMapLayersPanelProps> = ({
  activeBody,
  mapLayers,
  onToggleLayer
}) => {
  const handleToggle = (key: keyof MapLayerState) => {
    soundManager.playClick();
    onToggleLayer(key);
  };

  return (
    <aside className="absolute top-20 right-3 bottom-14 z-40 w-[90vw] sm:w-[300px] hud-panel p-4 rounded-lg border-cyan-500/30 bg-slate-950/90 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-y-auto font-mono text-slate-100 select-none">
      <div className="hud-panel-corner hud-corner-tr" />
      <div className="hud-panel-corner hud-corner-br" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              MAP LAYERS & FILTERS
            </span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase">
            {activeBody} MODE
          </span>
        </div>

        {/* Layer Toggles */}
        <div className="space-y-2 mb-6 text-xs">
          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-slate-200">Completed Projects</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.completedProjects}
              onChange={() => handleToggle('completedProjects')}
              className="accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-slate-200">Active Earth Projects</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.activeProjects}
              onChange={() => handleToggle('activeProjects')}
              className="accent-blue-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-amber-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-slate-200">Future Mars Missions</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.futureMissions}
              onChange={() => handleToggle('futureMissions')}
              className="accent-amber-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-200">Skill Beacons</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.skillsMarkers}
              onChange={() => handleToggle('skillsMarkers')}
              className="accent-emerald-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-rose-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="text-slate-200">Research Nodes</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.researchNodes}
              onChange={() => handleToggle('researchNodes')}
              className="accent-rose-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-slate-200">Orbital Paths & Satellites</span>
            </div>
            <input
              type="checkbox"
              checked={mapLayers.orbitalPaths}
              onChange={() => handleToggle('orbitalPaths')}
              className="accent-indigo-400"
            />
          </label>
        </div>

        {/* Environmental Conditions Panel */}
        <div className="border-t border-slate-800 pt-4 mb-4">
          <div className="flex items-center gap-2 mb-3 text-xs uppercase text-amber-400 font-bold">
            <Sun className="w-4 h-4" />
            <span>CELESTIAL CONDITIONS</span>
          </div>

          <div className="bg-slate-900/80 rounded border border-slate-800 p-3 text-xs space-y-2">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Body Phase:</span>
              <strong className="text-cyan-300">Waxing Gibbous (99%)</strong>
            </div>

            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Surface Temp:</span>
              <span className="text-slate-200">-130°C to +120°C</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Earth Distance:</span>
              <span className="text-slate-200">388,522 km</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Solar Day:</span>
              <span className="text-slate-200">29.5 Earth Days</span>
            </div>
          </div>
        </div>

        {/* Space Weather Section */}
        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between text-xs uppercase text-emerald-400 font-bold mb-2">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> SPACE WEATHER
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300">● NORMAL</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-500">FLUX</div>
              <div className="font-bold text-cyan-300">380 sfu</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-500">X-RAY</div>
              <div className="font-bold text-amber-300">B4.4</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-500">WIND</div>
              <div className="font-bold text-emerald-300">411 km/s</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
