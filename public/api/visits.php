<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$pdo = new PDO(
    'mysql:host=localhost;dbname=sobf5627_realtimegilang',
    'sobf5627_gilang',
    '@Gilang123',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
$date = $_GET['date'] ?? date('Y-m-d');
$stmt = $pdo->prepare("SELECT * FROM visits WHERE DATE(`timestamp`) = ?");
$stmt->execute([$date]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)); 