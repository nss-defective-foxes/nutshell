const $ = require("jQuery")
const APIManager = require("../api/APIManager")
const print = $("#chatDiv")
const frag = document.createDocumentFragment()
const inputField = require("./InputNewMessages")

console.log("testing")

const builderBlock = () => {
    APIManager.getAllMessages()
    .then(data => {
        console.log(data)
        data.forEach(message => {
            APIManager.getSubsetUsers(parseInt(message.userID)).then(result => result[0].username)
            .then(messageName => {
                const section = document.createElement("section")
                section.classList = "remove"
                section.innerHTML += `<a href="http://www.google.com">${messageName}</a>: ${message.message}`
                console.log(section)
                frag.append(section)
                return frag
            })
            .then(frag => print.append(frag))
        })
    })
}

module.exports = builderBlock