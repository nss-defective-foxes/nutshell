const $ = require("jquery")



const userid = {
    id: 123,
    taskName: "task master",

}//will fetch id later

const APIManager = require("api/APIManager.js")
//Note: append to DOM in divs

const taskMaker = function (name, date) {
    let newObject = {
        "taskName": name,
        "dueDate": date
    }
    APIManager.postTask(newObject)
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

submitButton.textContent = "Submit"

submitButton.addEventListener("click", taskMaker(nameInput.value, dateInput.value))

taskForm.appendChild(dateInput)

taskForm.appendChild(nameInput)

taskForm.appendChild(submitButton)

$("#taskList").append(taskForm)

//dislay tasks on the user task board

const taskEditor = function (element) {
    const editInput = document.createElement("form")
    const editName = document.createElement("input")
    editName.value = element.name
    const editDate = document.createElement("input")
    editDate.value = element.date
    const editSubmit = document.createElement("button")
    editSubmit.addEventListener("click", taskMaker(editName.value, editDate.value))
    editInput.appendChild(editName)
    editInput.appendChild(editDate)
}

const taskDisplay = function(taskLoader) {
    const taskDisplayDiv = document.createElement("ul")
    taskDisplayDiv.setAttribute("id", "taskDisplay")
    taskLoader.forEach(element => {
        const taskItem = $("#taskDisplay").append($("li")).text(`Task: ${element.taskName} Due: ${element.dueDate}`)
        const removeTaskButton = document.createElement("button")
        removeTaskButton.addEventListener("click", APIManager.deleteTask)
        taskItem.appendChild(removeTaskButton)
        const editTaskButton = document.createElement("button")
        editTaskButton.addEventListener("click", taskEditor(element.id))
        taskItem.appendChild(editTaskButton)
        
    });
}
taskDisplay(APIManager.....




