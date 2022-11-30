function dayView() {
  let selectedevent = model.inputs.calendar.selectedEventId;
  let currentUser=model.users.map(user=>user.id).indexOf(model.app.currentUser);
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
      <div class="detailsDayOverView" style="background-color:${selectedevent!=null? model.events[selectedevent].color:model.inputs.calendar.chosenColor}">
      ${selectedevent != null ? 
        `<button class="delete ${hiddenOption=currentUser===model.users.map(user=>user.id).indexOf(model.events[selectedevent].createdBy)||
          model.users[currentUser].isAdmin||currentUser===null?
          '':'hidden'}" onclick="deleteTask()">🗑</button>
        <button class="submit ${hiddenOption=currentUser===model.users.map(user=>user.id).indexOf(model.events[selectedevent].createdBy)||
          model.users[currentUser].isAdmin||currentUser===null?
          '':'hidden'}" onclick="editMoodle()">✎</button>
        ${model.events[selectedevent].title}<br>
        ${model.events[selectedevent].category === null ? '' : `Kategori: ${model.events[selectedevent].category}`}
        ${moodleSetupLongEvent()}<br>
        <text>${model.events[selectedevent].description}</text><br>
        Lagt til av ${model.users[model.events[selectedevent].createdBy].username}
        `
          : ""}
        </div>
    </div>
    `;
  return html;
}

// function showEventsThatDay(hoursOfTheDay) {
//   let html = "";
//   let events = sortArrayAfterStartDate();
//   const currentDay = checksummertime(model.inputs.calendar.currentDay);
//   for (let i = 0; i < events.length; i++) {
//     const event = events[i];
//     if (areDatePartsEqual(event.startDate, event.endDate)) {
//       if (areDatePartsEqual(event.startDate, currentDay)) {
//         if (
//           (event.startDate.toLocaleTimeString("no-NO").slice(0,3) <=
//             hoursOfTheDay.toLocaleTimeString("no-NO").slice(0,3)&&
//           event.endDate.toLocaleTimeString("no-NO").slice(0,3) >=
//             hoursOfTheDay.toLocaleTimeString("no-NO").slice(0,3)
//         )) {
//           html += `
//             <div class="singleEvent" style="background-color: ${event.color};"
//             onclick="getEventsInfo(${event.id})">
//             ${event.title}
//             </div>`;
//         }
//       }
//     }
//   }
//   return html;
// }

function showEventsThatDay(hoursOfTheDay) {
  let html = "";
  let events = sortArrayAfterStartDate();
  const currentDay = checksummertime(model.inputs.calendar.currentDay);
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (areDatePartsEqual(event.startDate, event.endDate)) {
      if (areDatePartsEqual(event.startDate, currentDay)) {
        if (
          (event.startDate.toJSON().slice(11,13) <=
            hoursOfTheDay.toJSON().slice(11,13)&&
          event.endDate.toJSON().slice(11,13) >=
            hoursOfTheDay.toJSON().slice(11,13)
        )) {
          html += `
            <div class="singleEvent" style="background-color: ${event.color};"
            onclick="getEventsInfo(${event.id})">
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
  const currentDay = checksummertime(model.inputs.calendar.currentDay);
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
            onclick="getEventsInfo(${event.id})">
            ${event.title}
           </div>`;
      }
    }
  }
  return html;
}

function drawHours() {
  let hoursOfTheDay = model.inputs.calendar.currentDay.setHours(0,0,0);
  hoursOfTheDay=new Date(hoursOfTheDay)
  hoursOfTheDay = summerTime(hoursOfTheDay);
  let html = "";
  for (let i = 0; i < 24; i++) {
    html += `<div class="hour">${timeOnly(hoursOfTheDay)}</div>
    <div class="eventsHours">${showEventsThatDay(hoursOfTheDay)}</div>`;
    hoursOfTheDay = new Date(hoursOfTheDay.setHours(hoursOfTheDay.getHours()+1));
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