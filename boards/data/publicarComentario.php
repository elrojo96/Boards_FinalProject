<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "boards";
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error)
	{
		header('HTTP/1.1 500 Bad connection to Database');
		die("The server is down, we couldn't establish the DB connection");
	}
	else
	{
        $etiqueta = $_POST["uEtiqueta"];
        $comentario = $_POST["uComentario"];
        
        //echo $etiqueta;
        //echo $comentario;
        
        if(isset($_COOKIE["username"]))
        {
            $usuario = $_COOKIE["username"];
        }
        
        $sql =  "
                    INSERT INTO publicaciones(username, etiqueta, contenido)
                    VALUES('$usuario', '$etiqueta', '$comentario')
                ";
        
        if(mysqli_query($conn, $sql))
        {
            echo json_encode("Tu comentario ha sido ingresado a la base de datos"); 
        }

        //echo json_encode(array("usuario" => $usuario, "etiqueta" => $etiqueta, "comentario" => $comentario));
    }
?>