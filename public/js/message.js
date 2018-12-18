$(() => {
    $("#send").click(() => {
        let message = {name: $("#name").val(), message: $("#message").val()}
        postMessage(message)
        // addMessages(message)
    })
    getMessages()
})
// adding message
const addMessages = (message) => {
    $("#messages").append(`<h4> ${message.name} </h4> <p>${message.message}</p>`)
}
 socket.on('message', addMessages(message))



// getting messages
const getMessages  = () => {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(addMessages)
    })
}

// posting a message
const postMessage  = (message) => {
    $.post('http://localhost:3000/messages', message) 
}