
const $ = require("jquery")
const API = require("../api/APIManager")
const builder = require("./MessagesInChat")
const inputField = require("./InputNewMessages")

const inputEdit = (whereID, where, message) => {
    const form = document.createElement("form")
    const text = document.createElement("textarea")
    const input = document.createElement("input")
    text.id = "message"
    text.setAttribute("rows", "3")
    text.setAttribute("cols", "50")
    text.value = message
    input.id = `input${whereID}`
    input.type = "button"
    input.value = "Update"
    form.append(text)
    form.append(input)
    where.append(form)

    $(`#input${whereID}`).on("click", function() {
        const message = text.value;
        console.log(message)
        UpdateObject = {
            "userID": parseInt(sessionStorage.getItem("userID")),
            "message": message
        }
        API.putMessage(whereID,UpdateObject)
        .then(() => {
            $("#chatDiv").empty()
            builder()
            inputField()
        })
    })

}

module.exports = inputEdit