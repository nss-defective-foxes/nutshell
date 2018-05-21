const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")
const displayTaskList = require("../taskList")

//remove this line on master
const displayAllData = require("./displayAllData")

const loadPage = () => {
    loadFriends()
    displayChat()
    displayTaskList()
}

module.exports = loadPage