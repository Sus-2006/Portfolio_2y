import { PortfolioItem } from '../types/portfolio';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ==========================================
  // MOON: COMPLETED PROJECTS & SKILL CRATERS
  // ==========================================
  
  // --- ELECTRICAL ENGINEERING (Tycho Crater) ---
  {
    id: 'ee-tycho-01',
    title: 'High-Frequency PCB Signal Integrity Analyzer',
    subtitle: 'Tycho Crater Node • Signal Hardware',
    category: 'ELECTRICAL ENGINEERING',
    craterName: 'Tycho Crater',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: -43.3, lon: -11.2 },
    color: '#ffb703', // Gold
    summary: 'Multi-layer high-speed differential pair routing and impedance matching diagnostic board for low-noise RF telemetry acquisition.',
    objective: 'To minimize reflection, cross-talk, and signal degradation across multi-gigahertz embedded data lines in space-grade controllers.',
    detailedDossier: 'Engineered a specialized test fixture and transmission line analyzer operating up to 6 GHz. Designed custom microstrip and stripline PCB layouts in Altium Designer, validating S-parameters and eye-diagram signal clarity using TDR oscilloscopes.',
    techStack: ['Altium Designer', 'ANSYS HFSS', 'SPICE', 'Impedance Matching', 'Oscilloscopes'],
    skills: ['Circuit Design', 'High-Speed PCB Layout', 'Signal Integrity', 'RF Electronics'],
    telemetry: {
      altitude: '0.4 km',
      velocity: '0.0 km/s',
      frequency: '6.0 GHz',
      signalQuality: 98,
      subPoint: '43.3°S 11.2°W',
      elevationProfile: [10, 25, 40, 85, 95, 90, 75, 40, 20, 10]
    },
    links: {
      github: 'https://github.com/susmitbhar/pcb-signal-analyzer',
      demo: 'https://susmitbhar.dev/projects/pcb-analyzer'
    }
  },
  {
    id: 'ee-tycho-02',
    title: 'Power Electronics Synchronous Buck-Boost System',
    subtitle: 'Tycho Crater Node • Power Grid',
    category: 'ELECTRICAL ENGINEERING',
    craterName: 'Tycho Crater',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: -41.0, lon: -8.5 },
    color: '#ffb703',
    summary: 'High-efficiency 96.4% digital control buck-boost converter designed for solar cell array battery charging.',
    objective: 'Provide regulated 28V DC bus power from variable solar panel voltage under wide temperature swings.',
    detailedDossier: 'Developed peak-current-mode controlled converter utilizing GaN FET switches for low gate charge and reduced switching loss. Microcontroller firmware implements adaptive Maximum Power Point Tracking (MPPT).',
    techStack: ['GaN Transistors', 'STM32 MCU', 'Simulink', 'Thermal Management'],
    skills: ['Power Electronics', 'MPPT Control', 'Thermal Analysis', 'SMPS Design'],
    telemetry: {
      frequency: '250 kHz',
      signalQuality: 96,
      subPoint: '41.0°S 8.5°W',
      elevationProfile: [5, 30, 60, 96, 96, 96, 70, 35, 10]
    }
  },

  // --- AEROSPACE & SPACE SYSTEMS (Mare Tranquillitatis) ---
  {
    id: 'aero-tranquil-01',
    title: 'Space Flight Control Simulator',
    subtitle: 'Mare Tranquillitatis • Orbital Systems',
    category: 'AEROSPACE & SPACE SYSTEMS',
    craterName: 'Mare Tranquillitatis',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 8.5, lon: 31.4 },
    color: '#00f0ff', // Cyan
    summary: 'Real-time 6-DOF spacecraft attitude control simulator with reaction wheel desaturation and thruster allocation logic.',
    objective: 'Simulate spacecraft guidance, navigation, and control (GNC) algorithms under gravitational perturbations and solar radiation pressure.',
    detailedDossier: 'Built a full orbital propagation and attitude dynamics simulator integrating Runge-Kutta 4th order ODE solvers. Features real-time visual 3D telemetry rendering, PID/LQR quaternion attitude tracking, and Monte Carlo orbital dispersion analysis.',
    techStack: ['Python', 'C++', 'Three.js', 'Control Systems', 'Quaternion Math'],
    skills: ['Spacecraft GNC', 'Orbital Mechanics', 'Numerical Physics', '6-DOF Simulation'],
    telemetry: {
      altitude: '100 km',
      velocity: '1.63 km/s',
      period: '118 min',
      signalQuality: 99,
      subPoint: '8.5°N 31.4°E',
      elevationProfile: [20, 50, 80, 99, 100, 99, 85, 45, 15]
    },
    links: {
      github: 'https://github.com/susmitbhar/flight-control-sim',
      demo: 'https://susmitbhar.dev/space-flight-sim'
    }
  },
  {
    id: 'aero-tranquil-02',
    title: 'CubeSat Communication Link Budget Calculator',
    subtitle: 'Mare Tranquillitatis • Space Comms',
    category: 'AEROSPACE & SPACE SYSTEMS',
    craterName: 'Mare Tranquillitatis',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 10.2, lon: 34.1 },
    color: '#00f0ff',
    summary: 'S-band and UHF link margin optimization tool for LEO/Lunar smallsat communications.',
    objective: 'Calculate path loss, atmospheric attenuation, antenna gain requirements, and BER for reliable telemetry downlink.',
    detailedDossier: 'Modeled Doppler shifts, free-space path loss, and antenna radiation patterns to compute link budgets for ground station contact passes.',
    techStack: ['Python', 'SciPy', 'MATLAB', 'RF Communications'],
    skills: ['RF Link Budget', 'Satellite Communications', 'Doppler Tracking'],
    telemetry: {
      frequency: '2.2 GHz',
      signalQuality: 94,
      subPoint: '10.2°N 34.1°E',
      elevationProfile: [15, 35, 60, 94, 94, 75, 40, 20]
    }
  },

  // --- SOFTWARE & DEV (Copernicus Crater) ---
  {
    id: 'sw-copernicus-01',
    title: 'Orbital Radar WebGL Telemetry Engine',
    subtitle: 'Copernicus Crater • Mission GUI',
    category: 'SOFTWARE & DEV',
    craterName: 'Copernicus Crater',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 9.6, lon: -20.1 },
    color: '#1a79ff', // Electric Blue
    summary: 'High-performance interactive 3D telemetry rendering engine for spatial data visualization and mission control dashboards.',
    objective: 'Render 10,000+ interactive ground track nodes and orbital vectors at 60 FPS on browser GPUs without frame drops.',
    detailedDossier: 'Utilized custom GLSL shaders, instanced mesh geometry, and WebGL raycasting algorithms to construct an immersive aerospace dashboard UI. Supports real-time WebSocket telemetry ingestion and spatial audio cues.',
    techStack: ['TypeScript', 'Three.js', 'WebGL / GLSL', 'React', 'WebSockets'],
    skills: ['3D Web Graphics', 'GLSL Shader Programming', 'Software Architecture', 'UI/UX Engineering'],
    telemetry: {
      frequency: '60 FPS',
      signalQuality: 100,
      subPoint: '9.6°N 20.1°W',
      elevationProfile: [30, 70, 90, 100, 100, 100, 85, 50, 20]
    },
    links: {
      github: 'https://github.com/susmitbhar/orbital-radar-engine'
    }
  },
  {
    id: 'sw-copernicus-02',
    title: 'Distributed Sensor Mesh Communication Protocol',
    subtitle: 'Copernicus Crater • Distributed Systems',
    category: 'SOFTWARE & DEV',
    craterName: 'Copernicus Crater',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 12.0, lon: -22.5 },
    color: '#1a79ff',
    summary: 'Fault-tolerant peer-to-peer wireless telemetry distribution network protocol for multi-node sensor arrays.',
    objective: 'Ensure zero message loss across lossy RF channels using decentralized mesh routing and adaptive packet retry.',
    detailedDossier: 'Implemented light-weight serialization protocol and dynamic route discovery algorithms with encryption for embedded nodes.',
    techStack: ['C++', 'Embedded C', 'Protobuf', 'LoRa', 'Linux'],
    skills: ['Distributed Protocols', 'Network Security', 'Embedded Systems'],
    telemetry: {
      signalQuality: 97,
      subPoint: '12.0°N 22.5°W',
      elevationProfile: [25, 45, 75, 97, 97, 80, 40, 15]
    }
  },

  // --- ROBOTICS & EMBEDDED SYSTEMS (Oceanus Procellarum) ---
  {
    id: 'rob-oceanus-01',
    title: 'Autonomous Rover Terrain Navigation Controller',
    subtitle: 'Oceanus Procellarum • Robotics Node',
    category: 'ROBOTICS & EMBEDDED',
    craterName: 'Oceanus Procellarum',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 18.4, lon: -57.4 },
    color: '#10b981', // Emerald Green
    summary: 'Embedded ROS2 autonomy stack featuring elevation grid mapping, obstacle avoidance, and path-following controllers.',
    objective: 'Enable autonomous surface traversal across hazard-strewn planetary analog terrain without human intervention.',
    detailedDossier: 'Integrated stereo depth cameras and 9-axis IMU sensors via extended Kalman filtering (EKF) for SLAM pose estimation. Implemented TEB Local Planner for fast obstacle avoidance motion control on ARM Cortex-A72 hardware.',
    techStack: ['ROS2', 'C++', 'Python', 'OpenCV', 'EKF SLAM', 'RTOS'],
    skills: ['Autonomous Navigation', 'Robotics Systems', 'Embedded Linux', 'Sensor Fusion'],
    telemetry: {
      altitude: '0.0 km',
      velocity: '0.8 m/s',
      signalQuality: 96,
      subPoint: '18.4°N 57.4°W',
      elevationProfile: [10, 40, 70, 96, 96, 90, 60, 30, 10]
    },
    links: {
      github: 'https://github.com/susmitbhar/rover-autonomy-stack'
    }
  },
  {
    id: 'rob-oceanus-02',
    title: 'Microcontroller CAN-Bus Actuator Driver',
    subtitle: 'Oceanus Procellarum • Embedded Drive',
    category: 'ROBOTICS & EMBEDDED',
    craterName: 'Oceanus Procellarum',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 20.8, lon: -54.2 },
    color: '#10b981',
    summary: 'Real-time CAN-bus motor driver firmware with current, velocity, and position control loops for robotic manipulators.',
    objective: 'Achieve sub-millisecond torque loop execution for precise robotic arm joint positioning under payload shifts.',
    detailedDossier: 'Built custom PCB drive hardware and FreeRTOS tasks to execute Field Oriented Control (FOC) algorithm driving BLDC motors.',
    techStack: ['STM32', 'FreeRTOS', 'CAN Bus', 'FOC Motor Control', 'C'],
    skills: ['Embedded Firmware', 'Motor Control', 'RTOS Scheduling'],
    telemetry: {
      frequency: '1.0 kHz',
      signalQuality: 99,
      subPoint: '20.8°N 54.2°W',
      elevationProfile: [30, 60, 85, 99, 99, 85, 50, 20]
    }
  },

  // --- RESEARCH (Shackleton South Pole Station) ---
  {
    id: 'res-shackleton-01',
    title: 'Capillary-Fed Electrolysis in Microgravity',
    subtitle: 'Shackleton Crater • Lunar South Pole Research Node',
    category: 'RESEARCH',
    craterName: 'Shackleton South Pole',
    body: 'moon',
    status: 'RESEARCH',
    location: { lat: -89.9, lon: 0.0 },
    color: '#ff2e63', // Crimson / Magenta
    summary: 'Experimental research into capillary transport mechanisms for bubble-free water electrolysis in low-gravity environments.',
    objective: 'Prevent gas bubble buoyancy stagnation at electrode surfaces during Zero-G oxygen and hydrogen generation.',
    detailedDossier: 'Investigated porous capillary transport media that utilize capillary pressure to continuously feed liquid electrolyte while immediately separating evolved O2 and H2 gases without microgravity pumps or centrifugal separators. Formulated multiphase fluid dynamics models in ANSYS Fluent.',
    techStack: ['Capillary Transport', 'Electrochemistry', 'ANSYS Fluent', 'Microgravity Fluids', 'Thermal Analysis'],
    skills: ['Applied Research', 'Multiphase Fluid Dynamics', 'Electrochemical Engineering', 'ISRU Systems'],
    telemetry: {
      altitude: '0.0 km',
      subPoint: '89.9°S 0.0°E',
      signalQuality: 100,
      elevationProfile: [5, 20, 50, 80, 100, 100, 85, 40, 10]
    },
    links: {
      paper: 'https://susmitbhar.dev/research/capillary-electrolysis'
    }
  },

  // --- QUANT & ANALYTICS (Kepler Crater) ---
  {
    id: 'quant-kepler-01',
    title: 'High-Frequency Telemetry Stream Analytics Pipeline',
    subtitle: 'Kepler Crater • Data Science',
    category: 'QUANT & ANALYTICS',
    craterName: 'Kepler Crater',
    body: 'moon',
    status: 'COMPLETED',
    location: { lat: 8.1, lon: -38.0 },
    color: '#38bdf8',
    summary: 'Sub-millisecond time-series processing pipeline for continuous telemetry anomaly detection and predictive maintenance.',
    objective: 'Detect micro-deviations in bus voltages and thermal telemetry before sensor failure occurs.',
    detailedDossier: 'Utilized Rust and Python binding engines to process high-rate telemetry data, executing sliding-window statistical analysis.',
    techStack: ['Python', 'Rust', 'Kafka', 'Time-Series DB', 'NumPy'],
    skills: ['Time-Series Processing', 'Predictive Modeling', 'High-Throughput Pipelines'],
    telemetry: {
      signalQuality: 98,
      subPoint: '8.1°N 38.0°W',
      elevationProfile: [20, 50, 85, 98, 98, 80, 40, 15]
    }
  },

  // ==========================================
  // EARTH: ACTIVE / CURRENT WORKING PROJECTS
  // ==========================================
  {
    id: 'earth-active-01',
    title: 'Orbital Radar Portfolio & Mission Interface Engine',
    subtitle: 'Active Earth Station • Current Core Focus',
    category: 'SOFTWARE & DEV',
    body: 'earth',
    status: 'ACTIVE DEVELOPMENT',
    location: { lat: 37.77, lon: -122.41 },
    color: '#00f0ff',
    summary: 'The very WebGL space exploration portfolio engine you are exploring right now!',
    objective: 'Bridge complex aerospace telemetry UI paradigms with modern web portfolio interaction.',
    detailedDossier: 'Crafted as an original personal engineering showcase for Susmit Bhar. Combines procedural planet rendering, spatial markers, interactive telemetry inspector, map layers, and sound synthesis.',
    techStack: ['React', 'TypeScript', 'Three.js', 'WebGL Shaders', 'Vite'],
    skills: ['Full-Stack Systems', 'Interactive 3D', 'State Management'],
    telemetry: {
      altitude: '400 km',
      velocity: '7.66 km/s',
      signalQuality: 100,
      subPoint: '37.7°N 122.4°W',
      elevationProfile: [10, 40, 70, 100, 100, 100, 70, 40, 10]
    }
  },
  {
    id: 'earth-active-02',
    title: 'Next-Gen Capillary Electrolyser Test Rig',
    subtitle: 'Active Hardware Laboratory • Active EE & Fluids',
    category: 'RESEARCH',
    body: 'earth',
    status: 'ACTIVE DEVELOPMENT',
    location: { lat: 28.53, lon: -81.37 },
    color: '#ffb703',
    summary: 'Physical benchtop prototype of capillary-driven electrolyser cell with integrated telemetry sensors.',
    objective: 'Validate electrochemical efficiency curves and continuous flow stability under differential pressure loads.',
    detailedDossier: 'Designing custom driver electronics with embedded current-sense amplifications, high-accuracy pressure transducers, and automatic safety shutdown cutoffs.',
    techStack: ['Hardware Benchtop', 'STM32 Microcontrollers', 'Pressure Sensors', 'LabVIEW'],
    skills: ['Embedded Sensors', 'Electrochemical Prototyping', 'Hardware Testing'],
    telemetry: {
      signalQuality: 95,
      subPoint: '28.5°N 81.4°W',
      elevationProfile: [15, 45, 80, 95, 95, 85, 50, 20]
    }
  },
  {
    id: 'earth-active-03',
    title: 'Real-Time Satellite Telemetry DSP Decoder',
    subtitle: 'Active Software • RF & Signal Processing',
    category: 'ELECTRICAL ENGINEERING',
    body: 'earth',
    status: 'ACTIVE DEVELOPMENT',
    location: { lat: 51.50, lon: -0.12 },
    color: '#10b981',
    summary: 'Software-Defined Radio (SDR) receiver pipeline for decoding weather satellite and CubeSat telemetry transmissions.',
    objective: 'Decode BPSK/QPSK modulation telemetry packets directly from SDR IQ samples in real time.',
    detailedDossier: 'Implementing Costas loop carrier recovery, Symbol timing synchronization, and Reed-Solomon forward error correction algorithms in C++.',
    techStack: ['C++', 'GNU Radio', 'SDR Hardware', 'Digital Signal Processing'],
    skills: ['DSP Algorithms', 'SDR Protocols', 'C++ System Design'],
    telemetry: {
      frequency: '137.5 MHz',
      signalQuality: 97,
      subPoint: '51.5°N 0.1°W',
      elevationProfile: [20, 55, 85, 97, 97, 75, 35, 10]
    }
  },

  // ==========================================
  // MARS: FUTURE ASPIRATIONS & LONG-TERM MISSIONS
  // ==========================================
  {
    id: 'mars-future-01',
    title: 'Deep Space Autonomous Swarm Robotics',
    subtitle: 'Valles Marineris Station • Future Vision',
    category: 'ROBOTICS & EMBEDDED',
    body: 'mars',
    status: 'FUTURE ASPIRATION',
    location: { lat: -13.9, lon: -59.2 },
    color: '#ff2e63',
    summary: 'Decentralized autonomous robot swarms for cooperative planetary surface mapping and lava tube shelter exploration.',
    objective: 'Deploy dozens of micro-rovers that self-organize, dynamic-route communications, and map cavern networks without orbital GPS.',
    detailedDossier: 'A long-term engineering vision aimed at advancing autonomous swarm intelligence, bio-inspired spatial coordination, and mesh communications for deep space robotic exploration.',
    techStack: ['Swarm Autonomy', 'Decentralized AI', 'Mesh Radios', 'Robotics Systems'],
    skills: ['System Architecture', 'Swarm Algorithms', 'Future Exploration'],
    telemetry: {
      altitude: '225 km',
      signalQuality: 90,
      subPoint: '13.9°S 59.2°W',
      elevationProfile: [10, 30, 60, 90, 90, 90, 60, 30, 10]
    }
  },
  {
    id: 'mars-future-02',
    title: 'Interplanetary Quantum Signal Relay',
    subtitle: 'Olympus Mons Outpost • Deep Tech Concept',
    category: 'AEROSPACE & SPACE SYSTEMS',
    body: 'mars',
    status: 'FUTURE ASPIRATION',
    location: { lat: 18.6, lon: -133.8 },
    color: '#00f0ff',
    summary: 'Ultra-low latency deep-space laser communication and quantum key distribution system concept.',
    objective: 'Solve deep space data bandwidth bottlenecks between Earth, Lunar Gateway, and Martian surface installations.',
    detailedDossier: 'Investigating high-precision beam steering optoelectronics and photon-counting detectors capable of locking optical communication links across 200M+ kilometers.',
    techStack: ['Laser Communications', 'Optoelectronics', 'Quantum Key Distribution'],
    skills: ['Deep Space Comms', 'Optics & Lasers', 'Pioneer Research'],
    telemetry: {
      signalQuality: 88,
      subPoint: '18.6°N 133.8°W',
      elevationProfile: [10, 35, 70, 88, 88, 70, 35, 10]
    }
  },
  {
    id: 'mars-future-03',
    title: 'In-Situ Atmospheric Fuel Harvesting Facility',
    subtitle: 'Elysium Planitia • Future Energy Grid',
    category: 'RESEARCH',
    body: 'mars',
    status: 'FUTURE ASPIRATION',
    location: { lat: 4.5, lon: 155.0 },
    color: '#ffb703',
    summary: 'Scalable Sabatier reaction atmospheric capture and liquid methane / oxygen production plant concept.',
    objective: 'Provide fully autonomous propellant production for return vehicles from Martian ambient CO2 and sub-surface ice.',
    detailedDossier: 'A comprehensive energy-mass balance model incorporating solar-thermal concentrators, Solid Oxide Electrolyser Cells (SOEC), and cryogenic storage systems.',
    techStack: ['ISRU Chemical Plants', 'Thermodynamics', 'SOEC Electrolysis', 'Cryogenics'],
    skills: ['Energy Systems', 'Chemical Engineering', 'Space Infrastructure'],
    telemetry: {
      signalQuality: 92,
      subPoint: '4.5°N 155.0°E',
      elevationProfile: [15, 40, 75, 92, 92, 75, 45, 15]
    }
  }
];

export const CRATER_REGIONS = [
  {
    name: 'Tycho Crater',
    category: 'ELECTRICAL ENGINEERING' as const,
    coords: '43.3°S 11.2°W',
    body: 'moon' as const,
    description: 'Hardware design, signal integrity, power electronics, and PCB routing architecture.',
    icon: 'Zap'
  },
  {
    name: 'Mare Tranquillitatis',
    category: 'AEROSPACE & SPACE SYSTEMS' as const,
    coords: '8.5°N 31.4°E',
    body: 'moon' as const,
    description: 'Spacecraft GNC, attitude dynamics simulation, orbital mechanics, and satellite communication link budgets.',
    icon: 'Rocket'
  },
  {
    name: 'Copernicus Crater',
    category: 'SOFTWARE & DEV' as const,
    coords: '9.6°N 20.1°W',
    body: 'moon' as const,
    description: 'WebGL graphics engines, telemetry dashboards, real-time distributed systems, and C++/Python development.',
    icon: 'Code'
  },
  {
    name: 'Oceanus Procellarum',
    category: 'ROBOTICS & EMBEDDED' as const,
    coords: '18.4°N 57.4°W',
    body: 'moon' as const,
    description: 'ROS2 rover autonomy stack, real-time CAN motor drivers, RTOS microcontrollers, and sensor fusion.',
    icon: 'Cpu'
  },
  {
    name: 'Shackleton South Pole',
    category: 'RESEARCH' as const,
    coords: '89.9°S 0.0°E',
    body: 'moon' as const,
    description: 'Capillary-fed electrolysis in microgravity, ISRU energy storage, thermal dynamics, and zero-G fluid research.',
    icon: 'FlaskConical'
  },
  {
    name: 'Kepler Crater',
    category: 'QUANT & ANALYTICS' as const,
    coords: '8.1°N 38.0°W',
    body: 'moon' as const,
    description: 'Sub-millisecond telemetry stream processing, anomaly detection, time-series data pipelines.',
    icon: 'BarChart3'
  }
];
