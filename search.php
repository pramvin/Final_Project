<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require 'db.php';

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

if ($query === '') {
    echo json_encode(['confessions' => []]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM confessions WHERE confession LIKE ? AND is_nsfw = 0 ORDER BY timestamp DESC LIMIT 20");
$stmt->execute(['%' . $query . '%']);
$confessions = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'confessions' => $confessions,
    'query' => $query,
    'count' => count($confessions)
]);
?>
