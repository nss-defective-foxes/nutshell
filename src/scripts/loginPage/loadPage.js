const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")
const addUsernameClick = require("../friendList/usernameClick")

const loadPage = () => {
    loadFriends()
    displayChat()
}

module.exports = loadPage