const displayChat = require("../Chat/mainChat")
const displayNews = require("../NewsArticle/displayNews")
const addNewsForm = require("../NewsArticle/addNewsForm")


const currentUser = sessionStorage.getItem("userID")

const displayAllData = () => {
    displayChat()
    addNewsForm()
    displayNews(currentUser)



}

module.exports = displayAllData


