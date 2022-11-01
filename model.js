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

    }

}