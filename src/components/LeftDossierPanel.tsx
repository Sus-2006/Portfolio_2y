import React, { useEffect, useRef } from 'react';
import { PortfolioItem } from '../types/portfolio';
import { X, ExternalLink, Github, FileText, Radio, Cpu, Layers, Activity } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LeftDossierPanelProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const LeftDossierPanel: React.FC<LeftDossierPanelProps> = ({ item, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render Telemetry Waveform Graph on Canvas (Matching Image 4 visual)
  useEffect(() => {
    if (!item || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Waveform curve from profile or synthetic sine wave
      const profile = item.telemetry.elevationProfile || [20, 50, 80, 95, 100, 90, 60, 30];
      ctx.strokeStyle = item.color || '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const step = canvas.width / (profile.length - 1);
      profile.forEach((val, i) => {
        const x = i * step;
        const animatedHeight = val + Math.sin(offset * 0.1 + i) * 6;
        const y = canvas.height - (animatedHeight / 100) * (canvas.height - 15) - 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Fill beneath wave gradient
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = `${item.color}15` || 'rgba(0, 240, 255, 0.08)';
      ctx.fill();

      // Moving Sweep Line
      const sweepX = (offset * 2.5) % canvas.width;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sweepX, 0);
      ctx.lineTo(sweepX, canvas.height);
      ctx.stroke();

      offset += 1;
      animId = requestAnimationFrame(renderGraph);
    };

    renderGraph();

    return () => cancelAnimationFrame(animId);
  }, [item]);

  if (!item) return null;

  return (
    <aside className="absolute top-20 left-3 bottom-14 z-40 w-[92vw] sm:w-[380px] max-w-[420px] hud-panel p-5 rounded-lg border-cyan-500/40 bg-slate-950/92 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-y-auto font-mono text-slate-100 select-none">
      <div className="hud-panel-corner hud-corner-tl" />
      <div className="hud-panel-corner hud-corner-tr" />
      <div className="hud-panel-corner hud-corner-bl" />
      <div className="hud-panel-corner hud-corner-br" />

      <div>
        {/* Header / Tracking Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              TRACKING / MISSION DOSSIER
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Return to surface overview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category & Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {item.category}
          </span>
          <span 
            className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${item.color}25`, color: item.color, border: `1px solid ${item.color}50` }}
          >
            ● {item.status}
          </span>
        </div>

        {/* Item Main Title */}
        <h2 className="font-display text-xl font-bold text-slate-100 tracking-wide mb-1 leading-snug">
          {item.title}
        </h2>
        <div className="text-xs text-amber-400 font-mono mb-4">
          {item.subtitle}
        </div>

        {/* Telemetry Numeric Matrix (Altitude, Velocity, Frequency, Sub-Point) */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded bg-slate-900/80 border border-slate-800 text-center mb-4">
          <div>
            <div className="text-[9px] uppercase text-slate-400">ALTITUDE</div>
            <div className="text-xs font-bold text-cyan-300">{item.telemetry.altitude || '100 km'}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-400">VELOCITY</div>
            <div className="text-xs font-bold text-amber-300">{item.telemetry.velocity || '1.64 km/s'}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-400">SIGNAL</div>
            <div className="text-xs font-bold text-emerald-400">{item.telemetry.signalQuality || 98}%</div>
          </div>
        </div>

        {/* Telemetry Waveform Oscilloscope */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" /> GROUND TRACK TELEMETRY
            </span>
            <span>SUB-POINT: {item.telemetry.subPoint || '18.4°N 138.7°W'}</span>
          </div>
          <div className="relative w-full h-20 bg-slate-950 rounded border border-slate-800 overflow-hidden">
            <canvas ref={canvasRef} width={340} height={80} className="w-full h-full" />
          </div>
        </div>

        {/* Summary & Objective */}
        <div className="space-y-3 mb-5 text-xs text-slate-300 leading-relaxed">
          <div>
            <strong className="text-cyan-400 uppercase text-[10px] tracking-wider block mb-1">SUMMARY:</strong>
            <p className="bg-slate-900/40 p-2.5 rounded border border-slate-800/60">{item.summary}</p>
          </div>
          <div>
            <strong className="text-amber-400 uppercase text-[10px] tracking-wider block mb-1">OBJECTIVE:</strong>
            <p className="bg-slate-900/40 p-2.5 rounded border border-slate-800/60">{item.objective}</p>
          </div>
          <div>
            <strong className="text-slate-200 uppercase text-[10px] tracking-wider block mb-1">DETAILED DOSSIER:</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">{item.detailedDossier}</p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase mb-2">
            <Cpu className="w-3 h-3" /> TECHNOLOGY SPECIFICATION
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.map((tech, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Associated */}
        <div className="mb-5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase mb-2">
            <Layers className="w-3 h-3" /> ASSOCIATED COMPETENCIES
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions & Links */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        {item.links?.demo && (
          <a
            href={item.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="w-full py-2 px-3 rounded bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>LAUNCH DEMO SYSTEM</span>
          </a>
        )}

        {item.links?.github && (
          <a
            href={item.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="w-full py-2 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            <span>INSPECT SOURCE CODE</span>
          </a>
        )}

        {item.links?.paper && (
          <a
            href={item.links.paper}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="w-full py-2 px-3 rounded bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>READ RESEARCH PAPER</span>
          </a>
        )}

        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full py-2 px-3 rounded bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
        >
          RETURN TO SURFACE OVERVIEW (ESC)
        </button>
      </div>
    </aside>
  );
};
