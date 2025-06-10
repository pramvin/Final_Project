<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Connect to DB
require 'db.php';

// Profanity filter
function contains_nsfw($text) {
    $bad_words = ['babi', 'bangsat', 'kontol'];
    foreach ($bad_words as $word) {
        if (stripos($text, $word) !== false) return true;
    }
    return false;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST allowed']);
    exit;
}

// Get input
$text = trim($_POST['confession_text'] ?? '');

if ($text === '') {
    echo json_encode(['success' => false, 'message' => 'Confession cannot be empty.']);
    exit;
}

// Check and insert
$is_nsfw = contains_nsfw($text) ? 1 : 0;

try {
    $stmt = $pdo->prepare("INSERT INTO confessions (confession, is_nsfw) VALUES (:confession, :is_nsfw)");
    $stmt->execute(['confession' => $text, 'is_nsfw' => $is_nsfw]);

    $response = [
        'success' => true,
        'message' => 'Confession posted! 🎉'
    ];

    if ($is_nsfw) {
        $response['warning'] = '⚠️ This confession contains NSFW content.';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

// 🔥 ABSOLUTELY NO CODE OR OUTPUT AFTER THIS POINT 🔥
