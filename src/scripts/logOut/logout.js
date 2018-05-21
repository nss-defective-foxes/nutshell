const $ = require("jquery")
const initialLoad = require("../loginPage/initialLoad")

const logoutButton = () => {
    $("#logout--button").click(() => {
        const userID = sessionStorage.getItem("userID")
        if (userID !== null) {
            sessionStorage.clear()
            $("#chatDiv").empty()
            $("#friend--list").empty()
            $("#events").empty()
            $("#newsForm").empty()
            $("#newsDisplay").empty()
            $("#taskList").empty()
            initialLoad()
        }
    })
}

module.exports = logoutButton