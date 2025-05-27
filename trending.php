<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require 'db.php';

$stmt = $pdo->query('SELECT *, (love_reacts + laugh_reacts + cry_reacts + shy_reacts) AS total_reacts FROM confessions WHERE is_nsfw=0 ORDER BY total_reacts DESC, timestamp DESC LIMIT 3');
$confessions = $stmt->fetchAll();
echo json_encode(['confessions' => $confessions]);
