$(document).ready(function(){
    /***********************************************/
    $("#iniciaSesion").on("click", verificarUsuario);
    $("#iniciaSesion").on("click", verificarContrasena);
    $("#iniciaSesion").on("click", iniciarSesion);
    
    $("#irRegistro").on("click", function(){
        $("#seccionInicio").addClass("hiddenElement");
        $("#seccionRegistro").removeClass("hiddenElement");
    });
    
    $("#volverInicio").on("click", function(){
        $("#seccionRegistro").addClass("hiddenElement");
        $("#seccionInicio").removeClass("hiddenElement");
    });
    
    $("#registrarse").on("click", verificarNombresRegistro);
    $("#registrarse").on("click", verificarApellidosRegistro);
    $("#registrarse").on("click", verificarUsuarioRegistro);
    $("#registrarse").on("click", verificarContrasenaRegistro);
    $("#registrarse").on("click", registrarse);
    
    $.ajax({
		url : "data/cookies.php",
		type : "GET",
		dataType : "json",
		success : function(cookieJson){
			$("#usuario").val(cookieJson.username);
            $("#contrasena").val(cookieJson.password);
		},
		error : function(errorMessage){
			console.log(errorMessage.responseText);
		}

	});
    
    $("#eliminarCookie").on("click", eliminarCookie);
    
    /***********************************************/
});

function verificarUsuario(){
    
    var boolUsuario;
    
    if($("#usuario").val() == "")
    {
        $("#usuarioError1").removeClass("hiddenElement");
        boolUsuario = false;
    }
    else
    {
        $("#usuarioError1").addClass("hiddenElement");
        boolUsuario = true;
    }
    
    return boolUsuario;
}

function verificarContrasena(){
    
    var boolContrasena;
    
    if($("#contrasena").val() == "")
    {
        $("#contrasenaError1").removeClass("hiddenElement");
        boolContrasena = false;
    }
    else
    {
        $("#contrasenaError1").addClass("hiddenElement");
        boolContrasena = true;
    }
    
    return boolContrasena;
}

function iniciarSesion(){
    
    var user = verificarUsuario();
    var pass = verificarContrasena();
    
    if(user == true && pass == true)
    {
        var rememberMe = $("#recuerdame").is(":checked");
    
        var jsonToSend =
        {
            "uUsuario" : $("#usuario").val(),
            "uContrasena" : $("#contrasena").val(),
            "remember" : rememberMe
        };

        $.ajax({
            url : "data/login.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                //alert("Bienvenido de vuelta " + jsonReceived.firstName + " " + jsonReceived.lastName);
                window.location.replace("home.html");
            },
            error : function(errorMessage){
                alert("No iniciaste sesión");
            }
        });   
    }
}

function verificarNombresRegistro(){
    var bool;
    
    if($("#nombresRegistro").val() == "")
    {
        $("#registroError1").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#registroError1").addClass("hiddenElement");
        bool = true;
    }
    
    return bool;
}

function verificarApellidosRegistro(){
    var bool;
    
    if($("#apellidosRegistro").val() == "")
    {
        $("#registroError2").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#registroError2").addClass("hiddenElement");
        bool = true;
    }
    
    return bool;
}

function verificarUsuarioRegistro(){
    var bool;
    
    if($("#usuarioRegistro").val() == "")
    {
        $("#registroError3").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#registroError3").addClass("hiddenElement");
        bool = true;
    }
    
    return bool;
}

function verificarContrasenaRegistro(){
    var bool;
    
    if($("#contrasenaRegistro").val() == "")
    {
        $("#registroError4").removeClass("hiddenElement");
        bool = false;
    }
    else
    {
        $("#registroError4").addClass("hiddenElement");
        bool = true;
    }
    
    return bool;
}

function registrarse(){
    
    var nombres = verificarNombresRegistro();
    var apellidos = verificarApellidosRegistro();
    var usuario = verificarUsuarioRegistro();
    var contrasena = verificarContrasenaRegistro();
    
    if(nombres == true && apellidos == true && usuario == true && contrasena == true)
    {
        var jsonToSend =
        {
            "uNombresRegistro"      :   $("#nombresRegistro").val(),
            "UApellidosRegistro"    :   $("#apellidosRegistro").val(),
            "uUsuarioRegistro"      :   $("#usuarioRegistro").val(),
            "uContrasenaRegistro"   :   $("#contrasenaRegistro").val()
        };


        $.ajax({
            url : "data/register.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Tu usuario ha sido registrado");
                window.location.replace("home.html");
            },
            error : function(errorMessage){
                alert("Tu usuario no ha sido registrado");
            }
        });   
    }
}

function eliminarCookie(){
    $.ajax({
        url : "data/eliminarCookie.php",
        type : "POST",
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonReceived){
            alert("Tus datos se han eliminado");
            window.location.replace("index.html");
        },
        error : function(errorMessage){
            alert("No hay datos por eliminar");
        }
    });
}
