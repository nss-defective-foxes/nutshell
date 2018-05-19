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
                            if (article.userID === userID) {
                                $("#news").append(`<section class="myNews news" id="${article.id}"><button class="btn--delete" id="delU${article.userID}A${article.id}">X</button>
                                <h3 class="newsHeadline"><a href="${article.url}">${article.title}</a></h3>
                                <p>${article.synopsis}</p>
                                </section>`)
                            } else {
                                $("#news").append(`<section class = "friendNews news">
                                <h3 class="newsHeadline"><a href="${article.url}">${article.title}</a></h3>
                                <p>${article.synopsis}</p>
                                </section>`)

                                }
                            })

                    })
                })
        })
}

module.exports = displayNews