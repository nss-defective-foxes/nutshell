const $ = require("jquery")
const APIManager = require("../api/APIManager")
const displayChat = require("../Chat/mainChat")
const displayFriends = require("../friendList/friendList")
const loadPage = require("./loadPage")

const loadRegistration = () => {
    $("#registration--modal").append(`
            <h3>Registration</h3>
            <input type="text" placeholder="email" id="email--registration">
            <input type="text" placeholder="username" id="username--registration">
            <input type="password" placeholder="password" id="password--registration">
            <button type="submit" id="registration--button">Submit</button>
            <button type="submit" id="cancel--button">Cancel</button>
    `)
    $("#registration--button").click(() =>{
        let uniqueCheck = true
        APIManager.getAllUsers().then((userList)=>{
            userList.forEach((user)=>{
                if(user.email === $("#email--registration").val() ||
                user.username === $("#username--registration").val()){
                   uniqueCheck = false
                }
            })
            if($("#email--registration").val() &&
            $("#username--registration").val() &&
            $("#password--registration").val() &&
            uniqueCheck) {
                APIManager.postUser({
                    "username": $("#username--registration").val(),
                    "email": $("#email--registration").val(),
                    "password": $("#password--registration").val()
                }).then(result => {
                    sessionStorage.setItem("userID", result.id)
                    $("#username--registration").val("")
                    $("#email--registration").val("")
                    $("#password--registration").val("")
                    $("#registration--modal").empty()
                    $("#login--page").empty()
                    loadPage()
                })
            }
        })
    })
    $("#cancel--button").click(()=>{
        $("#registration--modal").empty()
    })
}

module.exports = loadRegistration