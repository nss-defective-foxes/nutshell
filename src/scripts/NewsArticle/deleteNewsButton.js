const APIManager = require("../api/APIManager")



const deleteNewsButton = () => {
    const secID = event.target.parentElement.id
    const index = secID.lastIndexOf("_")
    const articleID = secID.substr(index + 1)
    console.log(articleID)
    // APIManager.deleteNews({

    // })
}