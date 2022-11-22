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
  chosenColor='orange'
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

function getFirstEaster( y ) {
  let date, a, b, c, m, d;
  // Instantiate the date object.
  date = new Date;
  // Set the timestamp to midnight.
  date.setHours( 2, 0, 0, 0 );
  // Set the year.
  date.setFullYear( y );
  // Find the golden number.
  a = y % 19;
  // Choose which version of the algorithm to use based on the given year.
  b = ( 2200 <= y && y <= 2299 ) ?
      ( ( 11 * a ) + 4 ) % 30 :
      ( ( 11 * a ) + 5 ) % 30;
  // Determine whether or not to compensate for the previous step.
  c = ( ( b === 0 ) || ( b === 1 && a > 10 ) ) ?
      ( b + 1 ) :
      b;
  // Use c first to find the month: April or March.
  m = ( 1 <= c && c <= 19 ) ? 3 : 2;
  // Then use c to find the full moon after the northward equinox.
  d = ( 50 - c ) % 31;
  // Mark the date of that full moon—the "Paschal" full moon.
  date.setMonth( m, d );
  // Count forward the number of days until the following Sunday (Easter).
  date.setMonth( m, d + ( 7 - date.getDay() ) );
  // Gregorian Western Easter Sunday
  return date;
}

getHolidays()
function getHolidays(){
  let currentDay = model.inputs.calendar.currentDay;
  let firstdayofNovember = specificDate(1,11);
  let diffDaysNov = 7-firstdayofNovember.getDay()
  let xmas = specificDate(24,12);
  let diffDaysDes = 0-xmas.getDay();
  let sundayBeforeXmas = dateFromDateAndDays(xmas,diffDaysDes);
  let firstEasterDay = getFirstEaster(currentDay.getFullYear());
  let easterHolidays = createHolidaysEasterAndBefore();
  let otherHolidays = createHolidaysAfterEaster();
  model.holidays = [].concat(easterHolidays, otherHolidays);
}

function createHolidaysEasterAndBefore(){
    return [
        holidayObj(specificDate(1,1), "Nyttårsdag"),
        holidayObj(dateFromDateAndDays(firstEasterDay,-49), "Fastelavnssøndag"),
      ];
}
function createHolidaysAfterEaster(){

}


function holidayObj(date, name){
    return {date, name};
    // return {date: date, name: name};
}

function dateFromDateAndDays(date,days){
  return new Date(new Date(date.toISOString()).setDate(date.getDate()+days))
}

function specificDate(day, month){
  return new Date(currentYear(), month - 1, day, 1, 0, 0);
}

function currentYear(){
  let currentDay = model.inputs.calendar.currentDay;
  return currentDay.getFullYear();
}

function jumpToday(){
  model.inputs.calendar.currentDay = new Date();
  if (model.inputs.calendar.currentYear !== model.inputs.calendar.currentDay.getFullYear()){
    getHolidays();
  }
  updateView();
}