const $ = require("jquery")
const APIManager = require(".././api/APIManager")
const loadLoginPage = require("./loginPage")
const loadRegistration = require("./registrationPage")

let userList = {}

const initialLoad = () => {
    APIManager.getAllUsers().then((userList) => {
        loadLoginPage()
        console.log(userList)
        $("#login--button").click(()=>{
            userList.forEach(user => {
                if ($("#username--input").val() === user.username &&
                $("#password--input").val() === user.password) {
                    sessionStorage.setItem("userID", user.id)
                    $("#username--input").val("")
                    $("#password--input").val("")
                    }
                })
            })
        $("#registration--link").click(() => {
            $("#registration--modal").empty()
            loadRegistration()
        })
    })
}

module.exports = initialLoad