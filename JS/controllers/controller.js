function addEvent() {
  let addEvent = model.inputs.calendar.editEvent;
  if (
    addEvent.title !== "" &&
    addEvent.startDate !== "" &&
    addEvent.endDate !== ""
  ) {
    disabled = '';
    console.log(typeof addEvent.startDate);
    const event = {
      startDate: new Date(model.inputs.calendar.editEvent.startDate),
      endDate: new Date(model.inputs.calendar.editEvent.endDate),
      title: model.inputs.calendar.editEvent.title,
      description: model.inputs.calendar.editEvent.description,
      createdBy: model.app.currentUser,
      category: model.inputs.calendar.editEvent.category,
      color: model.inputs.calendar.editEvent.color,
    };
    model.events.push(event);
    resetAddEventMoodle();
  }
  else{
    errorMsg='moodle-error-msg'
    updateView()
    setTimeout(function (){
        errorMsg='';
        updateView();
    },3000)
  }
  
}

function resetAddEventMoodle() {
  hidden = "hidden";
  model.inputs.calendar.editEvent.title = "";
  model.inputs.calendar.editEvent.description = "";
  model.inputs.calendar.editEvent.startDate = new Date();
  model.inputs.calendar.editEvent.endDate = new Date();
  updateView();
}
