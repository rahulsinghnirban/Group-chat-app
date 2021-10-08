const socket = io();

$('#chatting').hide();

$('#send-btn').click(()=>{
    // console.log(socket.id)
    const msgText = $('#inp-msg').val();

    socket.emit('send-msg', {
        msg: msgText
    });

    $('#inp-msg').val("")
    // console.log(msgText)
})

socket.on('received-msg', (data)=>{
    $('#chat').append(`<li> <strong> ${data.user} </strong> : ${data.msg}</li>`)
    $('#chat-box').scrollTop($('#chat-box').outerHeight());
})


$('#login-btn').click(()=>{
    const user = $('#login-inp').val();
    
    socket.emit('login', {
        user: user
    })

    $('#login-inp').val("")
    $('#login').hide()
    $('#chatting').show()

})