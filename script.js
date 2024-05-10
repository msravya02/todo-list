document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const clearAllBtn = document.getElementById("clearAll");
  
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    
    function displayTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
          <span id="task-${index}" class="${task.completed ? 'completed' : ''}">${task.name}</span>
          <button class="btn btn-sm btn-danger float-right delete">Delete</button>
          <button class="btn btn-sm btn-info float-right edit mr-2">Edit</button>
          <input type="checkbox" class="float-right mt-1 mark-as-completed" ${task.completed ? 'checked' : ''}>
        `;
        taskList.appendChild(li);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    
    addTaskBtn.addEventListener("click", function() {
      const taskName = taskInput.value.trim();
      if (taskName !== "") {
        tasks.push({ name: taskName, completed: false });
        displayTasks();
        taskInput.value = "";
      }
    });
  
    
    taskList.addEventListener("change", function(e) {
      if (e.target.classList.contains("mark-as-completed")) {
        const index = e.target.parentElement.querySelector("span").id.split("-")[1];
        tasks[index].completed = e.target.checked;
        displayTasks();
      }
    });
  
    
    taskList.addEventListener("click", function(e) {
      if (e.target.classList.contains("delete")) {
        const index = e.target.parentElement.querySelector("span").id.split("-")[1];
        tasks.splice(index, 1);
        displayTasks();
      }
    });
  
    
    taskList.addEventListener("click", function(e) {
      if (e.target.classList.contains("edit")) {
        const index = e.target.parentElement.querySelector("span").id.split("-")[1];
        const newName = prompt("Edit task:", tasks[index].name);
        if (newName !== null) {
          tasks[index].name = newName.trim();
          displayTasks();
        }
      }
    });
  
    
    clearAllBtn.addEventListener("click", function() {
      tasks = [];
      displayTasks();
    });
  
    
    displayTasks();
  });
  