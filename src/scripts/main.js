const initialLoad = require("./loginPage/initialLoad")
const logoutButton = require("./logOut/logout")
const loadPage = require("./loginPage/loadPage")

const existingUser = sessionStorage.getItem("userID")

console.log(existingUser)

if (existingUser === null){
    initialLoad()
} else {
    loadPage()
}

logoutButton()