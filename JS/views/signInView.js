function signInView(){
    let html='';
    html+=`
    <div class="welcome">Velkommen!</div>
    <div class="sign-in">
        <input class="emailInput" type="text" oninput="model.inputs.signIn.email=this.value" placeholder="epost-adresse"> <br/>
        <input class="passwordInput" placeholder="passord" oninput="model.inputs.signIn.passwrd=this.value" type="password"> </br>
        <button class="sign-in-button spacing" onclick="signInUser()">Sign In</button>
    </div>
    `;
    return html;
    
}

        