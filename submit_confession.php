<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require 'db.php';

function contains_nsfw($text) {
    $bad_words = ['badword1', 'badword2', 'badword3'];
    foreach ($bad_words as $word) {
        if (stripos($text, $word) !== false) return true;
    }
    return false;
}

$text = trim($_POST['confession_text'] ?? '');
if ($text === '') {
    echo json_encode(['success' => false, 'message' => 'Confession cannot be empty.']);
    exit;
}

$is_nsfw = contains_nsfw($text) ? 1 : 0;
$stmt = $pdo->prepare("INSERT INTO confessions (confession, is_nsfw) VALUES (:confession, :is_nsfw)");
$stmt->execute(['confession' => $text, 'is_nsfw' => $is_nsfw]);

echo json_encode(['success' => true, 'message' => 'Confession posted! 🎉']);
