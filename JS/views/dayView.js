let chosenColor= 'orange';

function dayView() {
  
  let html = "";
  html += `
    <div class="dayViewTop">
        <div class="modeButtonsContainer">
            <button class="modeButton dayButton">D</button>
            <button class="modeButton">W</button>
            <button class="modeButton">M</button>
            <button class="modeButton">Y</button>
        </div>
        <button class="splitDayButton">Del dag</button>
        <div class="dayPicker">
            <button onclick="previousDate()" class="back">&lt</button>
            <div class="currentDaySeen">${model.inputs.calendar.currentDay.toDateString()}</div>
            <button onclick="nextDate()" class="next">&gt</button>
        </div>
            <div class="currentMonthSeen">
            ${model.months[model.inputs.calendar.currentDay.getMonth()]} 
            ${model.inputs.calendar.currentDay.getFullYear()}
            </div>
    </div>
    <div class="dayOverView">
        ${showEventsThatDay()}
    </div>

    <div class="detailsDayOverView" style="background-color:${chosenColor}">
        ${model.inputs.calendar.selectedEventId!=null?`
        ${model.events[model.inputs.calendar.selectedEventId].title}<br>
        ${model.events[model.inputs.calendar.selectedEventId].startDate}
        ${model.events[model.inputs.calendar.selectedEventId].endDate}
        ${model.events[model.inputs.calendar.selectedEventId].description}
        `:''}
    </div>
    `;
  return html;
}

let toggle=1;
function getEventsInfo(index) {
    // if(toggle==1){
       model.inputs.calendar.selectedEventId=index;
       chosenColor = model.events[model.inputs.calendar.selectedEventId].color
    //    toggle-=1; 
    // }
    // else{
    //     model.inputs.calendar.selectedEventId=null;
    //     toggle+=1;
    // }
    
    updateView();
}

function showEventsThatDay() {
  let html = "";
  let event = model.events;

// console.log(model.events[0].startDate.toDateString())
console.log(typeof model.inputs.calendar.currentDay.toJSON().split("T")[0])

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


//   if (model.events[i].startDate.toDateString() === model.inputs.calendar.currentDay.toDateString()) {
//       html += `
//         <div class="singleEvent" style="background-color: ${event[i].color};"
//         onclick="getEventsInfo(${i})">
//         ${model.events[i].title}
//         </div>`;
//     }