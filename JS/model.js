const model = {
  //app
  app: {
    currentUser: 0, //admin, Vanja
    currentPage: "monthView",
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
      chosenColor: "orange",
      currentDay: new Date(),       //toISOString
      currentYear: new Date().getFullYear(),
      splitDay: false,
      selectedEventId:null,
      eventEditMode: false,
      editEvent: {          //create if selectedEventId=null
        id: 2,
        title: "",
        category: null,
        color: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    },
  },

  //data
  users: [
    {
      id: 0,
      isAdmin: false,
    },
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
      email: "fredrik@email.com",
      username: "Fredrik",
      passwrd: "456",
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
      id:1,
      startDate: new Date("2022-11-28 11:00:00"),
      endDate: new Date("2022-11-28 12:00:00"),
      title: "Møte",
      description: "Møte med Elin",
      createdBy: "Vanja", //if createdBy = currentUser or admin, allow edit
      category: "møte", //if category, lock color picker
      color: "#1371d8",
    },
    {
      id:2,
      startDate: new Date("2022-11-27 11:00:00"),
      endDate: new Date("2022-11-28 12:00:00"),
      title: "Hyttetur",
      description: "Borte fra kontoret, ta kontakt via tlf.",
      createdBy: "Vanja",
      category: 'ferie', 
      color: "#6fc86c",
    },
    {
      id:3,
      startDate: new Date("2022-11-20 01:00:00"),
      endDate: new Date("2022-11-25 01:00:00"),
      title: "Harrytur",
      description: "Handler bacon.",
      createdBy: "Fredrik",
      category: 'annet', 
      color: "#ff625a",
    },
    {
      id:4,
      startDate: new Date("2022-11-28 12:00:00"),
      endDate: new Date("2022-11-28 12:00:00"),
      title: "Movie time",
      description: "Surf's up best movie.",
      createdBy: "Fredrik",
      category: 'annet', 
      color: "#EF9A53",
    },
    {
      id:5,
      startDate: new Date("2022-10-25 02:00:00"),
      endDate: new Date("2022-11-22 01:00:00"),
      title: "Epic coding",
      description: "we're doing great",
      createdBy: "Vanja",
      category: 'annet', 
      color: "#90ee90",
    },
  ],

  holidays: [
    
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
