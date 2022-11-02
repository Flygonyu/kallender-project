function signInView(){
    let html='';
    html+=`<div class="header">
                <div class="menu-button"></div>
            </div>`
    html+=`
    <div class="welcome">Velkommen!</div>
    <div class="sign-in">
        <input class="emailInput" type="text" placeholder="epost-adresse"> <br/>
        <input class="passwordInput" placeholder="passord" type="password"> </br>
        <button class="sign-in-button spacing">Sign In</button>
    </div>
    `;
    document.getElementById('app').innerHTML=html;
}

        