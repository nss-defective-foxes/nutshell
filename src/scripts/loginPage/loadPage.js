const $ = require("jquery")
const loadFriends = require("../friendList/friendList")
const displayChat = require("../Chat/mainChat")
const displayNews = require("../NewsArticle/displayNews")
const addNewsForm = require("../NewsArticle/addNewsForm")
const eventDOMBuilder = require("../dom/eventDOMBuilder")
const taskListDisplay = require("../taskList")
const edit = require("../Chat/editButton")



const loadPage = () => {
    loadFriends()
    displayChat()
    addNewsForm()
    displayNews()
    eventDOMBuilder.buildEventList()
    $(document).on("click", ".edit", function(e) {
        edit(e)
    })
}

module.exports = loadPage