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
          <select class="moodle-category" onchange="model.inputs.calendar.editEvent.category=this.value" name="">
            <option value="${null}">Velg en kategori</option>
            <option value="møte">møte</option>
            <option value="ferie">ferie</option>
            <option value="annet">annet</option>
          </select>
        </div>
        <div class="moodle-top">
        <input class="colorPicker" value="${model.inputs.calendar.editEvent.color}" onchange="model.inputs.calendar.editEvent.color=this.value" type="color">
          starter:
          <input class="datePicker" value="${model.inputs.calendar.editEvent.startDate}" onchange="model.inputs.calendar.editEvent.startDate=this.value" type="datetime-local">
          slutter:
          <input class="datePicker" value="${model.inputs.calendar.editEvent.endDate}" onchange="model.inputs.calendar.editEvent.endDate=this.value" type="datetime-local">
        </div>
        <input class="moodle-top description" value="${model.inputs.calendar.editEvent.description}" oninput="model.inputs.calendar.editEvent.description=this.value" type="text" placeholder="beskrivelse"><br>
        <button class="submit" ${disabled} onclick="addEvent()">Legg Til Event</button>
        <button class="cancel" onclick="resetAddEventMoodle()">Avslutt</button>
        ${errorMsg===''?'':moodleErrorMsg()}
      </div>
    </div>
  `;
  return html;
}

function editEventMoodle(){
  
  // let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;
  let html='';
  if(selectedevent!=null){
  html=`
    <div class="moodle-main-card ${hiddenEdit}">
      <div class="moodle-form  ${errorMsg}">
        <div class="moodle-top">
          <input class="moodle-title" type="text" onload="model.inputs.calendar.editEvent.title=this.value" value="${model.events[selectedevent].title}" oninput="model.inputs.calendar.editEvent.title=this.value" placeholder="tittel">
          <select class="moodle-category" value="${model.events[selectedevent].category}" onchange="model.inputs.calendar.editEvent.category=this.value" name="">
            <option value="${model.events[selectedevent].category}">${model.events[selectedevent].category != null ? model.events[selectedevent].category : 'Velg en kategori'}</option>
            <option value="møte">møte</option>
            <option value="ferie">ferie</option>
            <option value="annet">annet</option>
          </select>
        </div>
        <div class="moodle-top">
        <input class="colorPicker" value="${model.events[selectedevent].color}" onchange="model.inputs.calendar.editEvent.color=this.value" type="color">
          starter:
          <input class="datePicker" value="${model.events[selectedevent].startDate.toISOString().slice(0,16)}" onchange="model.inputs.calendar.editEvent.startDate=this.value" type="datetime-local">
          slutter:
          <input class="datePicker" value="${model.events[selectedevent].endDate.toISOString().slice(0,16)}" onchange="model.inputs.calendar.editEvent.endDate=this.value" type="datetime-local">
        </div>
        <input class="moodle-top description" value="${model.events[selectedevent].description}" oninput="model.inputs.calendar.editEvent.description=this.value" type="text" placeholder="beskrivelse"><br>
        <button class="submit" ${disabled} onclick="editEvent()">Endre</button>
        <button class="cancel" onclick="closeEdit()">Avslutt</button>
        ${errorMsg===''?'':moodleErrorMsg()}
      </div>
    </div>
  `;
}
  return html;
}

// model.events[selectedevent].startDate.toISOString().split('T')[0]+'T'+model.events[selectedevent].startDate.toLocaleTimeString().slice(0,5)

function moodleErrorMsg(){
  let html='';
  html=`
    <div class="moodle-error-box">Du må minimum fylle ut startdato, sluttdato og tittel</div>
  `;
  return html;
}


function infoMoodle(){
  let selectedevent=model.inputs.calendar.selectedEventId;
  let html='';
  if(selectedevent!=null && model.app.currentPage!=='dayView'){
  html=`
    <div class="moodle-main-card ${hiddenInfo}">
      <div class="infoMoodle" style="background-color:${model.events[selectedevent].color};">
      <div class="infoButtons">
        <button class="submit" onclick="editMoodle()">✎</button>
        <button class="cancel" onclick="closeInfo()">X</button>
      </div>  
      <div class="moodle-top">
        <text>${model.events[selectedevent].title}</text> <text>${model.events[selectedevent].category===null?'':model.events[selectedevent].category}</text>
        </div>
        ${moodleSetupLongEvent()}
        
        <div class="moodle-top infoDescription">${model.events[selectedevent].description}</div>
        <text>Lagt til av ${model.events[selectedevent].createdBy}</text>
      </div>
    </div>
  `;
}
  return html;
}

function moodleSetupLongEvent(){
  let selectedevent=model.inputs.calendar.selectedEventId;
  let html='';
  if(model.events[selectedevent].startDate.toLocaleDateString()===
  model.events[selectedevent].endDate.toLocaleDateString()){
    html=`<div class="moodle-top">
    ${model.dayNames[model.events[selectedevent].startDate.getDay()]} ${model.events[selectedevent].startDate.toLocaleDateString('no-NO')}</br>
      
      <text>kl. ${model.events[selectedevent].startDate.toLocaleTimeString('no-NO').slice(0,5)}</text>
      -
      <text>kl. ${model.events[selectedevent].endDate.toLocaleTimeString('no-NO').slice(0,5)}</text>
    </div>`;
  }
  else{
    html=`
    <div class="moodle-top">
    ${model.dayNames[model.events[selectedevent].startDate.getDay()]} 
    ${model.events[selectedevent].startDate.toLocaleDateString('no-NO')} 
    kl. ${model.events[selectedevent].startDate.toISOString().slice(11,16)}</br>
    - <br>
    ${model.dayNames[model.events[selectedevent].endDate.getDay()]} 
    ${model.events[selectedevent].endDate.toLocaleDateString('no-NO')} 
    kl. ${model.events[selectedevent].endDate.toISOString().slice(11,16)}
    </div>
    `
  }
  return html;
}

// console.log(model.dayNames[model.events[0].startDate.getDay()] )
// for later
// ${model.dayNames[model.events[0].endDate.getDay()]} ${model.events[0].endDate.toLocaleDateString('no-NO')}
