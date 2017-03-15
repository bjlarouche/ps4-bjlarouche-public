/* file: main.js
   author: Brandon LaRouche
   CSCI 2254 Web Application Development
   This is a simple web app for todo lists. It follows
   the TEA (The Elm Architecture) style.
type model = {
  state : list of records,
  props : {
    addTask : button,
    input : text field,
    tasks : list of something
    }
  }
  render : element * container element -> unit
  update : event * model -> model
  view   : model * cycle -> element
  app : {
          view   : model * (event -> unit) -> element,
          update : event * model -> model
        }
*/

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

var data = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')):{
  state: []
};

function loadData(model) {
  if (!data.state.length) return;

  for (var i = 0; i < data.state.length; i++) {
    var value = data.state[i];
    model.state.push(value);
  }
}

function updateData(model) {
  if (!model.state.length) {
    data.state = [];
    saveData();
    return;
  }


  data.state = [];

  for (var i = 0; i < model.state.length; i++) {
    var value = model.state[i];
    data.state.push(value);
  }

  saveData();
}

function saveData() {
  localStorage.setItem('todo', JSON.stringify(data));
}

// makeModel : unit -> model
//
let makeModel = function () {
  return {
    //state : [{task: 'Homework', status: 'todo', createdAt:"2017-3-14 22:20:00"}, {task: 'Laundry', status: 'completed', createdAt:"2017-3-13 11:15:30"}],
    state : [],
    props : {
      addTask : document.getElementById('addTask'),
      input :     document.getElementById('item'),
      container : document.getElementById('container')
    }
  };
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

// update : event * model -> model
//
let update = function(event, model) {
  console.log(event.target);
  if ((findAncestor(event.target, 'addTask')) || (event.target == model.props.addTask)) {    // Add task Event
    console.log("adding a task..");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    let newTask = {task: model.props.input.value, status: 'todo', createdAt:dateTime};
    model.props.input.value = '';
    model.state.push(newTask);
    }
  else if ((findAncestor(event.target, 'remove')) || (event.target.className == "remove")){                                          // Delete task Event
    let remove = event.target.closest('li');
    model.state.forEach(function(task) {
      if ((task.task === remove.innerText) && (task.status = remove.id)) {
        console.log("in delete area of update, removing ", task);
        let i = model.state.indexOf(task);
        model.state.splice(i, 1);
      }
    });
  }
  else if ((findAncestor(event.target, 'complete')) || (event.target.className == "complete")) {                                          // Delete task Event
    let complete = event.target.closest('li');
    model.state.forEach(function(task) {
      if ((task.task === complete.innerText) && (task.status = complete.id)) {
        console.log("in complete area of update, marking as completed ", task);
        if (task.status == "todo")
          task.status = "completed";
        else
          task.status = "todo";
      }
    });
  }
  console.log("leaving update with model.state= ", model.state);
  return model;
}

// view : model * (event -> unit) -> element
//
let view = function(model, listener, className) {
  let ul = document.createElement('ul');
  //ul.id = "todo";
  ul.className = 'todo';
  model.state.forEach(function (task) {
    let li = document.createElement('li');
    //li.addEventListener('click', listener);

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removing the item
    remove.addEventListener('click', listener);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click event for completing the item
    complete.addEventListener('click', listener);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    li.appendChild(buttons);

    li.appendChild(document.createTextNode(task.task));
    li.id = task.status;
    //hover title
    li.title = task.createdAt;
    ul.appendChild(li);
  });
  return ul;
}

// render : element * element -> unit
//
let render = function(element, container) {
  let tasks = document.getElementById("todo");
  let completed = document.getElementById("completed");
  if (tasks) {
    //container.removeChild(tasks);
    while (child = tasks.firstChild)
      tasks.removeChild(child);
    while (child = completed.firstChild)
      completed.removeChild(child);
  }
  while (child = element.firstChild) {
    if (child.id == "todo")
      tasks.appendChild(child);
    else
      completed.appendChild(child);
  }
  //tasks.appendChild(element);
  //container.appendChild(element);
}

// start : app -> unit
//
let start = function(app) {
  console.log("starting app..");

  let model = makeModel();
  loadData(model);

  let cycle = function (event) {
    model = app.update(event, model);

    let elementTodo = app.view(model, cycle, 'todo');
    let elementCompleted = app.view(model, cycle, 'completed');
    render(elementTodo, model.props.container);
    render(elementCompleted, model.props.container);

    updateData(model);
  }

  model.props.addTask.addEventListener('click', cycle);
  let elt = app.view(model, cycle, 'todo');
  render(elt, model.props.container);
}

let app = {
            view   : view,
            update : update
          };

start(app);
