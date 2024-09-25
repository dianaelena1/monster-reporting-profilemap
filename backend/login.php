<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

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

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required"]);
    exit;
}
$stmt = $conn->prepare("SELECT email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($email, $hashedPassword);
    $stmt->fetch();

    $name = explode('.', explode('@', $email)[0])[0];

    if (password_verify($password, $hashedPassword)) {
        echo json_encode(["message" => "Login successful", "name" => $name]);
    } else {
        echo json_encode(["error" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["error" => "Invalid email or password"]);
}

$stmt->close();
$conn->close();
?>
