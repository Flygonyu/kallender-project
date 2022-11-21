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
  let currentDay=model.inputs.calendar.currentDay;
  let firsdayofNovember=new Date(currentDay.getFullYear(),10,1,1,0,0);
  let diffDaysNov=7-firsdayofNovember.getDay()
  let xmas=new Date(currentDay.getFullYear(),11,24,1,0,0);
  let diffDaysDes=0-xmas.getDay();
  let sundayBeforeXmas=new Date(new Date(xmas.toISOString()).setDate(xmas.getDate()+diffDaysDes))
  
  let firstEasterDay=getFirstEaster(currentDay.getFullYear());
  model.holidays[0].date=new Date(currentDay.getFullYear(),0,1,1,0,0);
  model.holidays[7].date=firstEasterDay;
  model.holidays[3].date = new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()-7));
  model.holidays[4].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()-3));
  model.holidays[5].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()-2));
  model.holidays[6].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()-1));
  model.holidays[8].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()+1));
  model.holidays[2].date=new Date(currentDay.getFullYear(),2,8,1,0,0)
  model.holidays[1].date = new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()-49));
  model.holidays[9].date=new Date(currentDay.getFullYear(),4,1,1,0,0);
  model.holidays[10].date=new Date(currentDay.getFullYear(),4,17,1,0,0);
  model.holidays[11].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()+39));
  model.holidays[12].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()+48));
  model.holidays[13].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()+49));
  model.holidays[14].date=new Date(new Date(firstEasterDay.toISOString()).setDate(firstEasterDay.getDate()+50));
  model.holidays[15].date=new Date(currentDay.getFullYear(),5,23,1,0,0);
  model.holidays[16].date=new Date(firsdayofNovember.setDate(firsdayofNovember.getDate()+diffDaysNov));
  model.holidays[17].date=new Date(new Date(sundayBeforeXmas.toISOString()).setDate(sundayBeforeXmas.getDate()-21))
  model.holidays[18].date=new Date(new Date(sundayBeforeXmas.toISOString()).setDate(sundayBeforeXmas.getDate()-14))
  model.holidays[19].date=new Date(new Date(sundayBeforeXmas.toISOString()).setDate(sundayBeforeXmas.getDate()-7))
  model.holidays[20].date=sundayBeforeXmas;
  model.holidays[21].date=xmas;
  model.holidays[22].date=new Date(currentDay.getFullYear(),11,25,1,0,0);
  model.holidays[23].date=new Date(currentDay.getFullYear(),11,26,1,0,0);
  model.holidays[24].date=new Date(currentDay.getFullYear(),11,31,23,0,0);
}