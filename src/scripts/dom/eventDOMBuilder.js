const $ = require("jquery")
const APIManager = require("../api/APIManager")

const eventDOMBuilder = Object.create({}, {
    buildEventBtn: {
        value: function () {
            $("#events").append("<input type='button' value='New Event'></input>")
        }
    },
    buildEventForm: {
        value: function (e) {
            $("#eventForm").remove()
            $("#events").append(`<section id="eventForm">
            <input type="text" placeholder="Event Name" id="eventNameInput">
            <input type="date" id="eventDateInput">
            <input type="text" placeholder="Location" id="eventLocationInput">
            <input type="button" value="Submit" id="eventSubmit">
            </section`)
                $("#eventSubmit").click(function () {
                    const nameInput = $("#eventNameInput")
                    const dateInput = $("#eventDateInput")
                    const locationInput = $("#eventLocationInput")
                    $("#events h3").remove()
                    if (nameInput.val() !== "" && dateInput.val() !== "" && locationInput.val() !== "") {
                        const newEventObject = {"userID": sessionStorage.getItem("userID"),
                            name: nameInput.val(),
                            date: dateInput.val(),
                            location: locationInput.val()
                        }

                        APIManager.postEvent(newEventObject)
                        $("#events").empty()
                        eventDOMBuilder.buildEventList()
                    } else {
                        $("#events").append("<h3 id='eventEditAlert'>All fields must be complete</h3>")
                    }

                })
        }
    },
    buildEventList: {
        value: function () {
            APIManager.getSubsetEvents(sessionStorage.getItem("userID"))
            .then(eventsList => {
                let recentEvent = new Date(eventsList[0].date)
                let mostRecentEventID = eventsList[0].id
                eventsList.forEach(event => {
                    $("#events").append(
                        `<section class="${event.id}">
                        <h1 id="${event.id}name">${event.name}</h1>
                        <input type="button" value="Edit" class="editEvent" id="${event.id}edit">
                        <p id="${event.id}date">${event.date}</p>
                        <p id="${event.id}location">${event.location}</p>
                        </section>`
                    )
                    let currentEventDate = new Date (event.date)
                    if (currentEventDate < recentEvent) {
                        recentEvent = currentEventDate
                        mostRecentEventID = event.id
                    }
                    $(`#${event.id}edit`).click(this.buildEditForm)
                });
                $(`.${mostRecentEventID}`).addClass("nextEvent")
            })
        }
    },
    buildEditForm: {
        value: function (e) {
            debugger
            const eventIDTarget = $(`.${parseInt(e.target.id)}`)

            $("#eventEditForm").remove()

            APIManager.getSpecificEvent(parseInt(e.target.id)).then(specificEvent => {
                eventIDTarget.append(`<section id="eventEditForm">
                <input type="text" value="${specificEvent.name}" id="eventEditNameInput" placeholder="Event Name">
                <input type="date" value="${specificEvent.date}" id="eventEditDateInput">
                <input type="text" value="${specificEvent.location}" placeholder="Event Location" id="eventEditLocationInput">
                <input type="button" value="Save" id="eventEditSubmit">
                </section`)

                $("#eventEditSubmit").click(function () {
                    const nameInput = $("#eventEditNameInput")
                    const dateInput = $("#eventEditDateInput")
                    const locationInput = $("#eventEditLocationInput")
                    $("#eventEditAlert").remove()

                    if (nameInput.val() !== "" && dateInput.val() !== "" && locationInput.val() !== "") {
                        const newEventObject = {"userID": sessionStorage.getItem("userID"),
                        name: nameInput.val(),
                        date: dateInput.val(),
                        location: locationInput.val()
                    }
                    $(`#${parseInt(e.target.id)}name`).text(nameInput.val())
                    $(`#${parseInt(e.target.id)}date`).text(dateInput.val())
                    $(`#${parseInt(e.target.id)}location`).text(locationInput.val())

                    $("#eventEditForm").remove()

                    APIManager.putEvent(parseInt(e.target.id), newEventObject)
                    } else {
                    eventIDTarget.append("<h3 id='eventEditAlert'>All fields must be complete</h3>")
                    }

                })
            })
        }
    }
})

module.exports = eventDOMBuilder