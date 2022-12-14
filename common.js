function getDaysCurrentMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function getFirstDayInCurrentMonth(date) {
  let firstDay;
  if(date>=getLastSundayInMarch()||date<=getLastSundayInOctober()){
    firstDay=new Date(date.getFullYear(), date.getMonth(), 1,2,0,0)
  }
  else{
    firstDay=new Date(date.getFullYear(), date.getMonth(), 1,1,0,0)
  }
    return firstDay;
  }
function diffToFirstDayInMonth(date,spearDays){
    return new Date(date.setDate(date.getDate()-spearDays));
}
function getFirstDayOfEachMonth(year, month){
  let firstDay=new Date(year,month,1,1,0,0);
  if(firstDay>=getLastSundayInMarch()||firstDay<=getLastSundayInOctober()){
    firstDay=new Date(year,month,1,2,0,0)
  }
  else{
    firstDay=new Date(year,month,1,1,0,0)
  }
    return firstDay;
}

function checksummertime(date){
  let summerdate=date;
  if(summerdate>=getLastSundayInMarch()&&summerdate<=getLastSundayInOctober()){
    summerdate.setHours(2);
  }
  else{
    summerdate.setHours(1);
  }
  return summerdate;
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
  model.inputs.calendar.chosenColor = 'orange';
  hiddenMenu='hidden';
  hiddenInfo = 'hidden';
  updateView();
}

function getMonday() {
  const currentDay = model.inputs.calendar.currentDay;
  let diffMonday = 1 - currentDay.getDay();
  let dayNoMonday = currentDay.getDate() + diffMonday;
  let monday=new Date(currentDay.setDate(dayNoMonday))
  if(monday>=getLastSundayInMarch()||monday<=getLastSundayInOctober()){
    monday.setHours(2)
  }
  else{
    monday.setHours(1)
  }
    return monday;
}

function nextDay(currentDay) {
  return new Date(currentDay.setDate(currentDay.getDate() + 1));
}

function weekendCheck(currentDay) {
    let dayColor = '#425483'
    if (currentDay.getDay() == 0 || currentDay.getDay() == 6){
        dayColor= 'rgb(255, 145, 0)'
    }
    return dayColor;
}

function weekendIndexCheck(currentDay) {
    let dayColor = '#425483'
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
  // Mark the date of that full moon???the "Paschal" full moon.
  date.setMonth( m, d );
  // Count forward the number of days until the following Sunday (Easter).
  date.setMonth( m, d + ( 7 - date.getDay() ) );
  // Gregorian Western Easter Sunday
  return date;
}

getHolidays()
function getHolidays(){
    model.holidays=[].concat(createHolidaysEasterAndBefore(), createHolidaysAfterEaster());
}

function createHolidaysEasterAndBefore(){
  let currentDay = model.inputs.calendar.currentDay;
  let firstEasterDay = getFirstEaster(currentDay.getFullYear());
  return [
      holidayObj(specificDate(1,1), "Nytt??rsdag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,-49), "Fastelavnss??ndag"),
      holidayObj(specificDate(8,3),'Den internasjonale kvinnedagen'),
      holidayObj(dateFromDateAndDays(firstEasterDay,-7),"Palmes??ndag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,-3),"Skj??rtorsdag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,-2),"Langfredag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,-1),"P??skeaften"),
      holidayObj(firstEasterDay,"1. p??skedag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,1),"2. p??skedag"),
      holidayObj(specificDate(1,5),"Arbeidernes dag"),
      holidayObj(specificDate(17,5),"Grunnlovsdagen"),
      holidayObj(dateFromDateAndDays(firstEasterDay,39),"Kristi himmelfartsdag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,48),"Pinseaften"),
      holidayObj(dateFromDateAndDays(firstEasterDay,49),"1. pinsedag"),
      holidayObj(dateFromDateAndDays(firstEasterDay,50),"2. pinsedag"),
    ];
    
}

function createHolidaysAfterEaster(){
  let xmas = specificDate(24,12);
  let diffDaysDes = 0-xmas.getDay();
  let sundayBeforeXmas = dateFromDateAndDays(xmas,diffDaysDes);
  let firstdayofNovember = specificDate(1,11);
  let diffDaysNov = 7-firstdayofNovember.getDay()
  return [
    holidayObj(specificDate(23,6), "Sankthansaften"),
    holidayObj(dateFromDateAndDays(firstdayofNovember,diffDaysNov), "Allehelgensdag"),
    holidayObj(dateFromDateAndDays(sundayBeforeXmas,-21), "1. s??ndag i advent"),
    holidayObj(dateFromDateAndDays(sundayBeforeXmas,-14), "2. s??ndag i advent"),
    holidayObj(dateFromDateAndDays(sundayBeforeXmas,-7), "3. s??ndag i advent"),
    holidayObj(sundayBeforeXmas, "4. s??ndag i advent"),
    holidayObj(xmas, "Julaften"),
    holidayObj(specificDate(25,12), "1. juledag"),
    holidayObj(specificDate(26,12), "2. juledag"),
    holidayObj(specificDate(31,12), "Nytt??rsaften"),
  ]
}

function holidayObj(date, name){
  return {date, name};
}

function dateFromDateAndDays(date,days){
  let newDate=new Date(new Date(date.toISOString()).setDate(date.getDate()+days));
  if(newDate>=getLastSundayInMarch()||newDate<=getLastSundayInOctober()){
    newDate.setHours(2);
  }
  else{
    newDate.setHours(1);
  }
  return newDate;
}

function specificDate(day, month){
  let newDate=new Date(currentYear(), month - 1, day, 1, 0, 0);
  if(newDate>=getLastSundayInMarch()||newDate<=getLastSundayInOctober()){
    newDate=new Date(currentYear(), month - 1, day, 2, 0, 0);
  }
  return newDate;
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

function areDatePartsEqual(date1, date2){
  return dateOnly(date1) == dateOnly(date2)
}

function dateOnly(date){
  return date.toJSON().split("T")[0];
}

function timeOnly(date){
  return date.toJSON().split('T')[1].slice(0,5);
}

function getEventsInfo(id) {
  model.inputs.calendar.selectedEventId = model.events.map(event=>event.id).indexOf(id);
  model.inputs.calendar.chosenColor = model.events[model.inputs.calendar.selectedEventId].color;
  updateView();
}

function previousDate(skipDays){
  let currentDay=model.inputs.calendar.currentDay;
  if(model.app.currentPage==='monthView'){
      currentDay.setMonth(currentDay.getMonth()-skipDays);
  }
  else if(model.app.currentPage==='yearView'){
      currentDay.setFullYear(currentDay.getFullYear()-skipDays);
  }
  else{
      currentDay.setDate(currentDay.getDate()-skipDays);
  }
  if (model.inputs.calendar.currentYear !== currentDay.getFullYear()){
      getHolidays();
      model.inputs.calendar.currentYear = currentDay.getFullYear();
  }
  updateView();
}

function nextDate(skipDays){
  let currentDay=model.inputs.calendar.currentDay;
  if(model.app.currentPage==='monthView'){
      currentDay.setMonth(currentDay.getMonth()+skipDays);
  }
  else if(model.app.currentPage==='yearView'){
      currentDay.setFullYear(currentDay.getFullYear()+skipDays);
  }
  else{
      currentDay.setDate(currentDay.getDate()+skipDays);
  }
  if (model.inputs.calendar.currentYear !== currentDay.getFullYear()){
      getHolidays();
      model.inputs.calendar.currentYear = currentDay.getFullYear();
  }
  updateView();
}

function jumpToDate(day){
  model.inputs.calendar.currentDay=new Date(day)
  model.app.currentPage = 'dayView'
  updateView();
}

function getLastSundayInMarch(){
  let lastSundayInMarch=new Date(model.inputs.calendar.currentYear,2,31,1,0,0);
  if(lastSundayInMarch.getDay()>0){
    lastSundayInMarch.setDate(lastSundayInMarch.getDate()-lastSundayInMarch.getDay())
  }
  return lastSundayInMarch;
}

function getLastSundayInOctober(){
  let lastSundayInOctober=new Date(model.inputs.calendar.currentYear,9,31,1,0,0);
  if(lastSundayInOctober.getDay()>0){
    lastSundayInOctober.setDate(lastSundayInOctober.getDate()-lastSundayInOctober.getDay())
  }
  return lastSundayInOctober;
}

function summerTime(date){
  let summerdate=date;
  if(summerdate>=getLastSundayInMarch()&&summerdate<=getLastSundayInOctober()){
    summerdate.setHours(date.getHours()+2);
  }
  else{
    summerdate.setHours(date.getHours()+1);
  }
  return summerdate;
}

function reverseDate(date){
  let reversed;
  reversed=date.toJSON().slice(0,10).split('-').reverse().join('.')
  return reversed;
}

function getDayTimeDiffrence(date){
  let newDate=date;
  newDate=new Date(newDate.toJSON().slice(0,10));
  return newDate.getDay();
}