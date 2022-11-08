let hidden = 'hidden'
let errorMsg='';

function updateView() {
  let html = `<div class="header">
                <div class="menu-button"></div>
            </div>
            
            ${selectedPage()}
            ${addEventMoodle()}
            
            <button class="addEventButton" onclick="showEventMoodle()">+</button>`;
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

function showEventMoodle(){
  hidden='';
  updateView();
}

let disabled = '';
function addEventMoodle(){
  let html='';
  html=`
    <div class="moodle-main-card ${hidden}">
      <div class="moodle-form  ${errorMsg}">
        <div class="moodle-top">
          <input class="moodle-title" type="text" oninput="model.inputs.calendar.editEvent.title=this.value" placeholder="tittel">
          <select class="moodle-category" onchange="model.inputs.calendar.editEvent.category=this.value" name="">
            <option value="${null}">Velg en kategori</option>
            <option value="møte">møte</option>
            <option value="ferie">ferie</option>
            <option value="annet">annet</option>
          </select>
        </div>
        <div class="moodle-top">
        <input class="colorPicker" onchange="model.inputs.calendar.editEvent.color=this.value" type="color">
          starter:
          <input class="datePicker" - onchange="model.inputs.calendar.editEvent.startDate=this.value" type="datetime-local">
          slutter:
          <input class="datePicker" onchange="model.inputs.calendar.editEvent.endDate=this.value" type="datetime-local">
        </div>
        <input class="moodle-top description" oninput="model.inputs.calendar.editEvent.description=this.value" type="text" placeholder="beskrivelse"><br>
        <button class="submit" ${disabled} onclick="addEvent()">Legg Til Event</button>
        <button class="cancel" onclick="resetAddEventMoodle()">Avslutt</button>
        ${errorMsg===''?'':moodleErrorMsg()}
      </div>
    </div>
  `;
  return html;
}

function moodleErrorMsg(){
  let html='';
  html=`
    <div class="moodle-error-box">Du må minimum fylle ut startdato, sluttdato og tittel</div>
  `;
  return html;
}


function infoMoodle(){
  let html='';
  html=`
    <div class="moodle-main-card ">
      <div class="infoMoodle" style="background-color:${model.events[0].color};">
        <div class="moodle-top">
        <text>${model.events[0].title}</text> <text>${model.events[0].category}</text>
        </div>
        <div class="moodle-top">
          starter:
          <text>${model.events[0].startDate}</text>
          slutter:
          <text>${model.events[0].endDate}</text>
        </div>
        <div class="moodle-top infoDescription">Beskrivelse</div>
        <button class="submit" onclick="addEvent()">Endre event</button>
        <button class="cancel" onclick="resetAddEventMoodle()">Lukk</button>
      </div>
    </div>
  `;
  return html;
}