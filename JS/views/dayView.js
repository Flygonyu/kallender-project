let chosenColor= 'orange';

function dayView() {
  let selectedevent=model.inputs.calendar.selectedEventId;
  let html = "";
  html += `
    <div class="">
        <div class="modeButtonsContainer">
            <button class="modeButton chosenButton">D</button>
            <button class="modeButton" onclick="changeView('weekView')">W</button>
            <button class="modeButton" onclick="changeView('monthView')">M</button>
            <button class="modeButton" onclick="changeView('yearView')">Y</button>
        </div>
      </div>
        <button class="splitDayButton">Del dag</button>
        <div class="dayPicker">
            <button onclick="previousDate(${1})" class="back">&lt</button>
            <div class="currentDaySeen" style="color:${weekendCheck(model.inputs.calendar.currentDay)}">${model.dayNames[model.inputs.calendar.currentDay.getDay()]} ${model.inputs.calendar.currentDay.getDate()}</div>
            <button onclick="nextDate(${1})" class="next">&gt</button>
        </div>
        <div class="currentMonthSeen">
            ${model.months[model.inputs.calendar.currentDay.getMonth()]} 
            ${model.inputs.calendar.currentDay.getFullYear()}
        </div>
    <div class="mainDayView">
      <div class="dayOverView">
      <div>
          ${showEventsThatDay()}
      </div>
      </div>
      <div class="detailsDayOverView" style="background-color:${chosenColor}">
      ${model.inputs.calendar.selectedEventId != null ?
        `<button class="submit" onclick="editMoodle()">✎</button>
        ${model.events[model.inputs.calendar.selectedEventId].title}<br>
        ${moodleSetupLongEvent()}
        ${model.events[model.inputs.calendar.selectedEventId].description}<br>
        Lagt til av ${model.events[model.inputs.calendar.selectedEventId].createdBy}
        `
        : ''}
        </div>
    </div>
    `;
  return html;
}

let toggle=1;
function getEventsInfo(index) {
  
    model.inputs.calendar.selectedEventId=index;
    chosenColor = model.events[model.inputs.calendar.selectedEventId].color
    updateView();
  
}

function showEventsThatDay() {
  let html = "";
  let event = model.events;

// console.log(model.events[0].startDate.toDateString())
// console.log(typeof model.inputs.calendar.currentDay.toJSON().split("T")[0])
// console.log(model.inputs.calendar.currentDay.toJSON())
  for (let i = 0; i < model.events.length; i++) {
    if (model.events[i].startDate.toJSON().split('T')[0] <= model.inputs.calendar.currentDay.toJSON().split('T')[0] && 
    model.events[i].endDate.toJSON().split('T')[0]>= model.inputs.calendar.currentDay.toJSON().split('T')[0]) {
    html += `
      <div class="singleEvent" style="background-color: ${event[i].color};"
      onclick="getEventsInfo(${i})">
      ${model.events[i].title}
      </div>`;
    }
  }
  return html;
}

// function test(){
//   let d = new Date(new Date().toLocaleDateString()+' '+ new Date().toLocaleTimeString())
//   console.log(d)
// }
// console.log(model.events[2].startDate.toJSON().split('T')[0])
// "2022-11-07" < "2022-11-08" => true

/* 


*/

//   if (model.events[i].startDate.toDateString() === model.inputs.calendar.currentDay.toDateString()) {
//       html += `
//         <div class="singleEvent" style="background-color: ${event[i].color};"
//         onclick="getEventsInfo(${i})">
//         ${model.events[i].title}
//         </div>`;
//     }