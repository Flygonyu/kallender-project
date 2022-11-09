function addEvent() {
  let addEvent = model.inputs.calendar.editEvent;
  if (
    addEvent.title !== "" &&
    addEvent.startDate !== "" &&
    addEvent.endDate !== ""
  ) {
    disabled = '';
    let dateY=new Date(addEvent.startDate);
    let dateX = new Date(addEvent.endDate);
    let xEndDate = dateX.setHours(dateX.getHours() + 1);
    let yStartDate=dateY.setHours(dateY.getHours()+1);

    const event = {
      startDate: new Date(yStartDate),
      endDate: new Date(xEndDate),
      title: addEvent.title,
      description: addEvent.description,
      createdBy: model.app.currentUser,
      category: addEvent.category,
      color: addEvent.color,
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
    },5000)
  }
  
}

// 

function resetAddEventMoodle() {
  hiddenAdd = "hidden";
  model.inputs.calendar.editEvent.title = "";
  model.inputs.calendar.editEvent.description = "";
  model.inputs.calendar.editEvent.startDate = new Date();
  model.inputs.calendar.editEvent.endDate = new Date();
  updateView();
}

function closeInfo(){
  hiddenInfo = 'hidden';
  model.inputs.calendar.selectedEventId = null;
  chosenColor= 'orange';
  updateView();
}

function editEvent(){
  let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;

  let xEndDate;
  let yStartDate;

  if (
    editEvent.title !== "" &&
    editEvent.startDate !== "" &&
    editEvent.endDate !== ""
  ) {
  let dateY=new Date(editEvent.startDate);
  yStartDate=new Date(dateY.setHours(dateY.getHours()+1));


  let dateX = new Date(editEvent.endDate);
  xEndDate = new Date(dateX.setHours(dateX.getHours() + 1));

  
  model.events[selectedevent].title = editEvent.title;
  model.events[selectedevent].startDate = yStartDate;
  model.events[selectedevent].endDate = xEndDate;
  model.events[selectedevent].description = editEvent.description;
  model.events[selectedevent].category = editEvent.category;
  model.events[selectedevent].color = editEvent.color;
  hiddenEdit = 'hidden'
  }else console.log('feil')
  updateView();
}

function editMoodle(){
  hiddenEdit='';
  let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;
  editEvent.title=model.events[selectedevent].title;
  editEvent.category=model.events[selectedevent].category;
  editEvent.color=model.events[selectedevent].color;
  editEvent.description=model.events[selectedevent].description;
  editEvent.startDate=model.events[selectedevent].startDate;
  editEvent.endDate=model.events[selectedevent].endDate;
  updateView();
}

function closeEdit(){
  hiddenEdit='hidden';
  // model.inputs.calendar.selectedEventId=null;
  updateView();
}
