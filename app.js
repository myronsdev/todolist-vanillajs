// define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

// load all events listeners
function loadEventListeners() {
  // load DOM
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear all events
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks event
  filter.addEventListener("keyup", filterTask);
}

// add Task
function addTask(e) {
  e.preventDefault();

  if (taskInput.value == "") {
    alert("add a task");
  }

  // create li element
  const li = document.createElement("li");

  // add class
  li.className = "collection-item";

  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link elementr
  const link = document.createElement("a");

  // add class
  link.className = "delete-item secondary-content";

  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append link to the li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // store locally
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";
}

// get tasks from local storage
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");

    // add class
    li.className = "collection-item";

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create new link elementr
    const link = document.createElement("a");

    // add class
    link.className = "delete-item secondary-content";

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append link to the li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task event function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear task function
function clearTasks() {
  // taskList.innerHTML = "";

  // loop is faster than innerHTML method
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from local storage
  clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter task
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
