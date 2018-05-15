const $ = require("jQuery")
const print = $("#chatDiv")
const frag = document.createDocumentFragment()
const l = ""

console.log("testing")

const builderBlock = () => {
    return $.ajax("http://localhost:8084/messages")
    .then(data => {
        console.log(data)
        data.forEach(message => {
            const section = document.createElement("section")
            section.textContent = message.message
            frag.append(section)
        })
        print.append(frag)
    })
}
builderBlock()