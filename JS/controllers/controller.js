function addEvent() {
  let addEvent = model.inputs.calendar.editEvent;
  
  if(addEvent.endDate<addEvent.startDate){
  errorMessage('Startdato må være tidligere enn sluttdato');
  return  
  }//Må vise feilmelding
  if (
    addEvent.title !== "" &&
    addEvent.startDate !== "" &&
    addEvent.endDate !== ""&&
    addEvent.color !== ""
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
    errorMessage('Du må minimum fylle ut tittel, farge, startdato og sluttdato')
  }
  
}

// 

function resetAddEventMoodle() {
  hiddenAdd = "hidden";
  disabled='';
  model.inputs.calendar.editEvent.title = "";
  model.inputs.calendar.editEvent.description = "";
  model.inputs.calendar.editEvent.color = "";
  model.inputs.calendar.editEvent.category = "Velg en kategori";
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
  if(editEvent.endDate<editEvent.startDate){
    errorMessage('Startdato må være tidligere enn sluttdato')
    return}
  let xEndDate;
  let yStartDate;

  if (
    editEvent.title !== "" &&
    editEvent.startDate !== "" &&
    editEvent.endDate !== ""&&
    editEvent.color !== ""
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
  }else errorMessage('Du må minimum fylle ut tittel, farge, startdato og sluttdato');
  updateView();
}

function editMoodle(){
  hiddenEdit='';
  let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;
  if(editEvent.category!=='annet'&&editEvent.category!==''){
    disabled='disabled';
  }
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

function chosenCategory(input){
  model.inputs.calendar.editEvent.category=input;
    if(input===''||input==='annet'){
      disabled='';
    }
    else if(input==='møte'){
      model.inputs.calendar.editEvent.color='#0D4C92';
      disabled='disabled';
    }
    else if(input==='ferie'){
      model.inputs.calendar.editEvent.color='#59C1BD';
      disabled='disabled';
    }
  updateView()
}

function deleteTask(){
  chosenColor='orange';
  model.events.splice(model.inputs.calendar.selectedEventId,1);
  model.inputs.calendar.selectedEventId=null;
  updateView();
}

function errorMessage(errmsg){
  errorMsg='moodle-error-msg'
    model.app.errmsg=errmsg
    updateView()
    setTimeout(function (){
        errorMsg='';
        updateView();
    },5000)
}