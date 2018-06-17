(function(){
'use strict'

// var originalLog = console.log
// console.log=function(obj){
//     originalLog(JSON.parse(JSON.stringify(obj)))
// }

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
      tasksArray.push(taskObject);
      pushToDB();

    } else {
      getFromDB();
      tasksArray.push(taskObject);
      pushToDB();
    }
  }
  refreshTasks();
}

function pushToDB () {
  database.setItem('tasks', JSON.stringify(tasksArray));
}

function getFromDB() {
  var tasksJSON = database.getItem('tasks');
  tasksArray = JSON.parse(tasksJSON);
}

function refreshTasks(){

  if(database.getItem('tasks') != null) {
    getFromDB();

    list.innerHTML = '';
    tasksArray.forEach(function(task, index){
      list.innerHTML += `<li item-index="${index}">${task.text} <button>X</button></li>`;
      var removeButton = document.querySelector('.to-do-list li button');
    })

    addListeners();
  }

}

function addListeners() {
  var deleteButtons = document.querySelectorAll('.to-do-list li button');

  deleteButtons.forEach(function(removeButton){
    removeButton.addEventListener('click', remove);
  })

}

function remove() {
  var removeIndex = this.parentNode.getAttribute('item-index');
  getFromDB();
  tasksArray.splice(removeIndex, 1);
  pushToDB();
  refreshTasks();
}


}());
