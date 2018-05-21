const $ = require("jquery")

const APIManager = require("api/APIManager.js")

const existingUser = sessionStorage.getItem("userID")
//general task object maker/storer
const taskMaker = function (name, date) {
    let newObject = {
        "taskName": name,
        "dueDate": date,
        "userID": existingUser
    }
    APIManager.postTask(newObject)
}

//input field for date and name

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
submitButton.classList = "btn"


//submit functionality to take name and date and create an object

submitButton.addEventListener("click", function () {
    let namefield = document.querySelector("#nameField").value
    let datefield = document.querySelector("#dateField").value
    taskMaker(namefield, datefield)
    $("#taskDisplay").empty()
    taskDisplay(existingUser)
})

taskForm.appendChild(dateInput)

taskForm.appendChild(nameInput)

taskForm.appendChild(submitButton)

$("#taskList").append(taskForm)

//edit button click event

const taskEditor = function (element) {
    if (!document.getElementById("editingActive")) {
        const editInput = document.createElement("div")
        editInput.setAttribute("id", "editingActive")
        APIManager.getSpecificTask(element).then(task => {
            const editName = document.createElement("input")
            editName.value = task.taskName
            const editDate = document.createElement("input")
            editDate.value = task.dueDate
            const editSubmit = document.createElement("button")
            editSubmit.textContent = "Submit"
            editSubmit.addEventListener("click", function () {
                taskMaker(editName.value, editDate.value);
                editDeleteClickEvent()
                editName.value = ""
                editDate.value = ""
            })
            editInput.appendChild(editName)
            editInput.appendChild(editDate)
            editInput.appendChild(editSubmit)
            $(`#${element}`).append(editInput)
        })
    }
}
//edit button clearing previous data
const editDeleteClickEvent = function () {
    APIManager.deleteTask(event.currentTarget.parentElement.parentElement.id).then(() => {
        $("#taskDisplay").empty()
        taskDisplay(existingUser)
    })
}

//delete button event
const deleteClickEvent = function () {
    APIManager.deleteTask(event.currentTarget.parentElement.id).then(() => {
        $("#taskDisplay").empty()
        taskDisplay(existingUser)
    })
}
//creates task cards and adds edit and delete buttons
const taskDisplay = function () {
    const taskLoaderID = sessionStorage.getItem("userID")
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

        });
    })
}


module.exports = taskDisplay