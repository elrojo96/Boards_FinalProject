<?php
    header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "boards";
    
    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn -> connect_error){
        header("HTTP/1.1 500 Bad Connection to the DataBase");
        die("The servers is down, please try again later.");
    }else{
        
        $sql =  "
                    SELECT p.ID, p.username, etiqueta, contenido, ID_USUARIO
                    FROM likes l
                        JOIN publicaciones p
                            ON l.ID_PUBLICACION = p.ID
                        JOIN users u
                            ON l.ID_USUARIO = u.username;
                ";
        
        $result = $conn -> query($sql);
        
        while($row = $result -> fetch_assoc()){
            $response[] = array
            (
                "publicacionID" => $row["ID"],
                "usuarioPublicacion" => $row["username"],
                "contenido" => $row["contenido"],
                "ID_USUARIO" => $row["ID_USUARIO"]
            );   
        }
        
        echo json_encode($response);
    }
?>
