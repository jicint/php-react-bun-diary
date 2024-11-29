<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASSWORD');

$status = [
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'database' => [
        'status' => 'unknown',
        'message' => ''
    ]
];

// Check database connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $status['database'] = [
        'status' => 'connected',
        'message' => 'Successfully connected to database'
    ];
} catch(PDOException $e) {
    $status['database'] = [
        'status' => 'error',
        'message' => 'Connection failed: ' . $e->getMessage()
    ];
}

// Add memory usage information
$status['memory'] = [
    'limit' => ini_get('memory_limit'),
    'usage' => memory_get_usage(true) / 1024 / 1024 . ' MB'
];

echo json_encode($status, JSON_PRETTY_PRINT); 