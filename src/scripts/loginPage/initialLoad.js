const $ = require("jquery")
const APIManager = require(".././api/APIManager")
const loadLoginPage = require("./loginPage")
const loadRegistration = require("./registrationPage")
const displayAllData = require("./displayAllData")
const displayChat = require("../Chat/mainChat")
const displayFriendList = require("../friendList/friendList")
const loadPage = require("./loadPage")

let userList = {}

const initialLoad = () => {
    loadLoginPage()
    $("#login--button").click(()=>{
        APIManager.getAllUsers().then((userList) => {
        userList.forEach(user => {
            if ($("#username--input").val() === user.username &&
            $("#password--input").val() === user.password) {
                sessionStorage.setItem("userID", user.id)
                $("#username--input").val("")
                $("#password--input").val("")
                $("#login--page").empty()
                $("#registration--modal").empty()
                loadPage()
                }
            })
        })
    })
    $("#registration--link").click(() => {
        $("#registration--modal").empty()
        loadRegistration()
    })
}

module.exports = initialLoad