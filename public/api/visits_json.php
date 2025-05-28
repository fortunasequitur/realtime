<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$pdo = new PDO(
    'mysql:host=localhost;dbname=sobf5627_realtimegilang',
    'sobf5627_gilang',
    '@Gilang123',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
// Set timezone ke UTC
$pdo->exec("SET time_zone = '+00:00'");
$sql = "SELECT * FROM visits ORDER BY `timestamp` DESC";
echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC)); 