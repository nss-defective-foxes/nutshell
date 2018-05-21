const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")
const displayNews = require("../NewsArticle/displayNews")
const addNewsForm = require("../NewsArticle/addNewsForm")
const eventDOMBuilder = require("../dom/eventDOMBuilder")

const loadPage = () => {
    loadFriends()
    displayChat()
    addNewsForm()
    displayNews()
    eventDOMBuilder.buildEventList()
}

module.exports = loadPage