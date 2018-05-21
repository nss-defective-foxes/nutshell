const initialLoad = require("./loginPage/initialLoad")
const displayAllData = require("./loginPage/displayAllData")
const taskListDisplay = require("./taskList")
const $ = require("jquery")
const edit = require("./Chat//editButton")


$(document).on("click", ".edit", function(e) {
    edit(e)
})



const logoutButton = require("./logOut/logout")
const loadPage = require("./loginPage/loadPage")

const existingUser = sessionStorage.getItem("userID")

if (existingUser === null){
    initialLoad()
} else {
    loadPage()
}

logoutButton()