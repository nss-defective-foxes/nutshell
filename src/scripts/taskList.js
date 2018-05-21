const $ = require("jquery")

const APIManager = require("api/APIManager.js")

const existingUser = sessionStorage.getItem("userID")

const taskMaker = function (name, date) {
    let newObject = {
        "taskName": name,
        "dueDate": date,
        "userID": existingUser
    }
    APIManager.postTask(newObject)
}

//input field for date
//input field for name

const taskForm = document.createElement("div")

const dateInput = document.createElement("input")

dateInput.setAttribute("type", "date")

dateInput.setAttribute("placeholder", "Enter Date")

dateInput.setAttribute("id", "dateField")

const nameInput = document.createElement("input")

nameInput.setAttribute("type", "text")

nameInput.setAttribute("placeholder", "Enter Name")

nameInput.setAttribute("id", "nameField")

const submitButton = document.createElement("button")

submitButton.textContent = "Submit"

submitButton.addEventListener("click", function () {
    let namefield = document.querySelector("#nameField").value
    let datefield = document.querySelector("#dateField").value
    taskMaker(namefield, datefield)
})

taskForm.appendChild(dateInput)

taskForm.appendChild(nameInput)

taskForm.appendChild(submitButton)

$("#taskList").append(taskForm)

//dislay tasks on the user task board

const taskEditor = function (element) {
    if (!document.getElementById("editingActive")) {
        const editInput = document.createElement("div")
        editInput.setAttribute("id", "editingActive")
        APIManager.getSingleTask(element).then(task => {
            const editName = document.createElement("input")
            editName.value = task.taskName
            const editDate = document.createElement("input")
            editDate.value = task.dueDate
            const editSubmit = document.createElement("button")
            editSubmit.textContent = "Submit"
            editSubmit.addEventListener("click", function(){
                taskMaker(editName.value, editDate.value);
                editDeleteClickEvent()
            })
            editInput.appendChild(editName)
            editInput.appendChild(editDate)
            editInput.appendChild(editSubmit)
            $(`#${element}`).append(editInput)
        })
    }
}

const editDeleteClickEvent = function () {
    APIManager.deleteTask(event.currentTarget.parentElement.parentElement.id).then(()=>{
        $("#taskDisplay").empty()
        taskDisplay(existingUser)
    })
}


const deleteClickEvent = function () {
    APIManager.deleteTask(event.currentTarget.parentElement.id).then(()=>{
        $("#taskDisplay").empty()
        taskDisplay(existingUser)
    })
}

const taskDisplay = function(taskLoaderID) {
    const taskDisplayDiv = document.createElement("ul")
    taskDisplayDiv.setAttribute("id", "taskDisplay")
    APIManager.getSubsetTasks(taskLoaderID).then(tasks => {
        tasks.forEach(element => {
        let removeTaskButton = document.createElement("button")
        removeTaskButton.addEventListener("click", deleteClickEvent)
        removeTaskButton.textContent = "Delete"
        let buttonDiv = document.createElement("div")
        buttonDiv.setAttribute("id", `${element.id}`)
        let editTaskButton = document.createElement("button")
        editTaskButton.textContent = "Edit"
        editTaskButton.addEventListener("click", function () {
            taskEditor(event.target.parentElement.id)
        })
        buttonDiv.appendChild(removeTaskButton)
        buttonDiv.appendChild(editTaskButton)
        $("#taskList").append(taskDisplayDiv)
        $("#taskDisplay").append(`<li>Task: ${element.taskName} Due: ${element.dueDate}</li>`).append(buttonDiv)
    });})
}

taskDisplay(existingUser)