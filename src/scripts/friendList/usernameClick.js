const $ = require("jquery")
const APIManager = require("../api/APIManager")

const addUsernameClick = () => {
    APIManager.getAllMessages().then(messages => {
        let usernameList = []
        messages.forEach(message =>{
            usernameList.push(message.userID)
        })
        usernameList.forEach(username => {
            $(`.${username}--link`).click(()=>{
                console.log(`${username}--link`)
            })
        });
    })
}

module.exports = addUsernameClick