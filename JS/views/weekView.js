function weekView(){
    let html = ``
    html+= `
    <div class="">
        <div class="modeButtonsContainer">
            <button class="modeButton " onclick="changeView('dayView')">D</button>
            <button class="modeButton chosenButton" onclick="changeView('weekView')">W</button>
            <button class="modeButton" onclick="changeView('dayView')">M</button>
            <button class="modeButton" onclick="changeView('dayView')">Y</button>
        </div>
    </div>
    <div class="dayPicker">
            <button onclick="previousDate(${7})" class="back">&lt</button>
            <div class="currentDaySeen">uke ${getWeek(model.inputs.calendar.currentDay)}</div>
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

function weekGridView(){
    let html='';
    let diffDaY=1-model.inputs.calendar.currentDay.getDay()
    let firstday=new Date(model.inputs.calendar.currentDay.setDate(model.inputs.calendar.currentDay.getDate()+diffDaY))
    let weekDates=firstday;
    firstday = new Date(firstday.setHours(+1))
    let week=0;
    for (let i = 1; i < model.dayNames.length; i++) {
        html+=`<div class="weekHeader">${model.dayNames[i]} ${weekDates.getDate()} </div>`;
        weekDates=new Date(weekDates.setDate(weekDates.getDate()+1));
    }
    html+=`<div class="weekHeader">${model.dayNames[0]} ${weekDates.getDate()}</div>`;
    while(week<7){
        html+=`<div class="weekDayContent" >${getCurrentDayEvents(firstday)}</div>`;
        firstday=new Date(firstday.setDate(firstday.getDate()+1));
      week++; 
    }
    return html;
}
// Se over. Mandag blir satt til 00:00 som gir forrige dag

function getCurrentDayEvents(day){
    let html='';
    // console.log(day.toJSON().split('T'))
    model.events.forEach((event,index)=>{
        if(event.startDate.toJSON().split('T')[0]<=day.toJSON().split('T')[0]&&
        event.endDate.toJSON().split('T')[0]>=day.toJSON().split('T')[0]){
            html+=`<div onclick="getEventsInfo(${index}) ${hiddenInfo=''}" style="background-color: ${event.color};">${event.title}</div>`
        }
    })
    return html
}