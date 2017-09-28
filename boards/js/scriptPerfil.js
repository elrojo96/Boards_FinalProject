$(document).ready(function(){
    
    $.ajax({
		url : "data/cargarNombre.php",
		type : "GET",
		dataType : "json",
		success : function(cookieJson){
			$("h1").text(cookieJson.firstName + ' ' + cookieJson.lastName);
            $("#usuarioEnPerfil").text('[' + cookieJson.username + ']')
            //alert("SI");
            //alert(cookieJson.firstName);
            //alert(cookieJson.lastName);
            //alert(cookieJson.username);
		},
		error : function(errorMessage){
			console.log(errorMessage.responseText);
		}

	});
    
    $.ajax({
        url : "data/cargarPublicacionesPropias.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            
            $.each(jsonReceived, function(index){
                
                $("#publicacionesEnPerfil").append(
                    '<div class="publicacion">' + '<h3>' + jsonReceived[index].contenido + '<span style="color:blue">' + ' ' + jsonReceived[index].etiqueta + '</span>' + '</h3>' +  '</div>' + '<br/>'
                );
            });
            
        },
        error : function(errorMessage){
            alert("No");
        }
    });
    
    //'<center><input type="submit" class="like" value="Like"/></center>' +
    
    $("#cerrarSesion").on("click", cerrarSesion);
    
    $("#volverPublicacionesPropias").hide();
    
    $("#publicacionesLike").on("click", function(){
        //alert("Hola");
        $("#publicacionesEnPerfil").addClass("hiddenElement");
        $("#publicacionesQueMeHanGustado").removeClass("hiddenElement");
        $("#volverPublicacionesPropias").show();
        $("#publicacionesLike").hide();
    });
    
    $("#volverPublicacionesPropias").on("click", function(){
        $("#publicacionesQueMeHanGustado").addClass("hiddenElement");
        $("#publicacionesEnPerfil").removeClass("hiddenElement");
        $("#publicacionesLike").show();
        $("#volverPublicacionesPropias").hide();
    });
    
    $.ajax({
         url : "data/cargarPublicacionesConLikes.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            
            $.each(jsonReceived, function(index){
                
                $("#publicacionesQueMeHanGustado").append(
                    '<div class="publicacion">' + '<h3>' + jsonReceived[index].contenido + '<span style="color:blue">' + ' ' + jsonReceived[index].etiqueta + '</span>' + '</h3>' + '<span style="color:red">' + jsonReceived[index].username + '</span>' + '</div>' + '<br/>'
                );
            });
        },
        error : function(errorMessage){
            alert("No");
        }
    });
});

function cerrarSesion(){
    $.ajax({
		url : "data/salir.php",
		type : "GET",
		dataType : "json",
		success : function(jsonReceived){
			window.location.replace("index.html");
		},
		error : function(errorMessage){
			alert("ADIOS");
		}

	});
}