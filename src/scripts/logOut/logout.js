const $ = require("jquery")
const initialLoad = require("../loginPage/initialLoad")

const logoutButton = () => {
    $("#logout--button").click(() => {
        sessionStorage.clear()
        $("#chatDiv").empty()
        $("#friend--list").empty()
        initialLoad()
    })
}

module.exports = logoutButton