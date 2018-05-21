const APIManager = require("../api/APIManager")
const $ = require("jquery")
const componentFactory = require("../CommonModules/componentFactory")
const apnd = require("../CommonModules/apnd")


const sortByDate = (a, b) => {
    if (a.timestamp < b.timestamp) {
        return 1
    } else if (a.timestamp > b.timestamp) {
        return -1
    }
    return 0
}

const displayNews = function () {
    let userNews = []
    let promises = []
    // debugger
    const currentUser = sessionStorage.getItem("userID")
    userNews = []
    //get a user's own news articles
    APIManager.getSubsetNews(parseInt(currentUser))
    .then(articles => {
        articles.forEach(article => {
            userNews.push(article)
            console.log(userNews)
        })
    })
    .then(() => {
        //get the list of the user's friends
        APIManager.getSubsetFriends(parseInt(currentUser))
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
                            if (parseInt(article.userID) === parseInt(currentUser)) {
                                $("#newsDisplay").append(`<section class="myNews news" id="article_${article.id}"><button class="btn--delete" id="remove_article_${article.id}">X</button>
                                <h3 class="newsHeadline"><a href="${article.url}">${article.title}</a></h3>
                                <p>${article.synopsis}</p>
                                </section>`)
                                $(`#remove_article_${article.id}`).click(() => {
                                    APIManager.deleteNews(article.id)
                                    .then(() => {
                                        $(`#article_${article.id}`).remove()
                                    })
                                })
                            } else {
                                $("#newsDisplay").append(`<section class = "friendNews news">
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