<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Koneksi ke database
$conn = new mysqli('localhost', 'lazfsvyj_realtime', '@Wisnudinar21', 'lazfsvyj_realtime');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

// Insert klik
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO clicks (sub_id, ip, time, date, country, region, city, os, referer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssssss",
        $data['sub_id'],
        $data['ip'],
        $data['time'],
        $data['date'],
        $data['country'],
        $data['region'],
        $data['city'],
        $data['os'],
        $data['referer']
    );
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['error' => $stmt->error]);
    }
    $stmt->close();
    $conn->close();
    exit;
}

// Get klik by date
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['date'])) {
    $date = $conn->real_escape_string($_GET['date']);
    $result = $conn->query("SELECT * FROM clicks WHERE date = '$date'");
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
    $conn->close();
    exit;
}

echo json_encode(['error' => 'Invalid request']);
$conn->close();
?> 