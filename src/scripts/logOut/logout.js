const $ = require("jquery")
const initialLoad = require("../loginPage/initialLoad")

const logoutButton = () => {
    $("#logout--button").click(() => {
        const userID = sessionStorage.getItem("userID")
        if (userID !== null) {
            sessionStorage.clear()
            $("#chatDiv").empty()
            $("#friend--list").empty()
            initialLoad()
        }
    })
}

module.exports = logoutButton