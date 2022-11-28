function signInUser(){
    const users=model.users;
    const signIn=model.inputs.signIn;
    const signedInUser= users.map(user=>user.email).indexOf(signIn.email);
    if(signedInUser!==-1 && users[signedInUser].passwrd===signIn.passwrd){
        model.app.currentUser=users[signedInUser].id;
        resetSignInInputs();
        changeView('monthView')
        updateView();
    }
    else{
        console.log('Email eller passord er feil')
    }
}

function resetSignInInputs(){
    const signIn=model.inputs.signIn;
    signIn.email='';
    signIn.passwrd='';
}