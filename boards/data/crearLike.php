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
        
        $uComentario = $_POST["uComentario"];
        $uEtiqueta = $_POST["uEtiqueta"];
        $uUsuario = $_POST["uUsuario"];
        
        $sql =  "
                    SELECT ID
                    FROM publicaciones
                    WHERE username = '$uUsuario'
                    AND contenido = '$uComentario'
                ";
        
        $result = $conn -> query($sql);
        
        if($result -> num_rows > 0){
            //echo json_encode("HOLA");
        }
        
        while($row = $result -> fetch_assoc()){
            $response = array("ID" => $row["ID"]);
        }
        
        echo json_encode($response);
        
    }
?>