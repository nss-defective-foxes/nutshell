const $ = require("jquery")
const APIManager = require("../api/APIManager")
const inputFactory = require("../CommonModules/inputFactory")
const componentFactory = require("../CommonModules/componentFactory")
const apnd = require("../CommonModules/apnd")

const contentHook = document.querySelector("#newsForm")
const fragment = document.createDocumentFragment()

const currentUser = sessionStorage.getItem("userID")

const addNewsForm = () => {
    //need userid, url, title, synopsis
    const urlInput = inputFactory("text","Article URL", "URLInput", "newsTextInput")
    const titleInput = inputFactory("text", "Article Title", "TitleInput", "newsTextInput")
    const synopsisInput = inputFactory("text", "Article Synopsis", "SynopsisInput", "newsTextInput")
    const saveButtonInput = componentFactory("button", "Save Article", "", "btn")
    saveButtonInput.addEventListener("click", function(event){
        const url = $("#URLInput").val()
        const title = $("#TitleInput").val()
        const synopsis = $("#SynopsisInput").val()
        const timestamp = new Date()

        APIManager.postNews({
            "userID": currentUser,
            "url": url,
            "title": title,
            "synopsis": synopsis,
            "timestamp": timestamp
        })
        .then(function(){
            const displayNews = require("./displayNews")
            displayNews(currentUser)
            $("#URLInput").val("")
            $("#TitleInput").val("")
            $("#SynopsisInput").val("")
        })
    })

    apnd(fragment, urlInput)
    apnd(fragment, titleInput)
    apnd(fragment, synopsisInput)
    apnd(fragment, saveButtonInput)
    apnd(contentHook, fragment)
}

module.exports = addNewsForm