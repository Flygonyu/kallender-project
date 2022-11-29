function signInView(){
    let html='';
    html+=`
    <div class="welcome">Velkommen!</div>
    <div class="sign-in">
        <input class="emailInput" type="text" value="${model.inputs.signIn.email}" oninput="model.inputs.signIn.email=this.value" placeholder="epost-adresse"> <br/>
        <input class="passwordInput" placeholder="passord" value="${model.inputs.signIn.passwrd}" oninput="model.inputs.signIn.passwrd=this.value" type="password"> </br>
         ${errorMsg===''?'':moodleErrorMsg()}
        <button class="sign-in-button spacing" onclick="signInUser()">Sign In</button>
       
    </div>
    `;
    return html;
    
}

        