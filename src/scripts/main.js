const initialLoad = require("./loginPage/initialLoad")

initialLoad()
const $ = require("jquery")
const edit = require("./Chat//editButton")


$(document).on("click", ".edit", function(e) {
    edit(e)
})