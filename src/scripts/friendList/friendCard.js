const $ = require("jquery")
const APIManager = require("../api/APIManager")

const friendCard = (person, friend) => {
    $("#friend--list").append(`
        <div class="friend--card">
        <section class="friendCard">
        <button id="remove--friend--${friend.id}" class="btn--delete" type="submit">X</button>
        <h5>${person.username}</h5>
        </section>
        </div>
    `)
    $(`#remove--friend--${friend.id}`).click(() => {
        APIManager.deleteFriend(friend.id).then(() => {
            $(`#remove--friend--${friend.id}`).parent().remove()
        })
    })
}

module.exports = friendCard