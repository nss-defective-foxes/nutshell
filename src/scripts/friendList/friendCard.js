const $ = require("jquery")
const APIManager = require("../api/APIManager")

const friendCard = (person, friend) => {
    $("#friend--list").append(`
        <div class="friend--card">
            <h5>${person.username}</h5>
            <button id="remove--friend--${friend.id}" type="submit">Remove</button>
        </div>
    `)
    $(`#remove--friend--${friend.id}`).click(() => {
        APIManager.deleteFriend(friend.id).then(() => {
            $(`#remove--friend--${friend.id}`).parent().remove()
        })
    })
}

module.exports = friendCard