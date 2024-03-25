let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// create empty array
let tasksData = [];

if (localStorage.getItem("tasks")){
    tasksData = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocal()

// add tasks
submit.onclick = function () {
    if (input.value !== "") {
        addTask(input.value); // add task function
        input.value = "";
    }
}

tasksDiv.addEventListener('click', (e) => {
    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
})

function addTask(taskName) {
    task = {
        id: Date.now(),
        title: taskName,
        complated: false,
    }
    tasksData.push(task);
    addDataToLocal(tasksData)
    addingData(tasksData);
    // adding data to local storage 
}

// adding data to page
function addingData(tasksData) {
    // empty table of tasks
    tasksDiv.innerHTML = "";
// adding tasks
    tasksData.forEach(task => {
            // create main div
            let div = document.createElement("div");
            div.className = "task";
            div.setAttribute("data-id", task.id);
            div.appendChild(document.createTextNode(task.title));
            // check if task done
            if (task.complated){
                div.className = "task done";
            }
            // create delete btn
            let span = document.createElement("span");
            span.className = "del";
            let tr = document.createElement("span");
            tr.className = "tr";
            tr.appendChild(document.createTextNode("✓"));
            span.appendChild(document.createTextNode("Delete"));
            tr.onclick = function(){
                div.className = "task done";
                if (task.complated){
                    div.className = "task";
                    task.complated = false
                }else{
                    div.className = "task done";
                    task.complated = true;
                    console.log(task);
                }
                toggleStatusTaskWith()
            }
            // append span to div
            div.appendChild(tr);
            div.appendChild(span);
            tasksDiv.appendChild(div);
            });     
}




// save data in local storage 
function addDataToLocal(tasksData) {
    localStorage.setItem("tasks", JSON.stringify(tasksData))
}
function getDataFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        addingData(tasksData)
    }
}

function deleteTaskWith(taskId) {
    tasksData = tasksData.filter((task) => task.id != taskId);
    addDataToLocal(tasksData);
  } 
  function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < tasksData.length; i++) {
      if (tasksData[i].id == taskId) {
        tasksData[i].completed == false ? (tasksData[i].completed = true) : (tasksData[i].completed = false);
      }
    }
    addDataToLocal(tasksData);
  }