$(document).ready(function(){
    $("#buscarEtiqueta").on("click", checarEtiqueta);
    $("#buscarEtiqueta").on("click", buscarPublicaciones);
});

function buscarPublicaciones(){
    var validacion = checarEtiqueta();
    
    if(validacion == true)
    {
        var contenido = $("#etiquetaBuscar").val();
        var gato = "#";
        var hashtag = gato.concat(contenido);

        var jsonToSend =
        {
            "uEtiqueta" : hashtag   
        }

        //alert(jsonToSend.uEtiqueta);

        $.ajax({
            url : "data/buscarEtiqueta.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                $("#publicacionesEnBusqueda").html("");
                $.each(jsonReceived, function(index){
                    $("#publicacionesEnBusqueda").append(
                        '<div class="publicacion">' + 
                        '<h3 class="comentario">' + jsonReceived[index].contenido + '</h3>' + 
                        '<span class="etiqueta" style="color:blue">' + ' ' + jsonReceived[index].etiqueta + '</span>' + 
                        '<br/>' + 
                        '<span style="color:red" class="usuario">' + jsonReceived[index].username + '</span>'+
                        '<center><input type="submit" class="like" value="Like"/></center>' +
                        '</div>' + '<br/>'
                    );
                });
                
                // + '<center><input type="submit" class="like" value="Like"/></center>'
                
                if ( jsonReceived.blanco == "" ) {
                    $("#publicacionesEnBusqueda").html("");
                    $("#publicacionesEnBusqueda").append('<center><span style="color:gray"> No hay publicaciones con esa etiqueta</span></center>');
                }

            },
            error : function(errorMessage){
                alert("Sin conexión");
            }
        });

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

                    var texto = jsonReceived[index].contenido;

                    //alert(texto);

                    $('h3:contains('+ texto +')').append('<h6>[Te ha gustado esta publicación]</h6>');

                    //$('div:contains(h3:contains('+ texto +'))').find("input").css("background-color", "red");

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
                            window.location.replace("busqueda.html");
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
        
    }
}


function checarEtiqueta(){
    var bool;
    
    if($("#etiquetaBuscar").val() == "")
    {
       $("#errorBusqueda").removeClass("hiddenElement");
        bool = false;
        $("#publicacionesEnBusqueda").html("");
        $("#publicacionesEnBusqueda").append('<center><span style="color:gray">Realiza una búsqueda</span></center>');
    }
    else
    {
        $("#errorBusqueda").addClass("hiddenElement");
        bool = true;
    }
    
    return bool;
    
}