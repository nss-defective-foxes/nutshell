const $ = require("jquery")
const api = require("../api/APIManager")
const buildChatMessages = require("./MessagesInChat")
const inputField = require("./InputNewMessages")

const displayChat = () => {
    buildChatMessages()
    inputField()
}

module.exports = displayChat