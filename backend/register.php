<?php
header('Content-Type: application/json');
// Allow from any origin
header("Access-Control-Allow-Origin: *");
// Allow only specific methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Allow only specific headers
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight requests
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password);
   
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "User registration failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>
