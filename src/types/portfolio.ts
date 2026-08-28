export type CelestialBodyId = 'moon' | 'earth' | 'mars';

export type CraterCategory = 
  | 'ELECTRICAL ENGINEERING'
  | 'SOFTWARE & DEV'
  | 'AEROSPACE & SPACE SYSTEMS'
  | 'ROBOTICS & EMBEDDED'
  | 'RESEARCH'
  | 'QUANT & ANALYTICS';

export type MarkerStatus = 'COMPLETED' | 'ACTIVE DEVELOPMENT' | 'RESEARCH' | 'FUTURE ASPIRATION';

export interface MarkerLocation {
  lat: number;  // Latitude in degrees (-90 to +90)
  lon: number;  // Longitude in degrees (-180 to +180)
  radiusOffset?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: CraterCategory;
  craterName?: string;
  body: CelestialBodyId;
  status: MarkerStatus;
  location: MarkerLocation;
  color: string; // hex color for HUD & dot glow
  summary: string;
  objective: string;
  detailedDossier: string;
  techStack: string[];
  skills: string[];
  telemetry: {
    altitude?: string;
    velocity?: string;
    frequency?: string;
    period?: string;
    signalQuality?: number; // 0 - 100%
    subPoint?: string;
    elevationProfile?: number[]; // array of normalized height points for telemetry graph
  };
  links?: {
    demo?: string;
    github?: string;
    paper?: string;
  };
}

export interface MapLayerState {
  completedProjects: boolean;
  activeProjects: boolean;
  futureMissions: boolean;
  skillsMarkers: boolean;
  researchNodes: boolean;
  orbitalPaths: boolean;
  terminatorLight: boolean;
}

export interface MissionTelemetryState {
  selectedItem: PortfolioItem | null;
  activeBody: CelestialBodyId;
  isPlayingTimeline: boolean;
  timelineSpeed: number;
  timelineProgress: number; // 0 - 100
  cameraTargetItem: PortfolioItem | null;
  mapLayers: MapLayerState;
  isMuted: boolean;
}
