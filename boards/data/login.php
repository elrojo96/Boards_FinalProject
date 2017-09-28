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
        $uName = $_POST["uUsuario"];
		$uPassword = $_POST["uContrasena"];
        
        $sql = "SELECT firstName, lastName FROM users WHERE username='$uName' AND passwrd='$uPassword'";
        
        $result = $conn -> query($sql);
        
        if($result -> num_rows > 0){
            
			$remember = $_POST["remember"];
			if ($remember == "true")
			{
				setcookie("username", $uName,     time() + 3600*24*30);
                setcookie("password", $uPassword, time() + 3600*24*30);
			}
            
            while($row = $result -> fetch_assoc()){
                $response = array("firstName" => $row["firstName"], "lastName" => $row["lastName"]);
            }
            
            session_start();
            $_SESSION["firstName"] = $row["fName"];
            $_SESSION["lastName"] = $row["lName"];
            
            echo json_encode($response);
        }else{
            header("HTTP/1.1 406 User not found");
            die("Wrong credentials provided.");
        }
    }
?>
