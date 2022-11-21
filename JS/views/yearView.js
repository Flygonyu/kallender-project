function yearView() {
    let html = "";
    html += `
      <div class="">
          <div class="modeButtonsContainer">
              <button class="modeButton " onclick="changeView('dayView')">D</button>
              <button class="modeButton " onclick="changeView('weekView')">W</button>
              <button class="modeButton" onclick="changeView('monthView')">M</button>
              <button class="modeButton chosenButton" onclick="changeView('yearView')">Y</button>
          </div>
      </div>
      <div class="dayPicker">
              <button onclick="previousDate(${1})" class="back">&lt</button>
              <div class="currentDaySeen">${model.inputs.calendar.currentDay.getFullYear()}</div>
              <button onclick="nextDate(${1})" class="next">&gt</button>
      </div>

      <div class="yearGrid">
      ${drawYearGrid()}
      </div>
      `;
    return html;
  }

function drawYearGrid(){
    let html = "";
        for (let i = 0; i < model.months.length; i++) {
          html += `<div>
                        <div class="monthHeader">${model.months[i]}</div>
                        <div class="monthContainer">${drawMonthGrid(i)}</div>
                    </div>`;
        }
        return html;
}

function drawMonthGrid(index){
    let html = "";
    let currentDay=model.inputs.calendar.currentDay;
    let firstDayOfTheMonth=getFirstDayOfEachMonth(currentDay.getFullYear(),index)
    let DaysThisMonth=firstDayOfTheMonth;
    let divsToAdd=firstDayOfTheMonth.getDay()==0?6:firstDayOfTheMonth.getDay()-1;
    html+=drawEmptyDivs(divsToAdd)
    for (let i = 0;i < getDaysCurrentMonth(firstDayOfTheMonth);i++) {
        html += `
            <div class="dayYearContainer">
                <div style="color:${weekendCheck(DaysThisMonth)}">${DaysThisMonth.getDate()}</div>
                <div>${drawHolidays(DaysThisMonth)}</div>
                <div>${getCurrentMonthEvents(DaysThisMonth)}</div>
            </div>
        `;
        DaysThisMonth=nextDay(DaysThisMonth);
    }
    return html;
}

function drawEmptyDivs(arrayLength){
    let html='';
    for (let i = 0; i < arrayLength; i++) {
        html+=` 
        <div class="dayYearContainer">
            <div></div>
            <div></div>
        </div>
    `;
    }
    return html;
}

function drawHolidays(day){
    let html='';
    for (let i = 0; i < model.holidays.length; i++) {
        if(model.holidays[i].date.toJSON().split("T")[0] == day.toJSON().split("T")[0]){
            html += `<div class="yearHoliday">${model.holidays[i].name}</div>`;
        }  
    }
    return html;
}
