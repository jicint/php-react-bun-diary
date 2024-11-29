<?php
$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASSWORD');

// try {
//     $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     echo "Connected successfully to the database!<br>";
// } catch(PDOException $e) {
//     echo "Connection failed: " . $e->getMessage();
// }
//echo "PHP version: " . phpversion(); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React + PHP App</title>
</head>
<body>
    <div id="root"></div>
    <script src="/public/index.js"></script>
</body>
</html> 