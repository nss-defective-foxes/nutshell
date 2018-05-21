const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")

//remove this line on master
const displayAllData = require("./displayAllData")

const loadPage = () => {
    loadFriends()

    // restore commented out parts and remove indicated parts when pushing to master
    // displayChat()

    //remove this on master
    displayAllData()
}

module.exports = loadPage