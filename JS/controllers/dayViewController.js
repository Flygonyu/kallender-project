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
