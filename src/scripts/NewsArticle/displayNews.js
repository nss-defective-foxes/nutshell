const APIManager = require("../api/APIManager")
const $ = require("jquery")

// let newsResults = []
let userNews = []
let promises = []

const sortByDate = (a, b) => {
    if (a.timestamp < b.timestamp) {
        return -1
    } else if (a.timestamp > b.timestamp) {
        return 1
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
            APIManager.getSubsetFriends(userID)
                .then(friends => {
                    friends.forEach(friend => {
                        promises.push(APIManager.getSubsetNews(friend.friendID)
                    )
                    })
                    Promise.all(promises).then(result => {
                        const friendNews = [].concat.apply([], result)
                        friendNews.forEach (article => {
                            userNews.push(article)
                        })
                        userNews.sort(sortByDate)
                        console.log(userNews)

                        $("#news").empty()
                        userNews.forEach(article => {
                            if (article.userID === userID) {
                                $("#news").append(`<section class="myNews news" id="${article.id}"><button class="btn--delete" id="delU${article.userID}A${article.id}">X</button>
                                <h3 class="newsHeadline"><a href="${article.url}">${article.title}</a></h3>
                                <p>${article.synopsis}</p>
                                </section>`)
                            } else {
                                $("#news").append(`<section class = "friendNews news"
                                id = "${article.id}"> <button class = "btn--delete"
                                id = "delU${article.userID}A${article.id}"> X </button>
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