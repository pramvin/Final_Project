<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require 'db.php';

$id = intval($_POST['confession_id'] ?? 0);
$type = $_POST['reaction_type'] ?? '';

$allowed = ['love','laugh','cry','shy'];
if (!$id || !in_array($type, $allowed)) {
    echo json_encode(['success'=>false]);
    exit;
}

// Whitelist column name
$column = $type . '_reacts';
$stmt = $pdo->prepare("UPDATE confessions SET $column = $column + 1 WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(['success'=>true]);
?>
