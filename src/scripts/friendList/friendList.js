const $ = require("jquery")
const APIManager = require("../api/APIManager")
const friendCard = require("./friendCard")
const addFriendButton = require("./addFriendButton")

const displayFriendList = () => {
    $("#friend--list").append(`
        <h3>Friends</h3>
        <input type="text" placeholder="username" id="username--search">
        <button type="submit" id="add--friend">Search Friends<buttons>
    `)
    const user = sessionStorage.getItem("userID")
    if (user !== null) {
        console.log(user)
        let currentUsername
        APIManager.getSubsetUsers(user).then(currentUser => {
            currentUsername = currentUser[0].username
            APIManager.getSubsetFriends(user).then(friends => {
                console.log(friends)
                friends.forEach(friend => {
                    const friendsToList = friend.friendID
                    console.log(friendsToList)
                    APIManager.getSubsetUsers(friendsToList).then(u => {
                        u.forEach(person => {
                            friendCard(person, friend)
                        })
                    })
                })
                addFriendButton(user)
            })
        })
    } else {
        console.log("getting somewhere")
    }
}

module.exports = displayFriendList