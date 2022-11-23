function createAccountView(){
    let html='';
    html+=`
        <div class="createAccount-container">
            <input type="email" class="emailInput" placeholder="Email" oninput="model.inputs.createAccount.email=this.value">
            <input type="text" class="createInputs" placeholder="Brukernavn" oninput="model.inputs.createAccount.username=this.value">
            <input type="password" class="createInputs" placeholder="Passord" oninput="model.inputs.createAccount.passwrd=this.value">
            <input type="password" class="createLastInputs" placeholder="Verifiser Passord" oninput="model.inputs.createAccount.verifyPasswrd=this.value">
            <button class="sign-in-button" onclick="createUserAccount()">Create Account</button>
        </div>
    `;
    return html;
}