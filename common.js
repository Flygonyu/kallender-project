function getDaysCurrentMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function getFirstDayInCurrentMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1,1,0,0);
  }
function diffToFirstDayInMonth(date,spearDays){
    return new Date(date.setDate(date.getDate()-spearDays));
}
function getFirstDayOfEachMonth(year, month){
  return new Date(year,month,1,1,0,0);
}

function getWeek(date) {
  date.setHours(1, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

function changeView(screen) {
  model.app.currentPage = screen;
  model.inputs.calendar.selectedEventId = null;
  updateView();
}

function getMonday() {
  const currentDay = model.inputs.calendar.currentDay;
  let diffMonday = 1 - currentDay.getDay();
  let dayNoMonday = currentDay.getDate() + diffMonday;
  return new Date(currentDay.setDate(dayNoMonday));
}

function nextDay(currentDay) {
  return new Date(currentDay.setDate(currentDay.getDate() + 1));
}

function weekendCheck(currentDay) {
    let dayColor = 'gray'
    if (currentDay.getDay() == 0 || currentDay.getDay() == 6){
        dayColor= 'rgb(255, 145, 0)'
    }
    return dayColor;
}

function weekendIndexCheck(currentDay) {
    let dayColor = 'gray'
    if (currentDay == 0 || currentDay == 6){
        dayColor= 'rgb(255, 145, 0)'
    }
    return dayColor;
}

function sortArrayAfterStartDate(){
  return model.events.slice().sort((a,b)=>a.startDate-b.startDate)
}