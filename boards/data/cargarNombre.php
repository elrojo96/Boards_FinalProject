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
                    SELECT firstName, lastName, username
                    FROM users
                    WHERE username = '$nombreUsuario';
                ";
        
        $result = $conn -> query($sql);
        
        if($result -> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                $response = array("firstName" => $row["firstName"], "lastName" => $row["lastName"], "username" => $row["username"]);
            }
        }
        
        echo json_encode($response);
    }
?>