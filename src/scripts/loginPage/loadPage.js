const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")

const loadPage = () => {
    loadFriends()
    displayChat()
}

module.exports = loadPage