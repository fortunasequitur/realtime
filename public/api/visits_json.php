<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$pdo = new PDO(
    'mysql:host=localhost;dbname=lazfsvyj_realtime',
    'lazfsvyj_realtime',
    '@Wisnudinar21',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
$sql = "SELECT * FROM visits ORDER BY `timestamp` DESC";
echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC)); 