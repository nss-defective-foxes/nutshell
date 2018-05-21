const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")
const displayTaskList = require("../taskList")

const loadPage = () => {
    loadFriends()
    displayChat()
    displayTaskList()
}

module.exports = loadPage