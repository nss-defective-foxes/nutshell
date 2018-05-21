const $ = require("jquery")
const initialLoad = require("./loginPage/initialLoad")
const logoutButton = require("./logOut/logout")
const loadPage = require("./loginPage/loadPage")
const edit = require("./Chat/editButton")

const existingUser = sessionStorage.getItem("userID")

if (existingUser === null){
    initialLoad()
} else {
    loadPage()
}

logoutButton()
$(document).on("click", ".edit", function(e) {
    edit(e)
})