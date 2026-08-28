import React, { useState, useEffect } from 'react';
import { CelestialBodyId, MapLayerState, PortfolioItem } from './types/portfolio';
import { PORTFOLIO_ITEMS } from './data/portfolioData';
import { SpaceCanvas } from './components/SpaceCanvas';
import { HUDHeader } from './components/HUDHeader';
import { LeftDossierPanel } from './components/LeftDossierPanel';
import { RightMapLayersPanel } from './components/RightMapLayersPanel';
import { BottomTimelineBar } from './components/BottomTimelineBar';
import { HeroTitleOverlay } from './components/HeroTitleOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomeModal } from './components/WelcomeModal';
import { soundManager } from './utils/audio';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const [activeBody, setActiveBody] = useState<CelestialBodyId>('moon');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(true);
  const [timelineSpeed, setTimelineSpeed] = useState<number>(1);
  const [coords, setCoords] = useState<{ lat: number; lon: number; alt: number }>({
    lat: 18.4,
    lon: -57.4,
    alt: 118
  });

  const [mapLayers, setMapLayers] = useState<MapLayerState>({
    completedProjects: true,
    activeProjects: true,
    futureMissions: true,
    skillsMarkers: true,
    researchNodes: true,
    orbitalPaths: true,
    terminatorLight: true
  });

  // Handle ESC key to reset selection & number keys to jump celestial bodies
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedItem) {
          soundManager.playClick();
          setSelectedItem(null);
        }
      } else if (e.key === '1') {
        setActiveBody('moon');
        setSelectedItem(null);
      } else if (e.key === '2') {
        setActiveBody('earth');
        setSelectedItem(null);
      } else if (e.key === '3') {
        setActiveBody('mars');
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    const dismissed = localStorage.getItem('orbit_welcome_dismissed');
    if (!dismissed) {
      setIsWelcomeOpen(true);
    }
  };

  const handleToggleLayer = (key: keyof MapLayerState) => {
    setMapLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectBody = (body: CelestialBodyId) => {
    setActiveBody(body);
    setSelectedItem(null);
  };

  const handleSelectItem = (item: PortfolioItem | null) => {
    setSelectedItem(item);
    if (item) {
      setActiveBody(item.body);
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
  };

  return (
    <main className="relative w-full h-full bg-[#03060c] text-slate-100 overflow-hidden font-mono select-none">
      {/* Loading Sequence */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 3D WebGL Space Canvas (Moon, Earth, Mars, Satellites, Raycasting) */}
      <SpaceCanvas
        items={PORTFOLIO_ITEMS}
        activeBody={activeBody}
        selectedItem={selectedItem}
        mapLayers={mapLayers}
        isPlayingTimeline={isPlayingTimeline}
        timelineSpeed={timelineSpeed}
        onSelectItem={handleSelectItem}
        onSelectBody={handleSelectBody}
        onUpdateCoords={setCoords}
      />

      {/* Scanline & Grid HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines z-10 opacity-60" />

      {!isLoading && (
        <>
          {/* Top Aerospace Header HUD */}
          <HUDHeader
            activeBody={activeBody}
            isMuted={isMuted}
            onSelectBody={handleSelectBody}
            onToggleMute={handleToggleMute}
            onOpenHelp={() => setIsWelcomeOpen(true)}
          />

          {/* Central Hero Title Overlay */}
          <HeroTitleOverlay
            activeBody={activeBody}
            selectedItem={selectedItem}
            items={PORTFOLIO_ITEMS}
            onSelectItem={handleSelectItem}
            onSelectBody={handleSelectBody}
          />

          {/* Left Panel: Mission Dossier Inspector */}
          <LeftDossierPanel
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />

          {/* Right Panel: Map Layers & Environmental Conditions */}
          <RightMapLayersPanel
            activeBody={activeBody}
            mapLayers={mapLayers}
            onToggleLayer={handleToggleLayer}
          />

          {/* Bottom Bar: Telemetry Playback & Coordinates */}
          <BottomTimelineBar
            isPlaying={isPlayingTimeline}
            speed={timelineSpeed}
            coords={coords}
            onTogglePlay={() => setIsPlayingTimeline(!isPlayingTimeline)}
            onChangeSpeed={setTimelineSpeed}
          />

          {/* Welcome / Guide Modal */}
          <WelcomeModal
            isOpen={isWelcomeOpen}
            onClose={() => setIsWelcomeOpen(false)}
          />
        </>
      )}
    </main>
  );
};
