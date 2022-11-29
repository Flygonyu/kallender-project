const model = {
  //app
  app: {
    currentUser: 0,
    currentPage: "yearView",
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
      currentDay: new Date(),
      currentYear: new Date().getFullYear(),
      splitDay: false,
      selectedEventId:null,
      eventEditMode: false,
      editEvent: {          
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
      startDate: new Date("2022-12-01 11:00:00"),
      endDate: new Date("2022-12-01 12:00:00"),
      title: "Møte",
      description: "Møte med Elin",
      createdBy: "Vanja", 
      category: "møte", 
      color: "#1371d8",
    },
    {
      id:2,
      startDate: new Date("2022-11-27 11:00:00"),
      endDate: new Date("2022-11-29 12:00:00"),
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
      title: "C#",
      description: "Sette seg inn i C#.",
      createdBy: "Fredrik",
      category: 'annet', 
      color: "#ff625a",
    },
    {
      id:4,
      startDate: new Date("2022-10-13 12:00:00"),
      endDate: new Date("2022-10-13 13:00:00"),
      title: "Klatring",
      description: "Skal få til 6c i dag.",
      createdBy: "Fredrik",
      category: 'annet', 
      color: "#EF9A53",
    },
    {
      id:5,
      startDate: new Date("2022-02-22 02:00:00"),
      endDate: new Date("2022-02-22 03:00:00"),
      title: "Vanja's bursdag",
      description: "",
      createdBy: "Vanja",
      category: 'annet', 
      color: "#90ee90",
    },
    {
      id:6,
      startDate: new Date("2022-12-10 11:00:00"),
      endDate: new Date("2023-01-08 12:00:00"),
      title: "Juleferie",
      description: "Pakker, ribbe og kos.",
      createdBy: "Vanja",
      category: 'ferie', 
      color: "#6fc86c",
    },
    {
      id:7,
      startDate: new Date("2022-06-14 14:00:00"),
      endDate: new Date("2022-06-14 18:00:00"),
      title: "Strandkos",
      description: "Nå skal det bades.",
      createdBy: "Fredrik",
      category: 'Annet', 
      color: "#EBA83A",
    },
    {
      id:8,
      startDate: new Date("2023-01-13 11:00:00"),
      endDate: new Date("2023-01-13 12:00:00"),
      title: "Møte",
      description: "Møte med Terje",
      createdBy: "Vanja",
      category: 'møte', 
      color: "#1371d8",
    },
  ],

  holidays: [
    
  ],
};
