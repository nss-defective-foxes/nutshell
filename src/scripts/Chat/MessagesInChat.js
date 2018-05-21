const $ = require("jQuery")
const APIManager = require("../api/APIManager")
const print = $("#chatDiv")
const frag = document.createDocumentFragment()

const builderBlock = () => {
    APIManager.getAllMessages()
    .then(data => {
        data.forEach(message => {
            APIManager.getSubsetUsers(parseInt(message.userID))
            .then(result => result[0].username)
            .then(messageName => {
                const section = document.createElement("section")
                section.classList = "chatSections"
                if (parseInt(message.userID) === parseInt(sessionStorage.getItem("userID"))) {
                    section.id = `${message.id}`
                    section.innerHTML += `<a href="http://www.google.com">${messageName}</a>: <span id="message--${message.id}">${message.message}</span><button class="btn--edit edit"><i class="far fa-edit"></i></button>`
                    }
                else {
                    section.innerHTML += `<a href="http://www.google.com">${messageName}</a>: <span class="${message.id}">${message.message}</span>`
                }
                frag.append(section)
                return frag
            })
            .then(frag => print.append(frag))
        })
    })
}

module.exports = builderBlock