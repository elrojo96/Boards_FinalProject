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
        
        if (isset($_COOKIE["username"]))
        {
            $nombreUsuario = $_COOKIE["username"];
        }
        
        $sql =  "
                    SELECT u.username, etiqueta, contenido
                    FROM users u INNER JOIN publicaciones p
                    WHERE u.username = p.username AND u.username = '$nombreUsuario';
                ";
        
        $result = $conn -> query($sql);
        
        while($row = $result -> fetch_assoc()){
            $response[] = array
            (
                "username" => $row["username"], "etiqueta" => $row["etiqueta"], "contenido" => $row["contenido"]
            );   
        }
        
        echo json_encode($response);
    }
?>
