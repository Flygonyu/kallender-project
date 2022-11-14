// model.inputs.calendar.currentDay = new Date();
// model.inputs.calendar.currentDay.setHours(0, 0, 0, 0);

function previousDate(skipDays){
    let currentDay=model.inputs.calendar.currentDay;
    currentDay.setDate(currentDay.getDate()-skipDays);
    currentDay=new Date(currentDay.setHours(+1));
    updateView();
}

function nextDate(skipDays){
    let currentDay=model.inputs.calendar.currentDay;
    currentDay.setDate(currentDay.getDate()+skipDays);
    currentDay=new Date(currentDay.setHours(+1));
    updateView();
}

//new Date(year,month,day,hour,minute)

// Date.prototype.getDayName = function() {
//     const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag'];
//     return dayNames[this.getDay()];
// }

//currentMonth = currentDay.setDate(currentDay.getMonth()); ?? 