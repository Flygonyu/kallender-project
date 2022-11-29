function weekView() {
  let weeknr = model.inputs.calendar.currentDay;
  let html = ``;
  html += `
    <div class="">
        <div class="modeButtonsContainer">
            <button class="modeButton " onclick="changeView('dayView')">D</button>
            <button class="modeButton chosenButton" onclick="changeView('weekView')">W</button>
            <button class="modeButton" onclick="changeView('monthView')">M</button>
            <button class="modeButton" onclick="changeView('yearView')">Y</button>
        </div>
    </div>
    <div class="dayPicker">
            <button onclick="previousDate(${7})" class="back">&lt</button>
            <div class="currentDaySeen">uke ${getWeek(weeknr)}</div>
            <button onclick="nextDate(${7})" class="next">&gt</button>
    </div>
    <div class="currentMonthSeen">
            ${model.months[model.inputs.calendar.currentDay.getMonth()]} 
            ${model.inputs.calendar.currentDay.getFullYear()}
    </div>
    <button onclick="jumpToday()">Hopp til dagens dato</button>
    <div class="weekGrid">
    ${weekGridView()}
    </div>
        `;
  return html;
}

function weekGridView() {
  let html = "";
  let firstday = getMonday();
  for (let i = 1; i < model.dayNames.length + 1; i++) {
    let index = i == 7 ? 0 : i;
    html += `
                <div>
                    <div class="weekHeader" style="background-color:${weekendIndexCheck(index)}" onclick="jumpToDate('${firstday.toISOString()}')">
                    ${model.dayNames[index]} ${firstday.getDate()}</div>
                    <div class="weekDayContent">
                    <div class="weekHoliday">${drawHolidays(firstday)}</div>
                    ${getCurrentEvents(firstday)}</div>
                </div>
                `
    firstday = nextDay(firstday);
  }
  return html;
}
