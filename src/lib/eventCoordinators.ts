// ─────────────────────────────────────────────────────────────────────────────
// EVENT COORDINATORS MAPPING
// ─────────────────────────────────────────────────────────────────────────────

export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface EventCoordinatorInfo {
  department: string;
  coordinators: EventCoordinator[];
  studentCoordinator?: EventCoordinator;
  studentCoCoordinator?: EventCoordinator;
}

// Map event titles to their coordinators
const eventCoordinatorsMap: Record<string, EventCoordinatorInfo> = {
  // ── NAVRA School of Management ──────────────────────────────────────────────
  "Innovation Odyssey Challenge": {
    department: "NAVRA School of Management",
    coordinators: [
      { name: "Rishit (Coordinator)", phone: "98190 98697" },
      { name: "Himanshu", phone: "9143588007" },
      { name: "Bhoomi", phone: "9817413591" },
    ],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },
  "Cyber Canvas": {
    department: "NAVRA School of Management",
    coordinators: [
      { name: "Harsh Kr (Coordinator)", phone: "98114 13309" },
      { name: "Anjali Mishra", phone: "7701 991 302" },
      { name: "Ankit Jangra", phone: "85699 57020" },
    ],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },
  "Trail of Organisers": {
    department: "NAVRA School of Management",
    coordinators: [{ name: "Nandini", phone: "7988439289" }],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },
  "TechTitans Trivia": {
    department: "NAVRA School of Management",
    coordinators: [],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },

  // ── Chemical Engineering ─────────────────────────────────────────────────────
  "Knowledge Knockout Quiz (MIND CLASH)": {
    department: "Chemical Engineering",
    coordinators: [
      { name: "Surbhi", phone: "8708408833" },
      { name: "Rajni", phone: "8059332247" },
      { name: "Partik Singh", phone: "9350203487" },
    ],
    studentCoordinator: { name: "Narshi", phone: "8166969968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416269" },
  },
  "GRYP (Get Recognised for Your Personality)": {
    department: "Chemical Engineering",
    coordinators: [
      { name: "Khushi Rao", phone: "9416171139" },
      { name: "Pawan Kumar", phone: "8178477961" },
      { name: "Disha", phone: "7015473578" },
    ],
    studentCoordinator: { name: "Narshi", phone: "8166969968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416269" },
  },
  "CHEMSPARK": {
    department: "Chemical Engineering",
    coordinators: [
      { name: "Bharti Devi", phone: "9817652238" },
      { name: "Bhoomi", phone: "8168573726" },
      { name: "Aayush Mishra", phone: "9334805855" },
    ],
    studentCoordinator: { name: "Narshi", phone: "8166969968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416269" },
  },

  // ── Management Studies ───────────────────────────────────────────────────────
  "Team Titans": {
    department: "Management Studies",
    coordinators: [
      { name: "Hemant", phone: "9992551171" },
      { name: "Purvi", phone: "7988909541" },
      { name: "Sarika", phone: "9992560565" },
    ],
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },
  "Brand Storm": {
    department: "Management Studies",
    coordinators: [
      { name: "Apsara", phone: "8816950480" },
      { name: "Anjali", phone: "8688525081" },
      { name: "Jatin", phone: "9991224661" },
    ],
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },

  // ── ThinkBots Society ────────────────────────────────────────────────────────
  "Walking Dead": {
    department: "ThinkBots Society",
    coordinators: [
      { name: "Pritam", phone: "9812015241" },
      { name: "Sahil Kumar", phone: "8168606627" },
      { name: "Bhavana", phone: "8950293115" },
    ],
    studentCoordinator: { name: "Sahil Kumar", phone: "8168606627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },
  "Dungeon Drive": {
    department: "ThinkBots Society",
    coordinators: [
      { name: "Sahil Kumar", phone: "8168606627" },
      { name: "Harshit Gupta", phone: "8318457562" },
      { name: "Pritam", phone: "9812015241" },
    ],
    studentCoordinator: { name: "Sahil Kumar", phone: "8168606627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },

  // ── Excel DCRUSTM ────────────────────────────────────────────────────────────
  "Mis-Matched": {
    department: "Excel DCRUSTM",
    coordinators: [
      { name: "Akshat", phone: "989565691" },
      { name: "Amit Kumar", phone: "9345805135" },
      { name: "Harsh Sindal", phone: "2307273876" },
    ],
    studentCoordinator: { name: "Aryan Beniwal", phone: "9728762999" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },
  "Corporate Clash": {
    department: "Excel DCRUSTM",
    coordinators: [
      { name: "Garv", phone: "7082398051" },
      { name: "Lavisha Goyal", phone: "9253278847" },
      { name: "Sundich Chauhan", phone: "8510077880" },
    ],
    studentCoordinator: { name: "Aryan Beniwal", phone: "9728762999" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },

  // ── LISOC ────────────────────────────────────────────────────────────────────
  "STUDENT OF THE YEAR": {
    department: "LISOC",
    coordinators: [
      { name: "Nishant Kumar", phone: "8448044603" },
      { name: "Archit Kumar", phone: "9813655644" },
      { name: "Divya", phone: "8295148907" },
    ],
    studentCoordinator: { name: "Nishant Kumar", phone: "8448044603" },
    studentCoCoordinator: { name: "Rohit Raj", phone: "7404993212" },
  },
  "BPD (British Parliamentary Debate)": {
    department: "LISOC",
    coordinators: [
      { name: "Mohit", phone: "8168886901" },
      { name: "Rajat", phone: "7404993212" },
      { name: "Bhumika", phone: "9467598459" },
    ],
    studentCoordinator: { name: "Nishant Kumar", phone: "8448044603" },
    studentCoCoordinator: { name: "Rohit Raj", phone: "7404993212" },
  },

  // ── Sunshine Society ─────────────────────────────────────────────────────────
  "Gaming Event": {
    department: "Sunshine Society",
    coordinators: [
      { name: "Dronu Chahlia", phone: "9468199602" },
      { name: "Pushkar Narula", phone: "9896583405" },
      { name: "Sanjeev", phone: "7419179477" },
    ],
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7056894787" },
    studentCoCoordinator: { name: "Yashika", phone: "7051144068" },
  },
  "Treasure Hunt": {
    department: "Sunshine Society",
    coordinators: [
      { name: "Swati", phone: "7056894787" },
      { name: "Simran", phone: "8901087009" },
      { name: "Akshat", phone: "9350827383" },
    ],
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7056894787" },
    studentCoCoordinator: { name: "Yashika", phone: "7051144068" },
  },

  // ── Mechanical Engineering (SMEC) ────────────────────────────────────────────
  "Brain Minds": {
    department: "Mechanical Engineering (SMEC)",
    coordinators: [],
    studentCoordinator: { name: "Yuvraj", phone: "9469456654" },
    studentCoCoordinator: { name: "Danyesh Kumar", phone: "700740736" },
  },
  "Modeling": {
    department: "Mechanical Engineering (SMEC)",
    coordinators: [],
    studentCoordinator: { name: "Yuvraj", phone: "9469456654" },
    studentCoCoordinator: { name: "Danyesh Kumar", phone: "700740736" },
  },

  // ── Agriculture ──────────────────────────────────────────────────────────────
  "Idea-Thon": {
    department: "Agriculture",
    coordinators: [],
    studentCoordinator: { name: "Ankit Kumar", phone: "9815874080" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7014867807" },
  },
  "Agri-Tech": {
    department: "Agriculture",
    coordinators: [],
    studentCoordinator: { name: "Ankit Kumar", phone: "9815874080" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7014867807" },
  },
  "Seed-Sorting Race": {
    department: "Agriculture",
    coordinators: [],
    studentCoordinator: { name: "Ankit Kumar", phone: "9815874080" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7014867807" },
  },

  // ── Mathematics ──────────────────────────────────────────────────────────────
  "Poster Making": {
    department: "Mathematics",
    coordinators: [],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Pawar", phone: "8930519875" },
  },
  "Code Hunt": {
    department: "Mathematics",
    coordinators: [],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Pawar", phone: "8930519875" },
  },
  "Quiz": {
    department: "Mathematics",
    coordinators: [],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Pawar", phone: "8930519875" },
  },

  // ── Biotechnology ────────────────────────────────────────────────────────────
  "The Brainy Brawl": {
    department: "Biotechnology",
    coordinators: [],
    studentCoordinator: { name: "Ayushi Singh", phone: "7827166646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062537" },
  },
  "Brain Quest Arena": {
    department: "Biotechnology",
    coordinators: [],
    studentCoordinator: { name: "Ayushi Singh", phone: "7827166646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062537" },
  },

  // ── Biomedical (Medtronic) ───────────────────────────────────────────────────
  "Poster Making Competition": {
    department: "Biomedical (Medtronic)",
    coordinators: [],
    studentCoordinator: { name: "Ayan", phone: "7988235524" },
    studentCoCoordinator: { name: "Ankit", phone: "9355106062" },
  },
  "Tech Quiz": {
    department: "Biomedical (Medtronic)",
    coordinators: [],
    studentCoordinator: { name: "Ayan", phone: "7988235524" },
    studentCoCoordinator: { name: "Ankit", phone: "9355106062" },
  },
  "Biomedical Debate Competition": {
    department: "Biomedical (Medtronic)",
    coordinators: [],
    studentCoordinator: { name: "Ayan", phone: "7988235524" },
    studentCoCoordinator: { name: "Ankit", phone: "9355106062" },
  },

  // ── Electrical Engineering ───────────────────────────────────────────────────
  "Tech Charades": {
    department: "Electrical Engineering",
    coordinators: [],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Tech Bid": {
    department: "Electrical Engineering",
    coordinators: [],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Machine Mantra": {
    department: "Electrical Engineering",
    coordinators: [],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },

  // ── Chemistry Society ────────────────────────────────────────────────────────
  "Science Quiz": {
    department: "Chemistry Society",
    coordinators: [],
    studentCoordinator: { name: "Mahi", phone: "9350772741" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "Ninja Chemist": {
    department: "Chemistry Society",
    coordinators: [],
    studentCoordinator: { name: "Mahi", phone: "9350772741" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "The Alchemist's Cipher": {
    department: "Chemistry Society",
    coordinators: [],
    studentCoordinator: { name: "Mahi", phone: "9350772741" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },

  // ── Civil Engineering (Civitech 360) ─────────────────────────────────────────
  "Chakravyuh": {
    department: "Civil Engineering (Civitech 360)",
    coordinators: [],
    studentCoordinator: { name: "Harsh", phone: "8950173600" },
    studentCoCoordinator: { name: "Abhishek", phone: "9896768939" },
  },
  "Bridge It Right": {
    department: "Civil Engineering (Civitech 360)",
    coordinators: [],
    studentCoordinator: { name: "Harsh", phone: "8950173600" },
    studentCoCoordinator: { name: "Abhishek", phone: "9896768939" },
  },
  "Think & Build": {
    department: "Civil Engineering (Civitech 360)",
    coordinators: [],
    studentCoordinator: { name: "Harsh", phone: "8950173600" },
    studentCoCoordinator: { name: "Abhishek", phone: "9896768939" },
  },

  // ── Physics ──────────────────────────────────────────────────────────────────
  "PHYSI-HUNT": {
    department: "Physics",
    coordinators: [
      { name: "Bhawna", phone: "8307997135" },
      { name: "Payal", phone: "9350459793" },
    ],
    studentCoordinator: { name: "Dr Ashok Kumar", phone: "7056273692" },
  },
  "THE ESCAPE ROOM": {
    department: "Physics",
    coordinators: [
      { name: "Rinki", phone: "7027571268" },
      { name: "Madhu", phone: "7082835844" },
    ],
    studentCoordinator: { name: "Dr Ashima", phone: "7988164698" },
  },
  "INNO VISION": {
    department: "Physics",
    coordinators: [
      { name: "Aditi", phone: "8950043312" },
      { name: "Pooja", phone: "9671842499" },
    ],
    studentCoordinator: { name: "Dr Ravinder Kumar", phone: "" },
  },

  // ── DCRUSTDOC ────────────────────────────────────────────────────────────────
  "Codebug": {
    department: "DCRUSTDOC",
    coordinators: [],
    studentCoordinator: { name: "Laxmi", phone: "9350993206" },
    studentCoCoordinator: { name: "Abhishek", phone: "9350696511" },
  },
};

export function getEventCoordinators(eventTitle: string): EventCoordinatorInfo | null {
  return eventCoordinatorsMap[eventTitle] ?? null;
}