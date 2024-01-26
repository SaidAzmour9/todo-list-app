let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// create empty array

let tasksData = [];

// add tasks
submit.onclick = function () {
    if (input.value !== "") {
        addTask(input.value); // add task function
        input.value = "";
    }
}


function addTask(taskName) {
    task = {
        id: Date.now(),
        title: taskName,
        complated: false,
    }
    
    tasksData.push(task);
    addingData(tasksData);
    // adding data to local storage
    saveData(tasksData);
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
        // create delete btn
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append span to div
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
    
}

// save data in local storage 

function saveData(tasksData){
    window.localStorage.setItem("tasks", JSON.stringify(tasksData))

}