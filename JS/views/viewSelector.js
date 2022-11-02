function updateView(){
    let html=`<div class="header">
                <div class="menu-button"></div>
            </div>`;
    if(model.app.currentPage==='dayView'){
        html+=dayView();
    }
    html+=`<button class="addEventButton">+</button>`;
    document.getElementById('app').innerHTML=html;
}