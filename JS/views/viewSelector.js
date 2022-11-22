let hiddenAdd = 'hidden';
let hiddenInfo = 'hidden';
let hiddenEdit = 'hidden';
let errorMsg='';

function updateView() {
  let html = `<div class="header">
                <div class="menu-button"></div>
            </div>
            
            ${selectedPage()}
            ${addEventMoodle()}
            ${infoMoodle()}
            ${editEventMoodle()}
            <button class="addEventButton" onclick="showEventMoodle()">+</button>`;
  document.getElementById("app").innerHTML = html;
}

function selectedPage() {
  let html = "";
  if (model.app.currentPage === "dayView") {
    html += dayView();
  } else if (model.app.currentPage === "signInView") {
    html = signInView();
  } else if (model.app.currentPage === "weekView") {
    html = weekView();
  } else if (model.app.currentPage === "monthView") {
    html = monthView();
  } else if (model.app.currentPage === "yearView") {
    html = yearView();
  }
  return html;
}

function showEventMoodle(){
  resetAddEventMoodle()
  hiddenAdd='';
  updateView();
}

let disabled = '';
function addEventMoodle(){
  let html='';
  html=`
    <div class="moodle-main-card ${hiddenAdd}">
      <div class="moodle-form  ${errorMsg}">
        <div class="moodle-top">
          <input class="moodle-title" type="text" oninput="model.inputs.calendar.editEvent.title=this.value" value="${model.inputs.calendar.editEvent.title}" placeholder="tittel">
          <select class="moodle-category" value="" onchange="chosenCategory(this.value)" name="">
            <option value="Velg en kategori">${model.inputs.calendar.editEvent.category != null ? model.inputs.calendar.editEvent.category : 'Velg en kategori'}</option>
            <option value="møte">møte</option>
            <option value="ferie">ferie</option>
            <option value="annet">annet</option>
          </select>
        </div>
        <div class="moodle-top">
        <input ${disabled} value="${model.inputs.calendar.editEvent.color}" class="colorPicker" type="color" list="presets" onchange="model.inputs.calendar.editEvent.color=this.value">
          <datalist id="presets">
            <option value="#975C8D">Grey</option>
            <option value="#EF9A53">White</option>
            <option value="#497174">Blue</option>
          </datalist>        
          starter:
          <input class="datePicker" value="${model.inputs.calendar.editEvent.startDate}" onchange="model.inputs.calendar.editEvent.startDate=this.value" type="datetime-local">
          slutter:
          <input class="datePicker" value="${model.inputs.calendar.editEvent.endDate}" onchange="model.inputs.calendar.editEvent.endDate=this.value" type="datetime-local">
        </div>
        <input class="moodle-top description" value="${model.inputs.calendar.editEvent.description}" oninput="model.inputs.calendar.editEvent.description=this.value" type="text" placeholder="beskrivelse"><br>
        <button class="submit" onclick="addEvent()">Legg Til Event</button>
        <button class="cancel" onclick="resetAddEventMoodle()">Avslutt</button>
        ${errorMsg===''?'':moodleErrorMsg()}
      </div>
    </div>
  `;
  return html;
}

function editEventMoodle(){
  let selectedevent=model.inputs.calendar.selectedEventId;
  let editEvent = model.inputs.calendar.editEvent;
  let html='';
  if(selectedevent!=null){
  html=`
    <div class="moodle-main-card ${hiddenEdit}">
      <div class="moodle-form  ${errorMsg}">
        <div class="moodle-top">
          <input class="moodle-title" type="text"  value="${editEvent.title}" oninput="model.inputs.calendar.editEvent.title=this.value" placeholder="tittel">
          <select class="moodle-category" value="${editEvent.category}" onchange="chosenCategory(this.value)" name="">
            <option value="${editEvent.category}">${editEvent.category != null ? editEvent.category : 'Velg en kategori'}</option>
            <option value="møte">møte</option>
            <option value="ferie">ferie</option>
            <option value="annet">annet</option>
          </select>
        </div>
        <div class="moodle-top">
        <input ${disabled} value="${editEvent.color}" class="colorPicker" type="color" list="presets" onchange="model.inputs.calendar.editEvent.color=this.value">
        <datalist id="presets">
          <option value="#975C8D">Grey</option>
          <option value="#EF9A53">White</option>
          <option value="#497174">Blue</option>
        </datalist>   
          starter:
          <input class="datePicker" value="${model.events[selectedevent].startDate.toISOString().slice(0,16)}" onchange="model.inputs.calendar.editEvent.startDate=this.value" type="datetime-local">
          slutter:
          <input class="datePicker" value="${model.events[selectedevent].endDate.toISOString().slice(0,16)}" onchange="model.inputs.calendar.editEvent.endDate=this.value" type="datetime-local">
        </div>
        <input class="moodle-top description" value="${editEvent.description}" oninput="model.inputs.calendar.editEvent.description=this.value" type="text" placeholder="beskrivelse"><br>
        <button class="submit" onclick="editEvent()">Endre</button>
        <button class="cancel" onclick="closeEdit()">Avslutt</button>
        ${errorMsg===''?'':moodleErrorMsg()}
      </div>
    </div>
  `;
}
  return html;
}

function moodleErrorMsg(){
  let html = '';
  html = `
    <div class="moodle-error-box">${model.app.errmsg}</div>
  `;
  return html;
}


function infoMoodle(){
  let selectedevent=model.inputs.calendar.selectedEventId;
  let events = model.events;
  let html = '';
  if(selectedevent!=null && model.app.currentPage!=='dayView'){
  html = `
    <div class="moodle-main-card ${hiddenInfo}">
      <div class="infoMoodle" style="background-color:${events[selectedevent].color};">
      <div class="infoButtons">
        <button class="delete" onclick="deleteTask()">🗑</button>
        <button class="submit" onclick="editMoodle()">✎</button>
        <button class="cancel" onclick="closeInfo()">X</button>
      </div>  
      <div class="moodle-top">
        <text>${events[selectedevent].title}</text> 
        <text>${events[selectedevent].category === null ? '' : events[selectedevent].category}</text>
        </div>
        ${moodleSetupLongEvent()}
        <div class="moodle-top infoDescription">${events[selectedevent].description}</div>
        <text>Lagt til av ${events[selectedevent].createdBy}</text>
      </div>
    </div>
  `;
}
  return html;
}

function moodleSetupLongEvent(){
  let selectedevent=model.inputs.calendar.selectedEventId;
  let html='';
  let events = model.events;
  if(events[selectedevent].startDate.toLocaleDateString()===
  events[selectedevent].endDate.toLocaleDateString()){
    html=`<div class="moodle-top">
    ${model.dayNames[events[selectedevent].startDate.getDay()]} ${events[selectedevent].startDate.toLocaleDateString('no-NO')}</br>
      
      <text>kl. ${events[selectedevent].startDate.toISOString().slice(11,16)}</text>
      -
      <text>kl. ${events[selectedevent].endDate.toISOString().slice(11,16)}</text>
    </div>`;
  }
  else{
    html=`
    <div class="moodle-top">
    ${model.dayNames[events[selectedevent].startDate.getDay()]} 
    ${events[selectedevent].startDate.toLocaleDateString('no-NO')} 
    kl. ${events[selectedevent].startDate.toISOString().slice(11,16)}</br>
    - <br>
    ${model.dayNames[events[selectedevent].endDate.getDay()]} 
    ${events[selectedevent].endDate.toLocaleDateString('no-NO')} 
    kl. ${events[selectedevent].endDate.toISOString().slice(11,16)}
    </div>
    `
  }
  return html;
}