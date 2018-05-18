const $ = require("jquery")
const APIManager = require("../api/APIManager")
const friendCard = require("./friendCard")

const displayFriendList = () => {
    $("#friend--list").append(`
        <h3>Friends</h3>
        <input type="text" placeholder="username" id="username--search">
        <button type="submit" id="add--friend">Search Friends<buttons>
    `)
    const user = sessionStorage.getItem("userID")
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
            $("#add--friend").click(() => {
                let friendSearch = $("#username--search").val()
                const friendPull = $.get(`http://localhost:8088/users?q=${friendSearch}`, (friendObject => {
                    const potentialNewFriend = friendObject[0]
                    APIManager.getSubsetFriends(user).then(myFriendList => {
                        const friendIDList = []
                        myFriendList.forEach(thisFriend => {
                            friendIDList.push(thisFriend.friendID)
                        })
                        if (friendIDList.includes(potentialNewFriend.id.toString()) ||
                        friendIDList.includes(potentialNewFriend.id)) {
                            console.log("already a friend")
                        } else if (potentialNewFriend.id === user ||
                        potentialNewFriend.id.toString() === user){
                            console.log("You can't friend yourself")
                        } else {
                            APIManager.postFriend({
                                "userID": user,
                                "friendID": potentialNewFriend.id
                            }).then((thisFriend) => {
                                friendCard(potentialNewFriend, thisFriend)
                                $("#username--search").val("")
                            })
                        }
                    })
                }))
            })
        })
    })
}

module.exports = displayFriendList