const $ = require("jquery")
const api = require("../api/APIManager")
const buildChatMessages = require("./MessagesInChat")
const inputField = require("./InputNewMessages")
// const edit = require("./editButton")

const displayChat = () => {
    buildChatMessages()
    inputField()
    // $(document).on("click", ".edit", function(e) {
    //     edit(e)
    // })
}

module.exports = displayChat