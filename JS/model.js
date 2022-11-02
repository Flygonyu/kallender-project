const model = {
    //app
    app:{
        currentUser: '', //admin, Vanja
        currentPage: 'createAccount', //signIn, createAccount, dayView, 
                                      //weekView, monthView, yearView, editEvent, 
                                      //createEvent,
    },
    
    //inputs
    inputs: {
        
        createEvent:{
            title:'',
            category:'',
            color:'',
            startDate:'',
            endDate:'',
            startTime:'',
            endTime:'',
            description:'',
        },

        editEvent:{
            title:'',
            category:'',
            color:'',
            startDate:'',
            endDate:'',
            startTime:'',
            endTime:'',
            description:''
        },
        
        signIn:{
            email: '',
            passwrd: '',
        }, 

        createAccount:{
            email: '',
            username: '',
            passwrd: '',
            verifyPasswrd: '',
        } 
    },

    //data
    users: [
        {
            id: 1,
            email: 'admin@email.com',
            username: 'admin',
            passwrd: '123',
            isAdmin: true,
        },
        {
            id: 2,
            email: 'vanja@email.com',
            username: 'Vanja',
            passwrd: '123',
            isAdmin: false,
        },
        {
            id: 3,
            email: '',
            username: '',
            passwrd: '',
            isAdmin: false,
        },
    ],

    events:[
        {
            startDate: '1.11.22',
            endDate: '1.11.22',
            startTime: '12:15',
            endTime: '12:45',
            title: 'Møte',
            description: 'Møte med Elin',
            createdBy: 'Vanja',        //if createdBy = currentUser or admin, allow edit
            category: 'møte',       //if category, lock color picker
            color: 'blue',
        },
        {
            startDate: '4.11.22',
            endDate: '7.11.22',
            startTime: '09:00',
            endTime: '',        //what to do if not specified
            title: 'Hyttetur',
            description: 'Borte fra kontoret, ta kontakt via tlf.',
            createdBy: 'Vanja',  
            category: 'annet',   //'annet' or null? idunno
            color: 'pink',
        },
    ],
    
    refrenceData: {
        currentMonday:'',
        currentDate:'',
        currentMonth:'',
        currentYear:'',
        currentWeek:'',
        isLeapYear: false, //? not sure where to put this
        splitDayView: false,
        holidays: [
            {
                date: '01.01',
                name: 'Nyttårsdag',
            },
            {
                date:'',
                name:'Fastelavnssøndag'
            },
            {
                date:'08.03',
                name:'Den internasjonale kvinnedagen',
            },
            {
                date:'',
                name:'palmesøndag'
            }, 
            {
                date:'',
                name:'Skjærtorsdag'
            }, 
            {
                date:'',
                name:'Langfredag'
            },
            {
                date:'',
                name:'Påskeaften'
            },
            {
                date:'17.05',
                name:'17 Mai'
            }, 
            {
                date:'',
                name:'Sankthans'
            },
            {
                date:'24.12',
                name:'Julaften'
            }
        ],

    }

}

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