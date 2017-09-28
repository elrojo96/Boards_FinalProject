$(document).ready(function(){
    $.ajax({
        url : "data/cargarPublicaciones.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            var i = 0;
            $.each(jsonReceived, function(index){
                $("#publicaciones").append(
                    '<div class="publicacion" class="publicacion' + i + '">' + 
                    '<h3 class="comentario">' + jsonReceived[index].contenido + '</h3>' +
                    '<span style="color:blue" class="etiqueta">' + ' ' + jsonReceived[index].etiqueta + '</span>' + 
                    '<br/>' +
                    '<span style="color:red" class="usuario" id="boton' + i + '">' + jsonReceived[index].username + '</span>' +
                    '<br/>' +
                    '<input type="submit" class="like" value="Like"/>'+ 
                    '</div>' + 
                    '<br/>'
                );
                i++;
            });
            
        },
        error : function(errorMessage){
            alert("No");
        }
    });
    
    $("#publicar").on("click", function(){
        $("#publicaciones").addClass("hiddenElement");
        $("#creacionPublicacion").removeClass("hiddenElement");
        $("#publicar").hide();
    });
    
    $("#volverApublicaciones").on("click", function(){
        $("#publicar").show();
        $("#publicaciones").removeClass("hiddenElement");
        $("#creacionPublicacion").addClass("hiddenElement");
    });
    
    $("#publicarPublicacion").on("click", verificarEtiqueta);
    $("#publicarPublicacion").on("click", verificarComentario);
    $("#publicarPublicacion").on("click", publicar);
    
    $.ajax({
        url : "data/checarLikes.php",
        type : "GET",
        datatype : "json",
        success : function(jsonReceived){

            $.each(jsonReceived, function(index){
                //alert(jsonReceived[index].publicacionID);
                //alert(jsonReceived[index].usuarioPublicacion);
                //alert(jsonReceived[index].contenido);
                //alert(jsonReceived[index].ID_USUARIO);
                //alert(index);

                //$('div:contains(h3:contains('+ texto +'))').find("input").css("background-color", "red");
                
                
                
                var texto = jsonReceived[index].contenido;
                //$('h3:contains('+ texto +')').append('<h6>[Te ha gustado esta publicación]</h6>');
                
                $('h3:contains('+ texto +')').append('<h6>[Te ha gustado esta publicación]</h6>');
                
            });
        },
        error : function(errorMessage){
            alert("NO");   
        }
    });
    
    $(document).on('click', '.like', function () {
        
        var publicacion = $(this).closest('.publicacion');
        
        var comentario = $(publicacion).find('.comentario').text();
        var etiqueta = $(publicacion).find('.etiqueta').text();
        var usuario = $(publicacion).find('.usuario').text();
        
        //alert(comentario);
        //alert(etiqueta);
        //alert(usuario);
        
        var jsonToSend = {
            "uComentario" : comentario,
            "uEtiqueta"  : etiqueta,
            "uUsuario"   : usuario
        };
        
        //alert(jsonToSend.uComentario);
        //alert(jsonToSend.uEtiqueta);
        //alert(jsonToSend.uUsuario);
        
        var identificadorPublicacion;
        
        $.ajax({
            url : "data/crearLike.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                
                //alert(jsonReceived.comentario);
                //alert(jsonReceived.etiqueta);
                //alert(jsonReceived.ID);
                //alert(jsonReceived.identificador);
                //alert("SI");
                
                identificadorPublicacion = jsonReceived.ID;
                
                //alert(identificadorPublicacion);
                
                
                // SEGUNDO LIKE //
                
                var jsonToSend2 = {
                    "identificadorpublicacion" : identificadorPublicacion
                };


                $.ajax({
                    url : "data/crearLikeDos.php",
                    type : "POST",
                    data : jsonToSend2,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonReceived){
                        //alert(jsonReceived.identificador);
                        //alert(jsonReceived.usuario);
                        //alert("SI");
                        window.location.replace("home.html");
                    },
                    error : function(errorMessage){
                        alert("NO");
                    }
                });
                //////////////////////////////
            },
            error : function(errorMessage){
                alert("NO");
            }
        });    
    });
});

function verificarEtiqueta(){
    var bool;
    
    if($("#etiquetaParaPublicar").val() == "")
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

function verificarComentario(){
    var bool;
    
    if($("#comentarioParaPublicar").val() == "")
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

function publicar(){
    var etiqueta = verificarEtiqueta();
    var comentario =  verificarComentario();
    
    if(etiqueta == true && comentario == true)
    {   
        var contenido = $("#etiquetaParaPublicar").val();
        var gato = "#";
        var hashtag = gato.concat(contenido);
        
        
        var jsonToSend =
        {
            "uEtiqueta" : hashtag,
            "uComentario" : $("#comentarioParaPublicar").val()
        };
        
        //alert(jsonToSend.uEtiqueta);
        //alert(jsonToSend.uComentario);
        
        $.ajax({
            url : "data/publicarComentario.php",
            type : "POST",
            data : jsonToSend,
            success : function(jsonReceived){
                //alert(jsonReceived.usuario);
                //alert(jsonReceived.etiqueta);
                //alert(jsonReceived.comentario);
                //alert("SI");
                $("#creacionPublicacion").addClass("hiddenElement");
                $("#publicaciones").removeClass("hiddenElement");
                $("#publicar").show();
                window.location.replace("home.html");
            },
            error : function(errorMessage){
                alert("Tu comentario no ha sido ingresado a la base de datos");
            }
        });
    }
}