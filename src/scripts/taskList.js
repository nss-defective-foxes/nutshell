const $ = require("jquery")

//Note: append to DOM in divs

const taskMaker = function (name, date) {
    let newObject = {
        "taskName": name,
        "dueDate": date
    }
    return(newObject)
}
//input field for date
//input field for name

const taskForm = document.createElement("form")

const dateInput = document.createElement("input")

dateInput.setAttribute("type", "date")

dateInput.setAttribute("placeholder", "Enter Date")

const nameInput = document.createElement("input")

nameInput.setAttribute("type", "text")

nameInput.setAttribute("placeholder", "Enter Name")

const submitButton = document.createElement("button")

submitButton.addEventListener("click", taskMaker(nameInput.value, dateInput.value))

taskForm.appendChild(dateInput)

taskForm.appendChild(nameInput)

taskForm.appendChild(submitButton)

$("body").append($("div")).id("taskList")

$("#taskList").append(taskForm)

//dislay tasks on the user task board

const taskEditor = function ()

const taskDisplay = function() {
    const taskDisplayDiv = document.createElement("ul")
    taskDisplayDiv.setAttribute("id", "taskDisplay")
    /*get all tasks for user*/.forEach(element => {
        const taskItem = $("#taskDisplay").append($("li")).text(`Task: ${element.taskName} Due: ${element.dueDate}`)
        const removeTaskButton = document.createElement("button")
        removeTaskButton.addEventListener("click", /*remove task api function*/)
        taskItem.appendChild(removeTaskButton)
        const editTaskButton = document.createElement("button")
        editTaskButton.addEventListener("click", taskEditor)
    });
}




