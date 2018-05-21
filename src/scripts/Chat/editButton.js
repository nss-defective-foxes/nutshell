const $ = require("jquery")
const APIManager = require("../api/APIManager")
const editText = require("./editDomBuilder")


const editButton = (e) => {
    APIManager.getSpecificMessage(e.currentTarget.parentNode.id)
    .then(data => {
        // debugger
        const section = e.currentTarget.parentNode.id
        const section2 = $(`#${section}`)
        const message = e.currentTarget.previousSibling.textContent
        console.log(message)
        section2.empty()
        editText(section, section2, message)
    })
}

module.exports = editButton