const $ = require("jquery")

const APIManager = Object.create(null, {
    getAllUsers: {
        value: function () {
            return $.ajax("http://localhost:8088/users")
        }
    },
    getSubsetUsers: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/users?id=${id}`)
        }
    },
    postUser: {
        value: function (userObject) {
            return $.ajax({
                url: "http://localhost:8088/users",
                type: "POST",
                data: userObject
            })
        }
    },
    deleteUser: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/users/${id}`,
                type: "DELETE"
            })
        }
    },
    getAllMessages: {
        value: function () {
            return $.ajax("http://localhost:8088/messages")
        }
    },
    getSubsetMesssages: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/messages/?userID=${id}`)
        }
    },
    getSpecificMessage: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/messages/${id}`)
        }
    },
    putMessage: {
        value: function (id, messageObject) {
           return $.ajax({
                url: `http://localhost:8088/messages/${id}`,
                type: "PUT",
                data: messageObject
            })
        }
    },
    postMessage: {
        value: function (messageObject) {
            return $.ajax({
                url: "http://localhost:8088/messages",
                type: "POST",
                data: messageObject
            })
        }
    },
    deleteMessage: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/messages/${id}`,
                type: "DELETE"
            })
        }
    },
    getAllNews: {
        value: function () {
            return $.ajax("http://localhost:8088/news")
        }
    },
    getSubsetNews: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/news/?userID=${id}`)
        }
    },
    putNews: {
        value: function (id, newsObject) {
           return $.ajax({
                url: `http://localhost:8088/news/${id}`,
                type: "PUT",
                data: newsObject
            })
        }
    },
    postNews: {
        value: function (newsObject) {
            return $.ajax({
                url: "http://localhost:8088/news",
                type: "POST",
                data: newsObject
            })
        }
    },
    deleteNews: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/news/${id}`,
                type: "DELETE"
            })
        }
    },
    getAllTasks: {
        value: function () {
            return $.ajax("http://localhost:8088/tasks")
        }
    },
    getSubsetTasks: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/tasks/?userID=${id}`)
        }
    },
    getSpecificTask: {

        value: function (id) {
            return $.ajax(`http://localhost:8088/tasks/${id}`)
        }
    },
    putTask: {
        value: function (id, taskObject) {
           return $.ajax({
                url: `http://localhost:8088/tasks/${id}`,
                type: "PUT",
                data: taskObject
            })
        }
    },
    postTask: {
        value: function (taskObject) {
            return $.ajax({
                url: "http://localhost:8088/tasks",
                type: "POST",
                data: taskObject
            })
        }
    },
    deleteTask: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/tasks/${id}`,
                type: "DELETE"
            })
        }
    },
    getAllFriends: {
        value: function () {
            return $.ajax("http://localhost:8088/friends")
        }
    },
    getSubsetFriends: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/friends/?userID=${id}`)
        }
    },
    postFriend: {
        value: function (friendObject) {
            return $.ajax({
                url: "http://localhost:8088/friends",
                type: "POST",
                data: friendObject
            })
        }
    },
    deleteFriend: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/friends/${id}`,
                type: "DELETE"
            })
        }
    },
    getAllEvents: {
        value: function () {
            return $.ajax("http://localhost:8088/events")
        }
    },
    getSubsetEvents: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/events/?userID=${id}`)
        }
    },
    getSpecificEvent: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/events/${id}`)
        }
    },
    putEvent: {
        value: function (id, eventObject) {
           return $.ajax({
                url: `http://localhost:8088/events/${id}`,
                type: "PUT",
                data: eventObject
            })
        }
    },
    postEvent: {
        value: function (eventObject) {
            return $.ajax({
                url: "http://localhost:8088/events",
                type: "POST",
                data: eventObject
            })
        }
    },
    deleteEvent: {
        value: function (id) {
           return $.ajax({
                url: `http://localhost:8088/events/${id}`,
                type: "DELETE"
            })
        }
    }
})

module.exports = APIManager

