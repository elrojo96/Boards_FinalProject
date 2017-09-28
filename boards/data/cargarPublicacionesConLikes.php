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
        $sql = 
            "
                SELECT p.ID, p.username, etiqueta, contenido, ID_USUARIO
                    FROM likes l
                        JOIN publicaciones p
                            ON l.ID_PUBLICACION = p.ID
                        JOIN users u
                            ON l.ID_USUARIO = u.username
            ";
        
        $result = $conn -> query($sql);
        
        while($row = $result -> fetch_assoc()){
            $response[] = array
            (
                "username" => $row["username"],
                "etiqueta" => $row["etiqueta"],
                "contenido" => $row["contenido"]
            );   
        }
        
        echo json_encode($response);
    }
?>