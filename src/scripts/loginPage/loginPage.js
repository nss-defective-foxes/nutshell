const $ = require("jquery")

const loadLoginPage = () => {
    $("#login--page").append(`
        <h1 id="main--heading">Welcome to Nutshell</h1>
        <h3 id="login--heading">Login</h3>
        <input type="text" placeholder="username" id="username--input">
        <input type="password" placeholder="password" id="password--input">
        <button type="submit" id="login--button">Submit</button>
        <a href="#" id="registration--link">Don't have an account? Register Here!</a>
    `)
}

module.exports = loadLoginPage