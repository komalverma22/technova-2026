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
  // ── SAVERA ─────────────────────────────────────────────────────────────────
  "Innovation Odyssey Challenge": {
    department: "SAVERA",
    coordinators: [
      { name: "Harsh Kr (Coordinator)", phone: "9811413309" },
      { name: "Himanshu", phone: "9143580007" },
      { name: "Bhoomi", phone: "9817413591" },
    ],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },
  "Tech Titans Trivia": {
    department: "SAVERA",
    coordinators: [
      { name: "Ananya (Coordinator)", phone: "7988439289" },
      { name: "Nandini", phone: "7015401143" },
    ],
    studentCoordinator: { name: "Archana", phone: "7015114622" },
    studentCoCoordinator: { name: "Suraj", phone: "9546716342" },
  },

  // ── SEE (EED) ─────────────────────────────────────────────────────────────
  "Tech Charades": {
    department: "SEE (EED)",
    coordinators: [
      { name: "Yashika", phone: "8053602816" },
      { name: "Shaan", phone: "9306754678" },
      { name: "Rohan Lalka", phone: "8278920321" },
    ],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Tech Bid": {
    department: "SEE (EED)",
    coordinators: [
      { name: "Prajeshwar Kaushik", phone: "7015098896" },
      { name: "Tannu", phone: "9692653159" },
      { name: "Arpit", phone: "9466636455" },
      { name: "Chirag", phone: "9253208728" },
    ],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },
  "Machine Mantra": {
    department: "SEE (EED)",
    coordinators: [
      { name: "Yash Dahiya", phone: "7015855834" },
      { name: "Prince", phone: "9216786005" },
      { name: "Sanjeet", phone: "" },
      { name: "Deepanshu", phone: "" },
      { name: "Pariksha", phone: "" },
    ],
    studentCoordinator: { name: "Anuj", phone: "9996022472" },
    studentCoCoordinator: { name: "Kajal", phone: "9034610676" },
  },

  // ── MANTHAN (CHE) chemical ─────────────────────────────────────────────────────────
  "Knowledge Knockout Quiz (Mind Clash)": {
    department: "MANTHAN (CHE)",
    coordinators: [
      { name: "Surbhi", phone: "8708408833" },
      { name: "Rajni", phone: "8059332247" },
      { name: "Partik Singh", phone: "9350203487" },
    ],
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },
  "Get Recognised for Your Personality (GRYP)": {
    department: "MANTHAN (CHE)",
    coordinators: [
      { name: "Khushi Rao", phone: "9416171139" },
      { name: "Pawan Kumar", phone: "8178477961" },
      { name: "Disha", phone: "7015473578" },
    ],
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },
  "Chem Spark": {
    department: "MANTHAN (CHE)",
    coordinators: [
      { name: "Bharti Devi", phone: "9817652238" },
      { name: "Bhoomi", phone: "8168573726" },
      { name: "Aayush Mishra", phone: "9334805855" },
    ],
    studentCoordinator: { name: "Harsh", phone: "8168669968" },
    studentCoCoordinator: { name: "Mayank Mann", phone: "7016416260" },
  },

  // ── YOUNG THESPIANS (DMS) ─────────────────────────────────────────────────
  "Team Titans": {
    department: "YOUNG THESPIANS (DMS)",
    coordinators: [
      { name: "Hemant", phone: "9992551171" },
      { name: "Purvi", phone: "7988909541" },
      { name: "Sarika", phone: "9992560550" },
    ],
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },
  "Brand Storm": {
    department: "YOUNG THESPIANS (DMS)",
    coordinators: [
      { name: "Apsara", phone: "8816950480" },
      { name: "Anjali", phone: "8683852081" },
      { name: "Jatin", phone: "9991224661" },
    ],
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },
  
  "Business Hunt": {
    department: "YOUNG THESPIANS (DMS)",
    coordinators: [
      { name: "Apsara", phone: "8816950480" },
      { name: "Anjali", phone: "8683852081" },
      { name: "Jatin", phone: "9991224661" },
    ],
    studentCoordinator: { name: "Nikita Singh", phone: "8278907980" },
    studentCoCoordinator: { name: "Sunny Saini", phone: "7015463534" },
  },

  // ── ROBOTICS (THINKBOTS) ─────────────────────────────────────────────────
  "Walking-Dead": {
    department: "ROBOTICS(THINKBOTS)",
    coordinators: [
      { name: "Pritam", phone: "9812015241" },
      { name: "Sahil Kumar", phone: "8168560627" },
      { name: "Bhavana", phone: "8950293115" },
    ],
    studentCoordinator: { name: "Sahil Kumar", phone: "8168560627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },
  "Dungeon-Drive": {
    department: "ROBOTICS(THINKBOTS)",
    coordinators: [
      { name: "Sahil Kumar", phone: "8168560627" },
      { name: "Harshit Gupta", phone: "8318457562" },
      { name: "Pritam", phone: "9812015241" },
    ],
    studentCoordinator: { name: "Sahil Kumar", phone: "8168560627" },
    studentCoCoordinator: { name: "Harshit Gupta", phone: "8318457562" },
  },

  // ── E-Cell ─────────────────────────────────────────────────────────────────
  "Mix-Matched": {
    department: "E-Cell",
    coordinators: [
      { name: "Akshat", phone: "8950956591" },
      { name: "Amit Kumar", phone: "9145850135" },
      { name: "Harsh Jindal", phone: "8307273876" },
    ],
    studentCoordinator: { name: "ARYAN DEHIMIWAL", phone: "9728762899" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },
  "The Corporate Clash": {
    department: "E-Cell",
    coordinators: [
      { name: "Garv", phone: "7082398051" },
      { name: "Lavisha Goyal", phone: "9253278847" },
      { name: "Sunidhi Chauhan", phone: "8510077880" },
    ],
    studentCoordinator: { name: "ARYAN DEHIMIWAL", phone: "9728762899" },
    studentCoCoordinator: { name: "Anshu Kumar", phone: "9468190812" },
  },

  // ── LISOC-Literary Society ─────────────────────────────────────────────────
  "Student of the Year": {
    department: "LISOC-Literary Society",
    coordinators: [
      { name: "Nishant Kumar", phone: "8448048603" },
      // { name: "Neel Kamal", phone: "8447949250" },
      { name: "Archit Kumar", phone: "9813655644" },
      { name: "Divya", phone: "8295148907" },
    ],
    studentCoordinator:  { name: "Rohan Kumar Rai", phone: "9310377806" },
    studentCoCoordinator: { name: "Neel Kamal", phone: "8447949250" },
  },
  "BPD (British Parliamentary Debate)": {
    department: "LISOC-Literary Society",
    coordinators: [
      { name: "Rohit", phone: "6204611307" },
      { name: "Rajat", phone: "7404993212" },
      { name: "Bhumika", phone: "9467598459" },
    ],
    studentCoordinator:  { name: "Rohan Kumar Rai", phone: "9310377806" },
    studentCoCoordinator: { name: "Neel Kamal", phone: "8447949250" },
  },

  // ── SUNSHINE ──────────────────────────────────────────────────────────────
  "Gaming Event": {
    department: "SUNSHINE",
    coordinators: [
      { name: "Dhruv Chahlia", phone: "9468199602" },
      { name: "Pushkar Narula", phone: "9896583405" },
      { name: "Sanjeev", phone: "7419179477" },
    ],
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7015081345" },
    studentCoCoordinator: { name: "Agastya", phone: "8708411706" },
  },
  "Treasure Hunt": {
    department: "SUNSHINE",
    coordinators: [
      { name: "Swati", phone: "7056894787" },
      { name: "Simran", phone: "8901087009" },
      { name: "Akshat", phone: "9350827383" },
    ],
    studentCoordinator: { name: "Krishna Maheshwari", phone: "7015081345" },
    studentCoCoordinator: { name: "Agastya", phone: "8708411706" },
  },

  // ── CSE Department ────────────────────────────────────────────────────────
  "Web Master": {
    department: "CSE Department",
    coordinators: [
      { name: "Mahek", phone: "9653540271" },
      { name: "Rijul Kasana", phone: "9354297700" },
      { name: "Neeraj", phone: "7027142144" },
    ],
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },
  "Techno Quiz": {
    department: "CSE Department",
    coordinators: [
      { name: "Divyansh", phone: "9729308775" },
      { name: "Vivek", phone: "8816883633" },
      { name: "Jayant", phone: "7082401701" },
    ],
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },
  "Think Future": {
    department: "CSE Department",
    coordinators: [
      { name: "Abhishek Saini", phone: "9350069551" },
      { name: "Abhishek Kumar", phone: "8877998483" },
      { name: "Komal Yadav", phone: "9253413116" },
    ],
    studentCoordinator: { name: "Aditya Aggrawal", phone: "9873403658" },
    studentCoCoordinator: { name: "Ansshu", phone: "9015078464" },
  },

  // ── CEEES ─────────────────────────────────────────────────────────────────
  "Idea-Thon": {
    department: "CEEES",
    coordinators: [
      { name: "Ritika", phone: "9368373056" },
      { name: "Priyanshu", phone: "8683911620" },
      { name: "Priyadarshan", phone: "9105131514" },
    ],
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },
  "Agri-Technictionary": {
    department: "CEEES",
    coordinators: [
      { name: "Parul", phone: "9812433539" },
      { name: "Sahil", phone: "9992301925" },
      { name: "Vishu", phone: "9050409918" },
    ],
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },
  "Seed Sorting Race": {
    department: "CEEES",
    coordinators: [
      { name: "Nikhil", phone: "8684004933" },
      { name: "Rajat", phone: "9050280207" },
      { name: "Yash", phone: "8989848380" },
    ],
    studentCoordinator: { name: "Anshu Kumar", phone: "9817582885" },
    studentCoCoordinator: { name: "Vansh Saini", phone: "7027768707" },
  },

  // ── MATHEMAGICIANS (Mathematics) ───────────────────────────────────────────
  "Poster Making": {
    department: "MATHEMAGICIANS (Mathematics)",
    coordinators: [
      { name: "Jaya", phone: "9996975284" },
      { name: "Anjali", phone: "7419313745" },
      { name: "Diya", phone: "7056705284" },
    ],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },
  "Debate": {
    department: "MATHEMAGICIANS (Mathematics)",
    coordinators: [
      { name: "Aditya Barak", phone: "9992222263" },
      { name: "Anshul", phone: "9034179331" },
      { name: "Savin Malik", phone: "9992106583" },
    ],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },
  "Quiz": {
    department: "MATHEMAGICIANS (Mathematics)",
    coordinators: [
      { name: "Sagar", phone: "9813686078" },
      { name: "Princy", phone: "9306668220" },
      { name: "Neha", phone: "8199076316" },
      { name: "Priyanshu", phone: "9996525807" },
    ],
    studentCoordinator: { name: "Dipanshu", phone: "9812173253" },
    studentCoCoordinator: { name: "Nikita Panwar", phone: "8930519875" },
  },

  // ── ENGENISIS (BT) ────────────────────────────────────────────────────────
  "Brainy Brawl": {
    department: "ENGENISIS (BT)",
    coordinators: [
      { name: "Sharmili", phone: "9310123638" },
      { name: "P. Pujitha", phone: "7042564979" },
      { name: "Nishtha", phone: "9015466455" },
    ],
    studentCoordinator: { name: "Ayushi Singh", phone: "7827216646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062592" },
  },
  "Brain Quest Arena": {
    department: "ENGENISIS (BT)",
    coordinators: [
      { name: "Paras Sharma", phone: "9034789204" },
      { name: "Raveena Kumari", phone: "9953262105" },
      { name: "Prachi Giri", phone: "8800418632" },
    ],
    studentCoordinator: { name: "Ayushi Singh", phone: "7827216646" },
    studentCoCoordinator: { name: "Sidharth", phone: "8059062592" },
  },

  // ── MEDITRONICA (BME) ─────────────────────────────────────────────────────
  "Poster Making Competition": {
    department: "MEDITRONICA (BME)",
    coordinators: [
      { name: "Paviter", phone: "7701973440" },
      { name: "Bhawna", phone: "8368902424" },
      { name: "Anushka", phone: "9953099802" },
    ],
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },
  "Biomedical Tech Quiz": {
    department: "MEDITRONICA (BME)",
    coordinators: [
      { name: "Akshit", phone: "8571816371" },
      { name: "Kaveri", phone: "6232113336" },
      { name: "Sourabh", phone: "8168341583" },
    ],
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },
  "Biomedical Debate Competition": {
    department: "MEDITRONICA (BME)",
    coordinators: [
      { name: "Advika", phone: "9810696492" },
      { name: "Sneha", phone: "8950679804" },
      { name: "Kirti", phone: "7988145663" },
    ],
    studentCoordinator: { name: "Aryan", phone: "7982625724" },
    studentCoCoordinator: { name: "Ankit", phone: "9350660602" },
  },

  // ── RASAYANAM (Chemistry) ─────────────────────────────────────────────────
  "Science Quiz": {
    department: "RASAYANAM (Chemistry)",
    coordinators: [
      { name: "Megha", phone: "9817958951" },
      { name: "Mahak Verma", phone: "8708283003" },
      { name: "Tannu", phone: "8168397513" },
    ],
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "Magic of Chemistry": {
    department: "RASAYANAM (Chemistry)",
    coordinators: [
      { name: "Sheetal", phone: "8395940368" },
      { name: "Yashasvi", phone: "7206738128" },
      { name: "Chhavi", phone: "9996461260" },
    ],
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },
  "The Alchemist's Cipher": {
    department: "RASAYANAM (Chemistry)",
    coordinators: [
      { name: "Shruti", phone: "9671110581" },
      { name: "Kumkum", phone: "7015725980" },
      { name: "Priya", phone: "9306259105" },
    ],
    studentCoordinator: { name: "Monti", phone: "9350472740" },
    studentCoCoordinator: { name: "Sahil", phone: "9350122173" },
  },

  // ── NIRMAN (CIVIL) ─────────────────────────────────────────────────────────
  "Chakravyuh": {
    department: "NIRMAN (CIVIL)",
    coordinators: [
      { name: "Tanisha", phone: "8708076069" },
      { name: "Amarjot", phone: "6006248424" },
      { name: "Ashish ", phone: "9729672344" },
    ],
    studentCoordinator: { name: "Yashika", phone: "8700162084" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },
  "Bridge it Right": {
    department: "NIRMAN (CIVIL)",
    coordinators: [
      { name: "Neetu", phone: "8818068093" },
      { name: "Tanu", phone: "7206347772" },
      { name: "Rozy", phone: "8572832441" },
      { name: "Sahil", phone: "8295522360" },
    ],
    studentCoordinator:{ name: "Yashika", phone: "8700162084" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },
  "Think & Sprint": {
    department: "NIRMAN (CIVIL)",
    coordinators: [
      { name: "Srishti Rawal", phone: "9034524004" },
      { name: "Saman", phone: "9992379210" },
      { name: "Vikash Yadav", phone: "7678601745" },
    ],
    studentCoordinator: { name: "Harsh", phone: "8950173600" },
    studentCoCoordinator: { name: "Abhishek Pandey", phone: "9896768939" },
  },

  // ── Mechanical Engineering (SoMEC) ────────────────────────────────────────
  "Design Minds": {
    department: "Mechanical Engineering",
    coordinators: [
      { name: "Rohan Kumar Rai", phone: "9310377806" },
      { name: "Sameen", phone: "9306752242" },
      { name: "Kartik Kashyap", phone: "9266467568" },
    ],
    studentCoordinator: { name: "Yuvraj Rai", phone: "9369495654" },
    studentCoCoordinator: { name: "Dhanjeet Kumar Yadav", phone: "7007430796" },
  },
  "Aero Modeling (Sky Glider)": {
    department: "Mechanical Engineering",
    coordinators: [
      { name: "Tanisha Yadav", phone: "8307236942" },
      { name: "Himanshu Saini", phone: "7015087827" },
      { name: "Umesh", phone: "8307519848" },
    ],
    studentCoordinator: { name: "Yuvraj Rai", phone: "9369495654" },
    studentCoCoordinator: { name: "Dhanjeet Kumar Yadav", phone: "7007430796" },
  },

  // ── RAMAN (Physics) ───────────────────────────────────────────────────────
  "Physi-Hunt": {
    department: "RAMAN (Physics)",
    coordinators: [
      { name: "Bhawna", phone: "8307997135" },
      { name: "Payal", phone: "9350459793" },
    ],
    studentCoordinator: { name: "Dr Ashok Kumar", phone: "7056273692" },
  },
  "The Escape Room": {
    department: "RAMAN (Physics)",
    coordinators: [
      { name: "Rinki", phone: "7027571268" },
      { name: "Madhu", phone: "7082835844" },
    ],
    studentCoordinator: { name: "Dr Ashima", phone: "7988164698" },
  },
  "Inno Vision": {
    department: "RAMAN (Physics)",
    coordinators: [
      { name: "Aditi", phone: "8950043312" },
      { name: "Pooja", phone: "9671842499" },
    ],
    studentCoordinator: { name: "Dr Ravinder Kumar", phone: "" },
  },

  // ── ECED Department ───────────────────────────────────────────────────────
  "Circuit Design and Debugging Competition": {
    department: "ECED",
    coordinators: [
      { name: "Rohit Shankar", phone: "8368082225" },
      { name: "Yashika", phone: "9899009143" },
      { name: "Piyush Sharma", phone: "7310605726" },
      { name: "Sumit", phone: "6295137950" },
    ],
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },
  "Roastverse": {
    department: "ECED",
    coordinators: [
      { name: "Akshat", phone: "8950956591" },
      { name: "Ashurt Bansal", phone: "9729705939" },
      { name: "Rahul", phone: "7877051118" },
    ],
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },
  "Prompt2Poster": {
    department: "ECED",
    coordinators: [
      { name: "Sagar", phone: "9992930151" },
      { name: "Rahul Bhukal", phone: "9671268466" },
      { name: "Mahesh", phone: "9034398741" },
    ],
    studentCoordinator: { name: "Gautam Saw", phone: "9334053907" },
    studentCoCoordinator: { name: "Nitin", phone: "8708716164" },
  },

  // ── DCRUST ODC ─────────────────────────────────────────────────────────────
  "CodeBug": {
    department: "DCRUST ODC",
    coordinators: [
      { name: "Mukul", phone: "9817366024" },
      { name: "Ankit Balhara", phone: "8684973584" },
      { name: "Komal Verma", phone: "9053931575" },
    ],
    studentCoordinator: { name: "Laxmi", phone: "9350079206" },
    studentCoCoordinator: { name: "Abhishek", phone: "9350069551" },
  },
  "SQL Master": {
    department: "DCRUST ODC",
    coordinators: [],
    studentCoordinator: { name: "Laxmi", phone: "9350079206" },
    studentCoCoordinator: { name: "Abhishek", phone: "9350069551" },
  },
};

export function getEventCoordinators(
  eventTitle: string
): EventCoordinatorInfo | null {
  return eventCoordinatorsMap[eventTitle] ?? null;
}