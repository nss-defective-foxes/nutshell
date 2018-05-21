const componentFactory = (type, text, id, classes) => {
    const component = document.createElement(type)
    component.textContent = text
    component.id = id
    component.classList = classes
    return component
}

module.exports = componentFactory