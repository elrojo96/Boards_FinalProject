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
        
        $publicacion = $_POST["identificadorpublicacion"];
        
        if (isset($_COOKIE["username"]))
        {
            $usuario = $_COOKIE["username"];   
        }
        
        
        //echo json_encode(array("identificador" => $publicacion, "usuario" => $usuario));
        
        $sql =  "
                    INSERT INTO likes(ID_PUBLICACION, ID_USUARIO)
                    VALUES('$publicacion','$usuario')
                ";
        
        if (mysqli_query($conn, $sql))
        {
            echo json_encode("Se pudo crear un like");    
        }
        
    }
?>