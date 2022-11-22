function drawHolidays(day){
    const holidays = model.holidays;
    let html='';
    for (let i = 0; i < holidays.length; i++) {
        const holiday = holidays[i];
        if(areDatePartsEqual(holiday.date,day)){
            html += `<div>${model.holidays[i].name}</div>`;
        }  
    }
    return html;
}

function getCurrentEvents(day) {
    let html = "";
    model.events.forEach((event, index) => {
      if (
        dateOnly(event.startDate) <= dateOnly(day) &&
        dateOnly(event.endDate) >= dateOnly(day)
      ) {
        html += `<div onclick="getEventsInfo(${index}) ${(hiddenInfo = "")}" 
                  style="background-color: ${event.color};">${event.title}
                  </div>`;
      }
    });
    return html;
  }