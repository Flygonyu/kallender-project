function updateView() {
  let html = `<div class="header">
                <div class="menu-button"></div>
            </div>
            
            ${selectedPage()}
            <button class="addEventButton">+</button>`;
  document.getElementById("app").innerHTML = html;
}

function selectedPage() {
  let html = "";
  if (model.app.currentPage === "dayView") {
    html += dayView();
  } else if (model.app.currentPage === "signInView") {
    html = signInView();
  }
  return html;
}
