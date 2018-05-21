const $ = require("jquery")
const APIManager = require("../api/APIManager")
const friendCard = require("./friendCard")
const addFriendButton = require("./addFriendButton")

const displayFriendList = () => {
    $("#friend--list").append(`
        <h3>Friends</h3>
        <input type="text" placeholder="username" id="username--search">
        <button type="submit" id="add--friend" class="btn">Search Friends<buttons>
    `)
    const user = sessionStorage.getItem("userID")
    let currentUsername
    APIManager.getSubsetUsers(user).then(currentUser => {
        currentUsername = currentUser[0].username
        APIManager.getSubsetFriends(user).then(friends => {
            friends.forEach(friend => {
                const friendsToList = friend.friendID
                APIManager.getSubsetUsers(friendsToList).then(u => {
                    u.forEach(person => {
                        friendCard(person, friend)
                    })
                })
            })
            addFriendButton(user)
        })
    })
}

module.exports = displayFriendList