function splitDay(){
    model.inputs.calendar.splitDay = model.inputs.calendar.splitDay  !==true ? true : false;
    updateView()
}

