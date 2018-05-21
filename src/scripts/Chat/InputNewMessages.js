const $ = require("jquery")
const api = require("../api/APIManager")
const print = $("#chatDiv")

const input = () => {
    const form = document.createElement("form")
    const text = document.createElement("textarea")
    const input = document.createElement("input")
    form.classList = "form"
    form.id = "chatForm"
    text.id = "message"
    text.setAttribute("rows", "3")
    text.setAttribute("cols", "50")
    input.id = "chatSubmit"
    input.type = "submit"
    form.append(text)
    form.append(input)
    print.append(form)
    $("#chatSubmit").on("click", function(event) {
        event.preventDefault()
        const message = $("#message").val()
        const clear =  $("#message").val("")
        api.postMessage({
            "userID": sessionStorage.getItem("userID"),
            "message": message})
            .then(function() {
                const buildChatMessages = require("./MessagesInChat")
                $(".chatSections").remove()
                buildChatMessages()
                clear
            })
    })
}

module.exports = input
