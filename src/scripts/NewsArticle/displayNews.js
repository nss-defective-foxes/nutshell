const APIManager = require("../api/APIManager")
const $ = require("jquery")
const componentFactory = require("../CommonModules/componentFactory")
const apnd = require("../CommonModules/apnd")

let userNews = []
let promises = []

const sortByDate = (a, b) => {
    if (a.timestamp < b.timestamp) {
        return 1
    } else if (a.timestamp > b.timestamp) {
        return -1
    }
    return 0
}

const displayNews = function (userID) {
    //get a user's own news articles
    APIManager.getSubsetNews(userID)
    .then(articles => {
        articles.forEach(article => {
            userNews.push(article)
        })
    })
    .then(() => {
        //get the list of the user's friends
        APIManager.getSubsetFriends(userID)
        .then(friends => {
            friends.forEach(friend => {
                //get the news articles of the user's friends
                //this is creating an array of promises for retrieving the articles.
                promises.push(APIManager.getSubsetNews(friend.friendID)
            )
        })
        //Promise.all ensures that every promise has been fulfilled before continuing. It's necessary because of the nested API calls above.
        Promise.all(promises).then(result => {
            //the result comes back as one array of articles for each friend. the next line concatenates each article into the userNews array
            const friendNews = [].concat.apply([], result)
            friendNews.forEach (article => {
                            userNews.push(article)
                        })
                        userNews.sort(sortByDate)
                        $("#newsDisplay").empty()
                        userNews.forEach(article => {
                            const newsHook = document.getElementById("newsDisplay")
                            const myNewsSection = componentFactory("section", "", "", "myNews news")
                            const friendNewsSection = componentFactory("section", "", "", "friendNews news")
                            const newsHeadline = `<h3 class="newsHeadline"><a href="${article.url}">${article.title}</a></h3>`
                            const newsSynopsis = `<p>${article.synopsis}</p>`
                            const deleteButton = componentFactory("button", "X", "", "btn--delete")
                            if (parseInt(article.userID) === parseInt(userID)) {
                                myNewsSection.id = `article_${article.id}`
                                deleteButton.addEventListener("click", function (event) {
                                    const secID = event.target.parentElement.id
                                    const index = secID.lastIndexOf("_")
                                    const articleID = secID.substr(index + 1)
                                    console.log(articleID)
                                    // APIManager.deleteNews({

                                    // })
                                })
                                apnd(myNewsSection, deleteButton)
                                apnd(myNewsSection, newsHeadline)
                                apnd(myNewsSection, newsSynopsis)
                                apnd(newsHook, myNewsSection)
                            } else {
                                apnd(friendNewsSection, newsHeadline)
                                apnd(friendNewsSection, newsSynopsis)
                                apnd(newsHook, friendNewsSection)

                            }

                        })

                    })
                })
        })
}

module.exports = displayNews