const model = {
  //app
  app: {
    currentUser: 1, //admin, Vanja
    currentPage: "dayView",
     //signIn, createAccount, dayView,
    //weekView, monthView, yearView, 
    errmsg:'',
  },

  //inputs
  inputs: {

    signIn: {
      email: "",
      passwrd: "",
    },

    createAccount: {
      email: "",
      username: "",
      passwrd: "",
      verifyPasswrd: "",
    },

    calendar: {
      currentDay: new Date(),       //toISOString
      mode: "day", //day, month, week, year
      splitDay: true,
      selectedEventId:null,
      eventEditMode: false,
      editEvent: {          //create if selectedEventId=null
        id: 2,
        title: "",
        category: null,
        color: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
      },
    },
  },

  //data
  users: [
    {
      id: 1,
      email: "admin@email.com",
      username: "admin",
      passwrd: "123",
      isAdmin: true,
    },
    {
      id: 2,
      email: "vanja@email.com",
      username: "Vanja",
      passwrd: "123",
      isAdmin: false,
    },
    {
      id: 3,
      email: "",
      username: "",
      passwrd: "",
      isAdmin: false,
    },
  ],

  months: [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],

  dayNames: [
    "søndag",
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag",
  ],

  events: [
    {
      startDate: new Date("2022-11-21 11:00:00"),
      endDate: new Date("2022-11-21 12:00:00"),
      title: "Møte",
      description: "Møte med Elin",
      createdBy: "Vanja", //if createdBy = currentUser or admin, allow edit
      category: "møte", //if category, lock color picker
      color: "#0D4C92",
    },
    {
      startDate: new Date("2022-11-21 11:00:00"),
      endDate: new Date("2022-11-21 12:00:00"),
      title: "Hyttetur",
      description: "Borte fra kontoret, ta kontakt via tlf.",
      createdBy: "Vanja",
      category: null, 
      color: "#FF8FB1",
    },
    {
      startDate: new Date("2022-11-10 01:00:00"),
      endDate: new Date("2022-11-15 01:00:00"),
      title: "Harrytur",
      description: "Handler bacon.",
      createdBy: "Fredrik",
      category: null, 
      color: "#DC3535",
    },
    {
      startDate: new Date("2022-11-15 01:00:00"),
      endDate: new Date("2022-11-15 01:00:00"),
      title: "Movie time",
      description: "Surf's up best movie.",
      createdBy: "Fredrik",
      category: null, 
      color: "#E97777",
    },
    {
      startDate: new Date("2022-10-15 02:00:00"),
      endDate: new Date("2022-11-15 01:00:00"),
      title: "Epic coding",
      description: "we're doing great",
      createdBy: "Vanja",
      category: null, 
      color: "lightgreen",
    },
  ],

  categories: [
    {
        id: 1,
        name: 'møte',
        color: 'blue'
    },
    {
        id: 2,
        name: 'ferie',
        color: 'green'
    },
    {
        id: 3,
        name: '',
        color: ''
    },
  ],

  isLeapYear: false, //? not sure where to put this

  holidays: [
    {
      date: new Date('01.01.2022'),
      name: "Nyttårsdag",
    },
    {
      date: "",
      name: "Fastelavnssøndag",
    },
    {
      date: "08.03",
      name: "Den internasjonale kvinnedagen",
    },
    {
      date: "",
      name: "Palmesøndag",
    },
    {
      date: "",
      name: "Skjærtorsdag",
    },
    {
      date: "",
      name: "Langfredag",
    },
    {
      date: "",
      name: "Påskeaften",
    },
    {
      date: "",
      name: "1. påskedag",
    },
    {
      date: "",
      name: "2. påskedag",
    },
    {
      date: "01.05",
      name: "Arbeidernes dag",
    },
    {
      date: "17.05",
      name: "Grunnlovsdagen",
    },
    {
      date: "",
      name: "Kristi himmelfartsdag",
    },
    {
      date: "",
      name: "Pinseaften",
    },
    {
      date: "",
      name: "1. pinsedag",
    },
    {
      date: "",
      name: "2. pinsedag",
    },
    {
      date: "23.06",
      name: "Sankthans",
    },
    {
      date: "",
      name: "Allehelgensdag",
    },
    {
      date: "",
      name: "1. søndag i advent",
    },
    {
      date: "",
      name: "2. søndag i advent",
    },
    {
      date: "",
      name: "3. søndag i advent",
    },
    {
      date: "",
      name: "4. søndag i advent",
    },
    {
      date: "24.12",
      name: "Julaften",
    },
    {
      date: "",
      name: "1. juledag",
    },
    {
      date: "",
      name: "2. juledag",
    },
    {
      date: "",
      name: "Nyttårsaften",
    },
  ],
};

// Følgende dager er helligdager i Norge:

// vanlige søndager
// nyttårsdag (1. januar)
// skjærtorsdag
// langfredag
// første og andre påskedag
// Kristi himmelfartsdag
// første og andre pinsedag
// første og andre juledag (25. og 26. desember)

// Høytidsdagene i Norge er 1. juledag, 1. påskedag, 1. pinsedag, 1. mai og 17. mai.
