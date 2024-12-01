<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config/database.php';

if (isset($_GET['action']) && $_GET['action'] === 'entries') {
    try {
        $stmt = $pdo->query("SELECT * FROM diary_entries ORDER BY created_at DESC");
        $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($entries);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
    exit;
} else {
    // Return status (your existing code)
    $response = [
        'timestamp' => date('Y-m-d H:i:s'),
        'php_version' => PHP_VERSION,
        'server' => $_SERVER['SERVER_SOFTWARE'],
        'database' => [
            'status' => 'connected',
            'message' => 'Database connection successful'
        ],
        'memory' => [
            'limit' => ini_get('memory_limit'),
            'usage' => memory_get_usage(true)
        ]
    ];
    echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'create') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate the input
    if (!isset($data['title']) || !isset($data['content']) || !isset($data['mood'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    try {
        $sql = "INSERT INTO diary_entries (title, content, mood, created_at, updated_at) 
                VALUES (:title, :content, :mood, NOW(), NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'],
            ':content' => $data['content'],
            ':mood' => $data['mood']
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Entry created successfully',
            'id' => $pdo->lastInsertId()
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
    exit;
} 