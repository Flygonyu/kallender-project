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
    <div class="weekGrid">
    ${weekGridView()}
    </div>
        `;
  return html;
}

function getCurrentDayEvents(day) {
  let html = "";
  // let sortedEvents=sortArrayAfterStartDate()
  model.events.forEach((event, index) => {
    if (
      event.startDate.toJSON().split("T")[0] <= day.toJSON().split("T")[0] &&
      event.endDate.toJSON().split("T")[0] >= day.toJSON().split("T")[0]
    ) {
      html += `<div onclick="getEventsInfo(${index}) ${(hiddenInfo =
        "")}" style="background-color: ${event.color};">${event.title}</div>`;
    }
  });
  return html;
}

function weekGridView() {
  let html = "";
  let firstday = getMonday();
  
  for (let i = 1; i < model.dayNames.length + 1; i++) {
    let index = i == 7 ? 0 : i;
    html += `
                <div>
                    <div class="weekHeader" style="background-color:${weekendIndexCheck(index)}">${
                      model.dayNames[index]
                    } ${firstday.getDate()}</div>
                    <div>${drawHolidays(firstday)}</div>
                    <div class="weekDayContent">${getCurrentDayEvents(
                      firstday
                    )}</div>
                </div>
                `
    firstday = nextDay(firstday);
  }
  return html;
}
