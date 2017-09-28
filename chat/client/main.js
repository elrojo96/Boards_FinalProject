$(document).ready(function(){
    $("#enviarMensaje").on("click", validarNombre);
    $("#enviarMensaje").on("click", validarMensaje);
});

function validarNombre(){
    var bool;

    if($("#nickname").val() == ""){
        $("#errorNickname").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#errorNickname").addClass("hiddenElement");
        bool = true;
    }

    return bool;
}

function validarMensaje(){
    var bool;

    if($("#text").val() == ""){
        $("#errorText").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#errorText").addClass("hiddenElement");
        bool = true;
    }

    return bool;
}

//var socket = io.connect('http://192.168.0.12:6677',{'forceNew':true});
var socket = io.connect('http://192.168.0.12:6677',{'forceNew':true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="messages">
                <strong>${message.nickname}</strong> dice: ${message.text}
            </div>
        `);
    }).join(' ');
    
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    
    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').value = "";

    socket.emit('add-message', message);
    return false;
}
