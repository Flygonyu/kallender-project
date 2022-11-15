function monthView() {
  let html = "";
  html += `
    <div class="">
        <div class="modeButtonsContainer">
            <button class="modeButton " onclick="changeView('dayView')">D</button>
            <button class="modeButton " onclick="changeView('weekView')">W</button>
            <button class="modeButton chosenButton" onclick="changeView('monthView')">M</button>
            <button class="modeButton" onclick="changeView('yearView')">Y</button>
        </div>
    </div>
    <div class="dayPicker">
            <button onclick="previousDate(${1})" class="back">&lt</button>
            <div class="currentDaySeen">${
              model.months[model.inputs.calendar.currentDay.getMonth()]
            }</div>
            <button onclick="nextDate(${1})" class="next">&gt</button>
    </div>
    <div class="currentMonthSeen"> 
            ${model.inputs.calendar.currentDay.getFullYear()}
    </div>
    <div class="monthWeekGrid">
        ${drawWeekGrid()}
    </div>
    <div class="monthGrid">
        ${drawMonthView()}
    </div>
    `;
  return html;
}

function drawMonthView() {
  let html = "";
  let currentDay=model.inputs.calendar.currentDay
  let firstDayInMonth=getFirstDayInCurrentMonth(currentDay);
  let divsToAdd=firstDayInMonth.getDay()==0?6:firstDayInMonth.getDay()-1;
  let mondayStart = diffToFirstDayInMonth(firstDayInMonth,divsToAdd);
  for (let i = -divsToAdd;i < getDaysCurrentMonth(currentDay);i++) {
    html += `
            <div class="dayContainer">
                <div style="color:${weekendCheck(mondayStart)}">${mondayStart.getDate()}</div>
                <div>${getCurrentDayEvents(mondayStart)}</div>
            </div>
        `;
        mondayStart=nextDay(mondayStart);
  }
  return html;
}

function drawWeekGrid() {

  let html = "";
  for (let i = 1; i < model.dayNames.length + 1; i++) {
    let index = i == 7 ? 0 : i;
    html += `<div class="weekHeader" style="background-color:${weekendIndexCheck(index)}">${model.dayNames[index]}</div>`;
  }
  return html;
}

// function addEmptyDivs(){
//     let html='';
//     html=`
//     <div class="dayContainer">
//         <div></div>
//         <div></div>
//     </div> 
//     `;
//     return html
// }

