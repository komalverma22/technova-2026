// ─────────────────────────────────────────────────────────────────────────────
// EVENT COORDINATORS MAPPING
// ─────────────────────────────────────────────────────────────────────────────

export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface EventCoordinatorInfo {
  department: string;
  studentCoordinator?: EventCoordinator;
  studentCoCoordinator?: EventCoordinator;
}

// Map event titles to their coordinators
const eventCoordinatorsMap: Record<string, EventCoordinatorInfo> = {
  // ── SAVERA ─────────────────────────────────────────────────────────────────
  "Innovation Odyssey Challenge": {
    department: "SAVERA",
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },
  "Tech Titans Trivia": {
    department: "SAVERA",
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },

  // ── SEE (EED) ─────────────────────────────────────────────────────────────
  "Tech Charades": {
    department: "SEE (EED)",
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Tech Bid": {
    department: "SEE (EED)",
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Machine Mantra": {
    department: "SEE (EED)",
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },

  // ── MANTHAN (CHE) chemical ─────────────────────────────────────────────────────────
  "Knowledge Knockout Quiz (Mind Clash)": {
    department: "MANTHAN (CHE)",
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },
  "Get Recognised for Your Personality (GRYP)": {
    department: "MANTHAN (CHE)",
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },
  "Chem Spark": {
    department: "MANTHAN (CHE)",
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },

  // ── YOUNG THESPIANS (DMS) ─────────────────────────────────────────────────
  "Team Titans": {
    department: "YOUNG THESPIANS (DMS)",
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },
  "Brand Storm": {
    department: "YOUNG THESPIANS (DMS)",
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },
  
  "Business Hunt": {
    department: "YOUNG THESPIANS (DMS)",
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },

  // ── ROBOTICS (THINKBOTS) ─────────────────────────────────────────────────
  "Walking-Dead": {
    department: "ROBOTICS(THINKBOTS)",
    studentCoordinator: { name: "Sahil Kumar", phone: "8168560627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },
  "Dungeon-Drive": {
    department: "ROBOTICS(THINKBOTS)",
    studentCoordinator: { name: "Sahil Kumar", phone: "8168560627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },

  // ── E-Cell ─────────────────────────────────────────────────────────────────
  "Mix-Matched": {
    department: "E-Cell",
    studentCoordinator: { name: "ARYAN DEHIMIWAL", phone: "9728762899" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },
  "The Corporate Clash": {
    department: "E-Cell",
    studentCoordinator: { name: "ARYAN DEHIMIWAL", phone: "9728762899" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },

  // ── LISOC-Literary Society ─────────────────────────────────────────────────
  "Student of the Year": {
    department: "LISOC-Literary Society",
    studentCoordinator:  { name: "Rohan Kumar Rai", phone: "9310377806" },
    studentCoCoordinator: { name: "Neel Kamal", phone: "8447949250" },
  },
  "BPD (British Parliamentary Debate)": {
    department: "LISOC-Literary Society",
    studentCoordinator:  { name: "Rohan Kumar Rai", phone: "9310377806" },
    studentCoCoordinator: { name: "Neel Kamal", phone: "8447949250" },
  },

  // ── SUNSHINE ──────────────────────────────────────────────────────────────
  "Gaming Event": {
    department: "SUNSHINE",
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7015081345" },
    studentCoCoordinator: { name: "Agastya", phone: "8708411706" },
  },
  "Treasure Hunt": {
    department: "SUNSHINE",
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7015081345" },
    studentCoCoordinator: { name: "Agastya", phone: "8708411706" },
  },

  // ── CSE Department ────────────────────────────────────────────────────────
  "Web Master": {
    department: "CSE Department",
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },
  "Techno Quiz": {
    department: "CSE Department",
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },
  "Think Future": {
    department: "CSE Department",
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },

  // ── CEEES ─────────────────────────────────────────────────────────────────
  "Idea-Thon": {
    department: "CEEES",
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },
  "Agri-Technictionary": {
    department: "CEEES",
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },
  "Seed Sorting Race": {
    department: "CEEES",
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },

  // ── MATHEMAGICIANS (Mathematics) ───────────────────────────────────────────
  "Poster Making": {
    department: "MATHEMAGICIANS (Mathematics)",
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },
  "Debate": {
    department: "MATHEMAGICIANS (Mathematics)",
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },
  "Quiz": {
    department: "MATHEMAGICIANS (Mathematics)",
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },

  // ── ENGENISIS (BT) ────────────────────────────────────────────────────────
  "Brainy Brawl": {
    department: "ENGENISIS (BT)",
    studentCoordinator: { name: "Ayushi Singh", phone: "7827216646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062592" },
  },
  "Brain Quest Arena": {
    department: "ENGENISIS (BT)",
    studentCoordinator: { name: "Ayushi Singh", phone: "7827216646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062592" },
  },

  // ── MEDITRONICA (BME) ─────────────────────────────────────────────────────
  "Poster Making Competition": {
    department: "MEDITRONICA (BME)",
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },
  "Biomedical Tech Quiz": {
    department: "MEDITRONICA (BME)",
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },
  "Biomedical Debate Competition": {
    department: "MEDITRONICA (BME)",
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },

  // ── RASAYANAM (Chemistry) ─────────────────────────────────────────────────
  "Science Quiz": {
    department: "RASAYANAM (Chemistry)",
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "Magic of Chemistry": {
    department: "RASAYANAM (Chemistry)",
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "The Alchemist's Cipher": {
    department: "RASAYANAM (Chemistry)",
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },

  // ── NIRMAN (CIVIL) ─────────────────────────────────────────────────────────
  "Chakravyuh": {
    department: "NIRMAN (CIVIL)",
    studentCoordinator: { name: "Yashika", phone: "8700162084" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },
  "Bridge it Right": {
    department: "NIRMAN (CIVIL)",
    studentCoordinator:{ name: "Yashika", phone: "8700162084" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },
  "Think & Sprint": {
    department: "NIRMAN (CIVIL)",
    studentCoordinator: { name: "YASHIKA", phone: "8700162084" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },

  // ── Mechanical Engineering (SoMEC) ────────────────────────────────────────
  "Design Minds": {
    department: "Mechanical Engineering",
    studentCoordinator: { name: "Yuvraj Rai", phone: "9369495654" },
    studentCoCoordinator: { name: "Dhanjeet Kumar Yadav", phone: "7007430796" },
  },
  "Aero Modeling (Sky Glider)": {
    department: "Mechanical Engineering",
    studentCoordinator: { name: "Yuvraj Rai", phone: "9369495654" },
    studentCoCoordinator: { name: "Dhanjeet Kumar Yadav", phone: "7007430796" },
  },

  // ── RAMAN (Physics) ───────────────────────────────────────────────────────
  "Physi-Hunt": {
    department: "RAMAN (Physics)",
    studentCoordinator: { name: "Dr Ashok Kumar", phone: "7056273692" },
  },
  "The Escape Room": {
    department: "RAMAN (Physics)",
    studentCoordinator: { name: "Dr Ashima", phone: "7988164698" },
  },
  "Inno Vision": {
    department: "RAMAN (Physics)",
    studentCoordinator: { name: "Dr Ravinder Kumar", phone: "" },
  },

  // ── ECED Department ───────────────────────────────────────────────────────
  "Circuit Design and Debugging Competition": {
    department: "ECED",
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },
  "Roastverse": {
    department: "ECED",
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },
  "Prompt2Poster": {
    department: "ECED",
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },

  // ── DCRUST ODC ─────────────────────────────────────────────────────────────
  "CodeBug": {
    department: "DCRUST ODC",
    studentCoordinator: { name: "Laxmi", phone: "9350079206" },
    studentCoCoordinator: { name: "Abhishek", phone: "9350069551" },
  },
  "SQL Master": {
    department: "DCRUST ODC",
    studentCoordinator: { name: "Laxmi", phone: "9350079206" },
    studentCoCoordinator: { name: "Abhishek", phone: "9350069551" },
  },
};

export function getEventCoordinators(
  eventTitle: string
): EventCoordinatorInfo | null {
  return eventCoordinatorsMap[eventTitle] ?? null;
}