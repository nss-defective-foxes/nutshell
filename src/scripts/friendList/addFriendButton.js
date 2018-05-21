const $ = require("jquery")
const APIManager = require("../api/APIManager")
const friendCard = require("./friendCard")

const addFriendButton = (user) => {
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
}

module.exports = addFriendButton