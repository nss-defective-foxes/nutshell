const $ = require("jquery")
const initialLoad = require("../loginPage/initialLoad")

const logoutButton = () => {
    $("#logout--button").click(() => {
        const userID = sessionStorage.getItem("userID")
        if (userID !== null) {
            sessionStorage.clear()
            $("div").empty()
            initialLoad()
        }
    })
}

module.exports = logoutButton