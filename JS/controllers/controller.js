function addEvent() {
  let addEvent = model.inputs.calendar.editEvent;
  let currentUser=model.users.map(user=>user.id).indexOf(model.app.currentUser);
  if(addEvent.endDate<addEvent.startDate){
  errorMessage('Startdato må være tidligere enn sluttdato');
  return  
  }
  if (
    addEvent.title !== "" &&
    addEvent.startDate !== "" &&
    addEvent.endDate !== ""&&
    addEvent.color !== ""
  ) {
      
      let dateY=new Date(addEvent.startDate);
      let dateX = new Date(addEvent.endDate);
      let xEndDate = dateX.setHours(dateX.getHours() + 1);
      let yStartDate = dateY.setHours(dateY.getHours() + 1);
      let categorie=addEvent.category==="Velg en kategori"?'':addEvent.category

      const event = {
        id:model.events.length+1,
        startDate: new Date(yStartDate),
        endDate: new Date(xEndDate),
        title: addEvent.title,
        description: addEvent.description,
        createdBy: model.users[currentUser].username,
        category: categorie,
        color: addEvent.color,
      };
      model.events.push(event);
      resetAddEventMoodle();
  }
  else{
    errorMessage('Du må minimum fylle ut tittel, kategori, startdato og sluttdato')
  }
  
}

// 

function resetAddEventMoodle() {
  let editEvent = model.inputs.calendar.editEvent;
  hiddenAdd = "hidden";
  disabled='disabled';
  editEvent.title = "";
  editEvent.description = "";
  editEvent.color = "";
  editEvent.category = "Velg en kategori";
  editEvent.startDate = new Date();
  editEvent.endDate = new Date();
  updateView();
}

function closeInfo(){
  hiddenInfo = 'hidden';
  model.inputs.calendar.selectedEventId = null;
  model.inputs.calendar.chosenColor = 'orange';
  updateView();
}

function editEvent(){
  let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;
  if(editEvent.endDate<editEvent.startDate){
    errorMessage('Startdato må være tidligere enn sluttdato')
    return}

  if (
    editEvent.title !== "" &&
    editEvent.startDate !== "" &&
    editEvent.endDate !== ""&&
    editEvent.color !== ""
  ) {
      let dateY=new Date(editEvent.startDate);
      let dateX = new Date(editEvent.endDate);
      let xEndDate = dateX.setHours(dateX.getHours() + 1);
      let yStartDate = dateY.setHours(dateY.getHours() + 1);
      
      model.events[selectedevent].title = editEvent.title;
      model.events[selectedevent].startDate = new Date(yStartDate);
      model.events[selectedevent].endDate = new Date(xEndDate);
      model.events[selectedevent].description = editEvent.description;
      model.events[selectedevent].category = editEvent.category;
      model.events[selectedevent].color = editEvent.color;
      hiddenEdit = 'hidden'
  } else errorMessage('Du må minimum fylle ut tittel, kategori, startdato og sluttdato');
  updateView();
}

function editMoodle(){
  hiddenEdit='';
  let editEvent = model.inputs.calendar.editEvent;
  let selectedevent=model.inputs.calendar.selectedEventId;
  editEvent.category=model.events[selectedevent].category;
  if(editEvent.category=='annet'||editEvent.category==''){
    disabled='';
  }
  editEvent.title=model.events[selectedevent].title;
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
  console.log(input)
    if(input==='annet'){
      model.inputs.calendar.editEvent.color='#975C8D';
      disabled='';
    }
    else if(input==='møte'){
      model.inputs.calendar.editEvent.color='#1371d8';
      disabled='disabled';
    }
    else if(input==='ferie'){
      model.inputs.calendar.editEvent.color='#6fc86c';
      disabled='disabled';
    }
  updateView()
}

function deleteTask(){
  model.inputs.calendar.chosenColor ='orange';
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

function signOutUser(){
  model.app.currentUser = 0;
  updateView();
}

