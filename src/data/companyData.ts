export interface Project {
  id: string;
  sNo: number;
  name: string;
  client: string;
  location: string;
  status: 'Completed' | 'Ongoing' | 'Tunnel' | 'International';
  contractValue: string;
  rawAmount: number; // in Rupees
  dateOfStart?: string;
  dateOfCompletion?: string;
  description: string;
  imageUrl: string;
}

export interface TunnelExperience {
  sNo: number;
  name: string;
  length: string;
  location: string;
}

export interface FinancialGrowth {
  year: string;
  revenue: string; // formatted
  rawAmount: number; // in Rupees
}

export interface Equipment {
  sNo: number;
  name: string;
  make?: string;
  capacity?: string;
  qty: string;
  calibrationAge?: string;
}

export interface Manpower {
  sNo: number;
  role: string;
  count: number;
}

export interface License {
  sNo: number;
  name: string;
  number: string;
  expiry: string;
}

export const COMPANY_PROFILE = {
  name: "Unique Power Systems",
  brandName: "UPS",
  established: 2010,
  yearsExperience: 16,
  tagline: "Delivering Reliable. Building Trust. Powering a Better Tomorrow.",
  proprietor: "K N V Rama Kumar",
  email: "uniquepowers@gmail.com",
  phone: "+91 7896675502",
  whatsapp: "+917896675502",
  logoText: "UNIQUE POWER SYSTEMS",
  addresses: {
    registered: {
      title: "Registered Office",
      address: "Flat No. 101, 94-Silkwood Apartments, Srini Avenue Gate No.1, High Tension Line Road, PetBasheerabad, Hyderabad, Telangana – 500067.",
      mobile: "+91 7896675502",
    },
    delhi: {
      title: "Delhi Branch Office",
      address: "4th Floor, Plot No. A-20, Block-A, Dwarka Sector-8, New Delhi – 110077.",
    },
    lonavala: {
      title: "Lonavala Branch Office",
      address: "D-2, DN Valley, Valvan, Lonavala – 410401.",
    }
  },
  clients: [
    "Navayuga Engineering Company Ltd",
    "DRDO (Ministry of Defence)",
    "RVR Projects Pvt Ltd",
    "PLRC Ltd",
    "Supreme Weather Makers",
    "Sushron Electronics Pvt Ltd",
    "National Technical Research Organization (NTRO)",
    "Nitin S Palekar",
    "Beaver Infra Consultants Pvt Ltd",
    "RYB Power Controls Pvt Ltd",
    "Inovic Power Solutions Pvt Ltd",
    "Witt India Pvt Ltd",
    "APGENCO",
    "KNVUPS Pvt Ltd",
    "Brahmos Aerospace Private Limited",
    "Totowao Development Corporation",
    "Sai Govind Infra Developers Private Limited"
  ]
};

export const SERVICES_DATA = [
  {
    id: "electrical-contracting",
    title: "Electrical Contracting",
    description: "End-to-end extra high voltage (EHV) and medium/low voltage electrification systems including substations, cabling, earthing, and industrial power distribution.",


    imageUrl: "https://media.istockphoto.com/id/2166685594/photo/electricity-and-electrical-maintenance-service-electrical-tests-industrial-electrical.jpg?s=612x612&w=0&k=20&c=SNQCi1fO5KNMCJLaQIbEW6hQNJQ1XBGGpytgeT6hX0I=",

    iconName: "Zap",
    features: [
      "Substation Installation & Commissioning",
      "EHV Cable Laying & Jointing",
      "Industrial Power Distribution Panels",
      "Lightning Protection & Heavy Earthing Systems",
      "DG Sets and Power Backup Synchronizations"
    ],
    benefits: "Ensures maximum power reliability, certified compliance with CEA guidelines, energy-efficient routing designs, and highly durable installations for extreme environments."
  },
  {
    id: "civil-construction",
    title: "Civil Construction",
    description: "Robust structural concrete works, foundation designs, excavation works, administrative/site offices, and specialized heavy engineering support structures.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    iconName: "Building",
    features: [
      "Heavy Concrete Foundations for Machinery & Towers",
      "Excavation and Earth Retaining Structures",
      "Site Offices, Staff Accommodations, and Fabrication Yards",
      "Road Construction and Drainage Systems",
      "Steel Truss Fabrications and Industrial Sheds"
    ],
    benefits: "High-grade civil concrete compliance, quick mobilization with extensive tools and machinery, strict safety protocols, and resilient engineering built for multi-decade life."
  },
  {
    id: "tunnel-electrification",
    title: "Tunnel Electrification",
    description: "State-of-the-art specialized tunnel electrical systems comprising linear lighting, emergency power, heavy cabling, backup generation, and robust earthing.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    iconName: "Lightbulb",
    features: [
      "Tunnel Internal & External Electrification",
      "LED Linear Lighting and Emergency Escape Signs",
      "Dual Redundant Power Feeds with HT/LT cabling",
      "Heavy Duty Cable Trays with Fire-Retardant support",
      "Comprehensive Sub-surface Grounding Grids"
    ],
    benefits: "Engineered to withstand high humidity, tunnel dust, and thermal expansion; minimizes voltage drops over long distances, and meets strict life safety standards."
  },
  {
    id: "tunnel-ventilation-hvac",
    title: "Tunnel Ventilation & HVAC",
    description: "High-capacity ventilation systems including heavy jet fans, industrial air conditioning, ducting, and dynamic air flow control for toxic gas clearance.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    iconName: "Wind",
    features: [
      "75KW and Heavy Industrial Jet Fan Installations",
      "Daikin VRV X and Centralized HVAC Systems",
      "Galvanized Steel Ventilation Ducting Works",
      "Acoustic Silencer Integrations for Noise Mitigation",
      "Control Dampers and Ambient Air Monitoring Ports"
    ],
    benefits: "Ensures clear vision, immediate removal of vehicular fumes/toxic gases, stable temperature regulation, and fully automated multi-speed flow ventilation control."
  },
  {
    id: "fire-fighting",
    title: "Fire Fighting & Suppression",
    description: "Advanced fire defense systems incorporating heavy-duty mist systems, hydrants, sprinkler networks, industrial pumps, and automated alarm systems.",

    imageUrl: "https://media.istockphoto.com/id/1704998149/photo/firefighters-battling-a-roaring-fire.jpg?s=612x612&w=0&k=20&c=ElvG8iJuIEYb8LgOk-ncnJ-h7yDDsfQIPxwt_zOIVTc=",

    iconName: "ShieldAlert",
    features: [
      "High-pressure Fire Fighting Mist Systems",
      "Wet Riser and External Hydrant Pipe Networks",
      "Industrial Sprinklers and Fire Pump Rooms",
      "Integrated Flame & Smoke Detection Alarms",
      "Suppression Cylinders & Fire Door Audits"
    ],
    benefits: "Rapid fire suppression, certified structural fire compliance, completely automatic line pressure sensors, and extreme system reliability in critical zones like road tunnels."
  },
  {
    id: "elv-systems",
    title: "ELV & Communication Systems",
    description: "Extra-low voltage integrations including fiber optic rings, CCTV monitoring, access controls, PA systems, SCADA, and automated control logic.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    iconName: "Cpu",
    features: [
      "Public Address (PA) and Emergency Call Box Systems",
      "HD IP-CCTV Surveillance with Fiber Backbones",
      "SCADA Panels and Integration for Central Control Rooms",
      "Automatic Toll Plaza ELV Systems & Boom Barriers",
      "Network Racks, UPS Power and Fiber Optic Splicing"
    ],
    benefits: "Unified real-time site visibility, high speed telemetry transmission over long fiber spans, robust safety warnings, and complete digital coordination of plant infrastructure."
  },
  {
    id: "industrial-electrification",
    title: "Industrial Electrification",
    description: "Custom power packages for large manufacturing plants, workshops, toll plazas, and high-load public works requiring specialized custom panels.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    iconName: "HardHat",
    features: [
      "PCC & MCC Panel Board Designs and Assembly",
      "High Load Transformers (up to 1000KVA) & Switchyards",
      "Busbar Trunking Systems (Sandwich / Air Insulated)",
      "Capacitor Banks for Power Factor Corrections",
      "Erection and Load Testing of Heavy Machinery Supplies"
    ],
    benefits: "Improves electrical efficiency, reduces power billing penalties, provides premium equipment protection, and supports heavy fluctuating startup currents of large industrial motors."
  },
  {
    id: "operations-maintenance",
    title: "Operation & Maintenance (O&M)",
    description: "Round-the-clock technical operations, preventive checkups, calibration tests, and immediate emergency repairs to keep national assets running non-stop.",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
    iconName: "Settings",
    features: [
      "24/7 Breakdown Troubleshooting and Repairs",
      "Thermography and Earth Resistance Periodic Testing",
      "Transformer Oil Filtration & Megger Insulation Audits",
      "HVAC Filters & Fan Motor Lubrication Programs",
      "Detailed Log Maintenance & Compliance Record-keeping"
    ],
    benefits: "Extends equipment service life, eliminates expensive unscheduled shut-downs, guarantees immediate emergency assistance, and maintains detailed history of electrical logs."
  }
];

export const ROAD_TUNNELS_EXPERIENCE: TunnelExperience[] = [
  { sNo: 1, name: "DRDO TUNNEL PROJECT- PAONTA", length: "2.5 KMS", location: "HIMACHAL PRADESH" },
  { sNo: 2, name: "DRDO TUNNEL PROJECT – DEOGHAR", length: "2.5 KMS", location: "JHARKHAND" },
  { sNo: 3, name: "MISSING LINK TUNNEL PROJECT- LONAVALA", length: "10.25 KMS (T1 & T2) TWO TUBES", location: "MAHARASHTRA" },
  { sNo: 4, name: "NMSCEW PKG-14 TUNNEL PROJECT TARANGANPADA", length: "8 KMS TWO TUBES", location: "THANE, M.H." },
  { sNo: 5, name: "NMSCEW PKG-15 TUNNEL PROJECT KASARA", length: "1.337 KMS (T1 & T2) (T1 -318MTR & T2 -1019 MTR)", location: "THANE, MAHARASHTRA" },
  { sNo: 6, name: "NMSCEW PKG-16 TUNNEL PROJECT SHAHPUR", length: "1.423 KMS (T1 & T2) (T1 -928MTR & T2 495 MTR)", location: "THANE, MAHARASHTRA" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-silkyara",
    sNo: 1,
    name: "PROVIDING INTERNAL & EXTERNAL POWER SUPPLY SYSTEM FOR SILKYARA BEND TO BARKOT TUNNEL PROJECT",
    client: "NAVAYUGA ENGINEERING CO. LTD.",
    location: "UTTARAKHAND SITE (SILKYARA BEND)",
    status: "Ongoing",
    contractValue: "Rs. 14.42 Crores",
    rawAmount: 144297042.80,
    dateOfStart: "05.10.2018",
    dateOfCompletion: "04.10.2022",
    description: "Comprehensive installation of external and internal high voltage power lines, substations, and distribution cabling for the highly critical Silkyara-Barkot road tunnel project under extreme Himalayan geology.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-missinglink-power",
    sNo: 2,
    name: "PROVIDING INTERNAL & EXTERNAL POWER SUPPLY FOR MISSINGLINK PROJECT TUNNEL - MUMBAI PUNE EXPRESSWAY",
    client: "NAVAYUGA ENGINEERING CO. LTD.",
    location: "MUMBAI PUNE EXPRESSWAY, MAHARASHTRA",
    status: "Ongoing",
    contractValue: "Rs. 46.17 Crores",
    rawAmount: 461740031.00,
    dateOfStart: "09.11.2021",
    dateOfCompletion: "08.11.2024",
    description: "Heavy electrical substation setups, transmission cable laying, and external hookups for the mega Missing Link Tunnel Project connecting Khopoli to Kusgaon to bypass the steep ghat section.",
    imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-missinglink-lighting",
    sNo: 3,
    name: "SUPPLY, INSTALLATION, TESTING AND COMMISSIONING OF TUNNEL INTERNAL ELECTRIFICATION FOR MISSINGLINK PROJECT TUNNEL",
    client: "RYB POWER CONTROLS PVT LTD",
    location: "MUMBAI PUNE EXPRESSWAY, MAHARASHTRA",
    status: "Ongoing",
    contractValue: "Rs. 23.69 Crores",
    rawAmount: 236975365.00,
    dateOfStart: "21/08/2020",
    dateOfCompletion: "20/08/2024",
    description: "Internal tunnel linear LED lighting grids, distribution boxes, backup UPS setups, and heavy conduits along the multi-tube tunnel project.",
    imageUrl: "https://images.unsplash.com/photo-1517089596392-db9a5e9478cc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-missinglink-ventilation",
    sNo: 4,
    name: "PROVISION OF TUNNEL VENTILATION SYSTEM FOR MISSINGLINK PROJECT TUNNEL",
    client: "INOVIC POWER SOLUTIONS PVT. LTD.",
    location: "MUMBAI PUNE EXPRESSWAY, MAHARASHTRA",
    status: "Ongoing",
    contractValue: "Rs. 23.42 Crores",
    rawAmount: 234270229.00,
    dateOfStart: "19/08/2020",
    dateOfCompletion: "18/08/2024",
    description: "Installation, integration, and load testing of heavy jet fans, electrical power panels, and dynamic carbon monoxide/smoke sensor networks for clean air flow.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-nmscew-pkg15",
    sNo: 5,
    name: "SUPPLY, INSTALLATION & COMMISSIONING OF EXTERNAL & INTERNAL ELECTRIFICATION, EARTHING, TUNNEL LIGHTING, VENTILATION & FIRE HYDRANT SYSTEM WORKS IN TUNNEL AT NMSCEW PACKAGE-15",
    client: "NAVAYUGA ENGINEERING CO. LTD.",
    location: "KASARA, THANE, MAHARASHTRA",
    status: "Ongoing",
    contractValue: "Rs. 20.18 Crores",
    rawAmount: 201833679.00,
    dateOfStart: "22.10.2021",
    dateOfCompletion: "21.10.2022",
    description: "Integrated electrical, grounding, linear lighting, fire hydrant lines, and emergency ventilation work inside the 1.337 KM twins-tube tunnel of Nagpur Mumbai Super Communication Expressway (NMSCEW).",
    imageUrl: "https://images.unsplash.com/photo-1568283096533-078a24930eb8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-nmscew-pkg16",
    sNo: 6,
    name: "SUPPLY, INSTALLATION & COMMISSIONING OF EXTERNAL & INTERNAL ELECTRIFICATION, EARTHING, TUNNEL LIGHTING, VENTILATION & FIRE HYDRANT SYSTEM WORKS IN TUNNEL AT NMSCEW PACKAGE-16",
    client: "NAVAYUGA ENGINEERING CO. LTD.",
    location: "SHAHPUR, THANE, MAHARASHTRA",
    status: "Ongoing",
    contractValue: "Rs. 21.61 Crores",
    rawAmount: 216112616.00,
    dateOfStart: "20.12.2021",
    dateOfCompletion: "19.12.2022",
    description: "Complete tunnel engineering setups including electrical cabling, safety escape indicators, high capacity pumps, and dry/wet fire riser pipes in Package 16 tunnel.",
    imageUrl: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-nmscew-jetfans",
    sNo: 7,
    name: "ERECTION, TESTING & COMMISSIONING OF 75KW JET FANS AT NMSCEW PKG-14",
    client: "WITT INDIA PVT LTD",
    location: "TARANGANPADA, THANE, MAHARASHTRA",
    status: "Completed",
    contractValue: "Rs. 49.56 Lakhs",
    rawAmount: 4956000.00,
    dateOfStart: "15.03.2022",
    dateOfCompletion: "14.12.2022",
    description: "Precise mounting, structural cabling, dynamic balancing, and commissioning of heavy 75KW jet fans supplied by Witt India for high capacity tunnel ventilation.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-beaver-drawings",
    sNo: 8,
    name: "PREPARATION OF DRAWINGS & DOCUMENTATION FOR TUNNEL LIGHTING, EXTERNAL & INTERNAL POWER SUPPLY, FIRE FIGHTING MIST SYSTEM, TUNNEL VENTILATION SYSTEM",
    client: "BEAVER INFRA CONSULTANTS PVT. LTD.",
    location: "NAVI MUMBAI, MAHARASHTRA",
    status: "Completed",
    contractValue: "Rs. 82.60 Lakhs",
    rawAmount: 8260000.00,
    dateOfStart: "15.12.2021",
    dateOfCompletion: "30.07.2022",
    description: "Detailed engineering drawings, load schedules, fire safety modeling, and single-line system maps submitted for government approval guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-khalapur-toll",
    sNo: 9,
    name: "SUPPLY, INSTALLATION, TESTING & COMMISSIONING OF ELECTRICAL AND ELV WORKS AT KHALAPUR TOLL PLAZA",
    client: "SAI GOVIND INFRA DEVELOPERS PRIVATE LIMITED",
    location: "KHALAPUR TOLL PLAZA, MAHARASHTRA",
    status: "Completed",
    contractValue: "Rs. 13.72 Crores",
    rawAmount: 137252318.00,
    dateOfStart: "15.11.2022",
    dateOfCompletion: "15.07.2023",
    description: "Complete electrification of the busy Khalapur toll plaza, including intelligent boom gates, high-mast tower lights, DG backup panels, and camera server networking.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-talegaon-toll",
    sNo: 10,
    name: "SUPPLY, INSTALLATION, TESTING & COMMISSIONING OF ELECTRICAL AND ELV WORKS AT TALEGAON TOLL PLAZA",
    client: "SAI GOVIND INFRA DEVELOPERS PRIVATE LIMITED",
    location: "TALEGAON TOLL PLAZA, MAHARASHTRA",
    status: "Completed",
    contractValue: "Rs. 12.81 Crores",
    rawAmount: 128166294.00,
    dateOfStart: "15.11.2022",
    dateOfCompletion: "15.07.2023",
    description: "Detailed lane wiring, power cabins, fiber connectivity backbones, and smart electronic security panels at Talegaon toll plaza.",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-zambales-intl",
    sNo: 11,
    name: "CONSTRUCTION OF TECHNICAL FACILITIES TP-1",
    client: "TOTOWAO DEVELOPMENT CORPORATION",
    location: "ZAMBALES, PHILIPPINES",
    status: "International",
    contractValue: "Rs. 68.36 Crores",
    rawAmount: 683689574.40,
    dateOfStart: "18.10.2023",
    dateOfCompletion: "18.10.2024",
    description: "International contract executing technical storage and mechanical power infrastructure for high security technical facilities in Zambales.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-brahmos-intl",
    sNo: 12,
    name: "CONSTRUCTION OF TECHNICAL FACILITIES TP-2",
    client: "M/s. BRAHMOS AEROSPACE PRIVATE LIMITED",
    location: "PHILIPPINES (EXPORT PROJECT)",
    status: "International",
    contractValue: "Rs. 197.00 Crores",
    rawAmount: 1970000000.00,
    dateOfStart: "10.01.2026",
    dateOfCompletion: "10.01.2027",
    description: "Specialized defense-related electrical and shelter structures built in the Philippines under high security supervision and extreme engineering standards.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-silkyara-office",
    sNo: 13,
    name: "CONSTRUCTION OF SITE OFFICE, STAFF ACCOMMODATION, STORES, FABRICATION YARD AND PROVISION OF 1000KVA TRANSFORMER FOR CONSTRUCTION POWER SUPPLY FOR BARKOT-SILKYARA BEND ROAD TUNNEL",
    client: "KNVUPS PVT. LTD.",
    location: "UTTARAKHAND SITE",
    status: "Completed",
    contractValue: "Rs. 3.58 Crores",
    rawAmount: 35818600.00,
    dateOfStart: "06.04.2019",
    dateOfCompletion: "26.03.2019",
    description: "Civil execution of modular pre-fab structures, layout yards, machinery testing blocks, and setting up a high capacity 1000KVA substation transformer for site launch operations.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-rambilli-sub",
    sNo: 14,
    name: "SUPPLY AND INSTALLATION OF EXTERNAL POWER SUPPLY SYSTEM AT RAMBILLI SITE",
    client: "NAVAYUGA ENGINEERING CO. LTD.",
    location: "VARSHA PROJECT, RAMBILLI, VISAKHAPATNAM",
    status: "Completed",
    contractValue: "Rs. 2.23 Crores",
    rawAmount: 22368863.00,
    dateOfStart: "01.04.2018",
    dateOfCompletion: "25.02.2019",
    description: "Heavy external high voltage transmission pylons, overhead line erections, and double pole substation setups for navy-related infrastructure project.",
    imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800"
  }
];

export const FINANCIAL_GROWTH: FinancialGrowth[] = [
  { year: "2017-18", revenue: "Rs. 15.28 Cr", rawAmount: 152835781 },
  { year: "2018-19", revenue: "Rs. 15.43 Cr", rawAmount: 154331743 },
  { year: "2019-20", revenue: "Rs. 19.66 Cr", rawAmount: 196697272 },
  { year: "2020-21", revenue: "Rs. 19.96 Cr", rawAmount: 199632905 },
  { year: "2021-22", revenue: "Rs. 20.94 Cr", rawAmount: 209431715 },
  { year: "2022-23", revenue: "Rs. 31.79 Cr", rawAmount: 317972977 },
  { year: "2023-24", revenue: "Rs. 42.09 Cr", rawAmount: 420905195 },
  { year: "2024-25", revenue: "Rs. 55.89 Cr", rawAmount: 558952105 },
  { year: "2025-26", revenue: "Rs. 77.35 Cr", rawAmount: 773559652 }
];

export const MANPOWER_STRENGTH: Manpower[] = [
  { sNo: 1, role: "Project Engineers (Electrical & Civil)", count: 14 },
  { sNo: 2, role: "Trained Supervisors", count: 25 },
  { sNo: 3, role: "Skilled Technicians & Wiremen", count: 35 },
  { sNo: 4, role: "Semi-Skilled Technicians & Cable Jointer teams", count: 33 },
  { sNo: 5, role: "Stores, Materials & Accounts Staff (Computerized ERP)", count: 10 }
];

export const LICENSES: License[] = [
  { sNo: 1, name: "Electrical Contractor Class 'A' License", number: "A T2-2556 / T-7003", expiry: "23.01.2027" },
  { sNo: 2, name: "Andhra Pradesh GST Registration", number: "37ANKPK6462D1ZV", expiry: "Permanent" },
  { sNo: 3, name: "Telangana GST Registration", number: "36ANKPK6462D1ZX", expiry: "Permanent" },
  { sNo: 4, name: "Maharashtra GST Registration", number: "27ANKPK6462D1ZW", expiry: "Permanent" },
  { sNo: 5, name: "Uttarakhand GST Registration", number: "05ANKPK6462D1Z2", expiry: "Permanent" },
  { sNo: 6, name: "Employee State Insurance (ESIC) Registration", number: "52000454950000905", expiry: "Permanent" },
  { sNo: 7, name: "Employees Provident Fund (EPF) Registration", number: "APHYD0081569000", expiry: "Permanent" }
];

export const MEASURING_EQUIPMENTS: Equipment[] = [
  { sNo: 1, name: "Meggar Insulation Tester", make: "Meco", capacity: "5000V/1000 Mohms", qty: "4 Nos", calibrationAge: "1 Year" },
  { sNo: 2, name: "Mastech 266 Clamp Meter", make: "Mastech", capacity: "500 Volts", qty: "6 Nos", calibrationAge: "1 Year" },
  { sNo: 3, name: "Digital Capacitance Meter", make: "Testronix", capacity: "Full Range", qty: "3 Nos", calibrationAge: "1 Year" },
  { sNo: 4, name: "Clamp Meter 266", make: "Yenkey", capacity: "500 Volts", qty: "3 Nos", calibrationAge: "1 Year" },
  { sNo: 5, name: "Phase Sequence Meter", make: "M. E.", capacity: "500 Volts", qty: "3 Nos", calibrationAge: "1 Year" },
  { sNo: 6, name: "Digital Thermo Meter", make: "MT Metravo", capacity: "-20ºC to +270ºC", qty: "4 Nos", calibrationAge: "1 Year" },
  { sNo: 7, name: "Precision Multimeter", make: "Rishabh", capacity: "Multi Range", qty: "4 Nos", calibrationAge: "1 Year" },
  { sNo: 8, name: "Millimeter Calibrator", make: "Fluke", capacity: "Process Loop", qty: "4 Nos", calibrationAge: "1 Year" },
  { sNo: 9, name: "Earth Resistance Tester", make: "Omegha", capacity: "0 to 10 Ohms", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 10, name: "Earth Tester", make: "Shanti", capacity: "0 to 100 Ohms", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 11, name: "Digital Tong Tester", make: "Meco", capacity: "Multi Range", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 12, name: "Standard Megger", make: "Shanti", capacity: "1000V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 13, name: "Heavy Duty Megger", make: "Motwane", capacity: "1000V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 14, name: "Substation Megger", make: "Shanti", capacity: "5000V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 15, name: "Analog Megger Insulation", make: "Shanti", capacity: "1000V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 16, name: "Primary Current Injection Kit", make: "A.E. Ltd.", capacity: "0-200A, 250A-230V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 17, name: "Secondary Current Injection Kit", make: "A.E. Ltd.", capacity: "50A – 230V", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 18, name: "High Volt Test Set for Power Cables", make: "Starlite", capacity: "0 – 75 KV (Variable)", qty: "1 No", calibrationAge: "1 Year" },
  { sNo: 19, name: "Digital Earth Ground Tester", make: "Motwane", capacity: "Multi Ohms", qty: "2 Nos", calibrationAge: "1 Year" },
  { sNo: 20, name: "High Voltage AC Tester", make: "Starlite", capacity: "75KV", qty: "1 No", calibrationAge: "1 Year" },
  { sNo: 21, name: "Rectifier Unit VE 10/26", make: "Custom", capacity: "60-70K", qty: "2 Nos", calibrationAge: "1 Year" }
];

export const TOOLS_AND_PLANTS: Equipment[] = [
  { sNo: 1, name: "Total Station (Surveys)", qty: "3 Nos", calibrationAge: "1 Year" },
  { sNo: 2, name: "Concrete Mixers of Full Bag Capacity", qty: "6 Nos", calibrationAge: "Permanent" },
  { sNo: 3, name: "Steel Shuttering Plates", qty: "16,000 Sqm", calibrationAge: "Permanent" },
  { sNo: 4, name: "Steel Props & Supporting Jacks", qty: "32,000 Cum Space", calibrationAge: "Permanent" },
  { sNo: 5, name: "Industrial Mortar Mixers", qty: "4 Nos", calibrationAge: "Permanent" },
  { sNo: 6, name: "Needle Vibrators (Concrete)", qty: "22 Nos", calibrationAge: "Permanent" },
  { sNo: 7, name: "Beam Vibrators (Slabs)", qty: "6 Nos", calibrationAge: "Permanent" },
  { sNo: 8, name: "Slab Vibrators", qty: "6 Nos", calibrationAge: "Permanent" },
  { sNo: 9, name: "Shuttering Vibrators", qty: "4 Nos", calibrationAge: "Permanent" },
  { sNo: 10, name: "Vibro Compactor (Soil/Gravel)", qty: "3 Nos", calibrationAge: "Permanent" },
  { sNo: 11, name: "Batching Plant with Concrete Pump (6 Cum Cap)", qty: "3 Nos", calibrationAge: "Permanent" },
  { sNo: 12, name: "Hydraulic Crimping Tools", make: "S.G.", capacity: "Upto 1000 sq.mm", qty: "3 Nos", calibrationAge: "5 Years" },
  { sNo: 13, name: "Hand Crimping Tools Heavy", make: "S.G.", capacity: "Upto 400 sq.mm", qty: "4 Nos", calibrationAge: "5 Years" },
  { sNo: 14, name: "Medium Hand Crimping Tools", make: "S.G.", capacity: "Upto 185 sq.mm", qty: "6 Nos", calibrationAge: "5 Years" },
  { sNo: 15, name: "Small Hand Crimping Tools", capacity: "Upto 95 sq.mm", qty: "3 Nos", calibrationAge: "5 Years" },
  { sNo: 16, name: "Drill Machine with Motor Heavy", make: "BPR", qty: "3 Nos", calibrationAge: "6 Months" },
  { sNo: 17, name: "Drill Machine PSB-400", make: "Bosch", capacity: "10 mm", qty: "8 Nos", calibrationAge: "6 Months" },
  { sNo: 18, name: "Heavy SDS Max Drill Machine", make: "Bosch", capacity: "30 mm", qty: "6 Nos", calibrationAge: "6 Months" },
  { sNo: 19, name: "Drill Machine GBH-2-24", make: "Bosch", capacity: "24 mm", qty: "8 Nos", calibrationAge: "6 Months" },
  { sNo: 20, name: "Industrial Welding Machine", make: "Apolo", qty: "6 Nos", calibrationAge: "1 Year" },
  { sNo: 21, name: "Oxy-Acetylene Gas Cutting Set", make: "Ascko", qty: "4 Sets", calibrationAge: "1 Year" },
  { sNo: 22, name: "Gas Cutting Set Portable", make: "Kaakar", qty: "2 Sets", calibrationAge: "1 Year" },
  { sNo: 23, name: "Heavy Duty Cable Jack & Shaft", make: "Hytack", qty: "3 Sets", calibrationAge: "5 Years" },
  { sNo: 24, name: "Battery Operated Cordless Drill Machine", qty: "8 Nos", calibrationAge: "6 Months" },
  { sNo: 25, name: "14\" Metal Cut-off Wheel Machine", make: "Dewalt", qty: "8 Nos", calibrationAge: "6 Months" },
  { sNo: 26, name: "Angle Grinder 100mm", make: "Bosch", qty: "4 Nos", calibrationAge: "6 Months" },
  { sNo: 27, name: "Pneumatic Drill Machine DH 24 PG", qty: "2 Nos", calibrationAge: "6 Months" }
];
