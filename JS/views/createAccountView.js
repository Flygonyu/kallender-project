function createAccountView(){
    let html='';
    html+=`
        <div class="createAccount-container">
            <input type="email" class="emailInput" placeholder="Email" value="${model.inputs.createAccount.email}" 
                oninput="model.inputs.createAccount.email=this.value">
            <input type="text" class="createInputs" placeholder="Brukernavn" value="${model.inputs.createAccount.username}" 
                oninput="model.inputs.createAccount.username=this.value">
            <input type="password" class="createInputs" placeholder="Passord" value="${model.inputs.createAccount.passwrd}" 
                oninput="model.inputs.createAccount.passwrd=this.value">
            <input type="password" class="createLastInputs" value="${model.inputs.createAccount.verifyPasswrd}" placeholder="Verifiser Passord" 
                oninput="model.inputs.createAccount.verifyPasswrd=this.value">
            ${errorMsg===''?'':moodleErrorMsg()}
            <button class="sign-in-button" onclick="createUserAccount()">Create Account</button>
        </div>
    `;
    return html;
}