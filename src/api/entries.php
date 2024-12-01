<?php
header('Content-Type: application/json');

// Sample data for testing
$entries = [
    [
        'id' => 1,
        'title' => 'Test Entry',
        'content' => 'This is a test entry',
        'mood' => 'happy',
        'created_at' => '2024-03-20T10:00:00',
        'updated_at' => '2024-03-20T10:00:00'
    ]
];

echo json_encode($entries); 