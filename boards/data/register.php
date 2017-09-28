<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "boards";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) 
	{
	    header('HTTP/1.1 500 Bad connection to Database');
	    die("The server is down, we couldn't establish the DB connection");
	}
	else
	{
        $userName = $_POST['uUsuarioRegistro'];
        
        $sql = "SELECT username FROM users WHERE username = '$userName'";
        
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0)
		{
			header('HTTP/1.1 409 Conflict, Username already in use please select another one');
		    die("Username already in use.");
		}
		else
		{
            $userPassword = $_POST['uContrasenaRegistro'];
			$userFirstName = $_POST['uNombresRegistro'];
			$userLastName = $_POST['UApellidosRegistro'];
            
            $sql = "INSERT INTO users (firstName, lastName, username, passwrd) VALUES ('$userFirstName', '$userLastName', '$userName', '$userPassword')";
            
            if (mysqli_query($conn, $sql)) 
	    	{
                setcookie("username", $userName,     time() + 3600*24*30);
                setcookie("password", $userPassword, time() + 3600*24*30);
                
                session_start();
				$_SESSION["firstName"] = $userFirstName;
				$_SESSION["lastName"] = $userLastName;
                
			    echo json_encode("New record created successfully");   
            }
            else 
			{
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
			    die("Error: " . $sql . "\n" . mysqli_error($conn));
            }
        }    
    }
?>
