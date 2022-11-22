function dayView() {
  let selectedevent = model.inputs.calendar.selectedEventId;
  let currentDay = model.inputs.calendar.currentDay;
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
        <button class="splitDayButton" onclick="splitDay()">Del dag</button>
        <div class="dayPicker">
            <button onclick="previousDate(${1})" class="back">&lt</button>
            <div class="currentDaySeen" style="color:${weekendCheck(currentDay)}">
            ${model.dayNames[currentDay.getDay()]} 
            ${currentDay.getDate()}</div>
            <button onclick="nextDate(${1})" class="next">&gt</button>
        </div>
        <div class="currentMonthSeen">
            ${model.months[currentDay.getMonth()]} 
            ${currentDay.getFullYear()}
        </div>
        <button onclick="jumpToday()">Hopp til dagens dato</button>
    <div class="mainDayView">
      <div class="dayOverView">
      <div class="dayHoliday">${drawHolidays(currentDay)}</div>
      ${model.inputs.calendar.splitDay ? 
      `<div class="split">  
        <div class="hourGrid">
          ${drawSplitHours(1,13)}
        </div>
        <div class="hourGrid">
          ${drawSplitHours(13,25)}
        </div>
      </div>` 
      : `<div class="hourGrid">
          ${drawHours()}
        </div> `}
      
      <div class="multipleDayEvents">${eventsOverMultipleDays()}</div>
    </div>
      <div class="detailsDayOverView" style="background-color:${model.inputs.calendar.chosenColor}">
      ${selectedevent != null ? 
        `<button class="delete" onclick="deleteTask()">🗑</button>
        <button class="submit" onclick="editMoodle()">✎</button>
        ${model.events[selectedevent].title}<br>
        ${moodleSetupLongEvent()}
        ${model.events[selectedevent].description}<br>
        Lagt til av ${model.events[selectedevent].createdBy}
        `
          : ""}
        </div>
    </div>
    `;
  return html;
}

function showEventsThatDay(hoursOfTheDay) {
  let html = "";
  let events = model.events;
  const currentDay = model.inputs.calendar.currentDay;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (areDatePartsEqual(event.startDate, event.endDate)) {
      if (areDatePartsEqual(event.startDate, currentDay)) {
        if (
          event.startDate.toLocaleTimeString("no-NO") <=
            hoursOfTheDay.toLocaleTimeString("no-NO") &&
          event.endDate.toLocaleTimeString("no-NO") >=
            hoursOfTheDay.toLocaleTimeString("no-NO")
        ) {
          html += `
            <div class="singleEvent" style="background-color: ${event.color};"
            onclick="getEventsInfo(${i})">
            ${event.title}
            </div>`;
        }
      }
    }
  }
  return html;
}

function eventsOverMultipleDays() {
  let html = "";
  const currentDay = model.inputs.calendar.currentDay;
  let events = model.events;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (dateOnly(event.startDate) != dateOnly(event.endDate)) {
      if (
        dateOnly(event.startDate) <= dateOnly(currentDay) 
        &&
        dateOnly(event.endDate) >= dateOnly(currentDay)
      ) {
         html += `
           <div class="singleEvent" style="background-color: ${event.color};"
            onclick="getEventsInfo(${i})">
            ${event.title}
           </div>`;
      }
    }
  }
  return html;
}

function drawHours() {
  let hoursOfTheDay = new Date().setHours(0, 0, 0);
  hoursOfTheDay = new Date(hoursOfTheDay);
  let html = "";
  for (let i = 1; i < 25; i++) {
    hoursOfTheDay = new Date(hoursOfTheDay.setHours(i));
    html += `<div class="hour">${timeOnly(hoursOfTheDay)}</div>
      <div class="eventsHours">${showEventsThatDay(hoursOfTheDay)}</div>`;
  }
  return html;
}

function drawSplitHours(from, to) {
  let hoursOfTheDay = new Date().setHours(0, 0, 0);
  hoursOfTheDay = new Date(hoursOfTheDay);
  let html = "";
  for (let i = from; i < to; i++) {
    hoursOfTheDay = new Date(hoursOfTheDay.setHours(i));
    html += `<div class="hour">${timeOnly(hoursOfTheDay)}</div>
      <div class="eventsHours">${showEventsThatDay(hoursOfTheDay)}</div>`;
  }
  return html;
}