const model = {
  //app
  app: {
    currentUser: "", //admin, Vanja
    currentPage: "dayView", //signIn, createAccount, dayView,
    //weekView, monthView, yearView, 
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
      startDate: new Date("2022-11-08"),
      endDate: new Date("2022-11-08"),
      title: "Møte",
      description: "Møte med Elin",
      createdBy: "Vanja", //if createdBy = currentUser or admin, allow edit
      category: "møte", //if category, lock color picker
      color: "blue",
    },
    {
      startDate: new Date("2022-11-07"),
      endDate: new Date("2022-11-07"),
      title: "Hyttetur",
      description: "Borte fra kontoret, ta kontakt via tlf.",
      createdBy: "Vanja",
      category: null, 
      color: "pink",
    },
    {
      startDate: new Date("2022-11-07"),
      endDate: new Date("2022-11-10"),
      title: "Harry tur",
      description: "Handler bacon.",
      createdBy: "Fredrik",
      category: null, 
      color: "red",
    },
    {
      startDate: new Date("2022-11-06"),
      endDate: new Date("2022-11-06"),
      title: "Movie time",
      description: "Surf's up best movie.",
      createdBy: "Fredrik",
      category: null, 
      color: "hotPink",
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
      date: "01.01",
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
      name: "palmesøndag",
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
      date: "17.05",
      name: "17 Mai",
    },
    {
      date: "",
      name: "Sankthans",
    },
    {
      date: "24.12",
      name: "Julaften",
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
