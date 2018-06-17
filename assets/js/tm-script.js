(function(){
'use strict'

var originalLog = console.log
console.log=function(obj){
    originalLog(JSON.parse(JSON.stringify(obj)))
}

var button = document.querySelector('.input-container button');
var input = document.querySelector('.input-container input');
var database = window.localStorage;
var list = document.querySelector('.to-do-list');
var tasksArray = [];

button.addEventListener('click', init);
refreshTasks();

function init() {

  var task = input.value;
  var action = button.getAttribute('data-action');
  var tasks = database.getItem('tasks');

  if(action == 'add' && task != '') {

    input.value = '';
    var taskObject = {};
    taskObject.text = task;

    if(tasks == null) {
      pushToDB(taskObject);
    } else {
      getFromDB();
      pushToDB(taskObject);
    }
  }
  refreshTasks();
}

function pushToDB (taskObject) {
  tasksArray.push(taskObject);
  database.setItem('tasks', JSON.stringify(tasksArray));
}

function getFromDB() {
  var tasksJSON = database.getItem('tasks');
  tasksArray = JSON.parse(tasksJSON);
}

function refreshTasks(){

  if(database.getItem('tasks') != null) {
    getFromDB()

    list.innerHTML = '';
    tasksArray.forEach(function(task){
      list.innerHTML += `<li>${task.text}</li>`
    })
  }

}


}());
