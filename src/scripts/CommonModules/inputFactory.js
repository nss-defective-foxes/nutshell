const inputFactory = (type, placeholder, id, classes) => {
    const component = document.createElement("input")
    component.type = type
    component.placeholder = placeholder
    component.id = id
    component.classList = classes
    return component
}

module.exports = inputFactory