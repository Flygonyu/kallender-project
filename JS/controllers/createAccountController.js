function createUserAccount(){
    const users=model.users;
    const createAccount=model.inputs.createAccount;
    const existingUser=users.map(user=>user.email).indexOf(createAccount.email.toLocaleLowerCase());
    if(createAccount.email!==''&&createAccount.passwrd!==''&&createAccount.username!==''){
        if(existingUser===-1){
            if(createAccount.passwrd===createAccount.verifyPasswrd){
                const newUser={
                    id: users.length,
                    email: createAccount.email.toLocaleLowerCase(),
                    username: createAccount.username,
                    passwrd: createAccount.passwrd,
                    isAdmin: false,
                }
                model.users.push(newUser)
                resetCreateAccInputs()
                changeView('signInView');
                updateView();
            }
            else{
                errorMessage('Passordene var ikke like')
            }
        }
        else{
            errorMessage('Brukeren finnes fra før')
        }
    }
    else{
        errorMessage('Vennligst fyll ut alle felt')
    }
}

function resetCreateAccInputs(){
    const createAcc=model.inputs.createAccount;
    createAcc.email='';
    createAcc.passwrd='';
    createAcc.username='';
    createAcc.verifyPasswrd='';
}