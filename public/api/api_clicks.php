<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Koneksi ke database
$conn = new mysqli('localhost', 'sobf5627_gilang', '@Gilang123', 'sobf5627_realtimegilang');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed', 'detail' => $conn->connect_error]));
}

// Insert klik
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(['error' => 'Invalid JSON input']);
        $conn->close();
        exit;
    }
    $sub_id   = $data['sub_id'] ?? null;
    $ip       = $data['ip'] ?? null;
    $time     = $data['time'] ?? null;
    $date     = $data['date'] ?? null;
    $country  = $data['country'] ?? null;
    $region   = $data['region'] ?? null;
    $city     = $data['city'] ?? null;
    $os       = $data['os'] ?? null;
    $referer  = $data['referer'] ?? null;
    $loc      = $data['loc'] ?? null;
    $org      = $data['org'] ?? null;
    $timezone = $data['timezone'] ?? null;
    $user_agent = $data['user_agent'] ?? null;
    $stmt = $conn->prepare("INSERT INTO clicks (sub_id, ip, time, date, country, region, city, os, referer, loc, org, timezone, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "sssssssssssss",
        $sub_id,
        $ip,
        $time,
        $date,
        $country,
        $region,
        $city,
        $os,
        $referer,
        $loc,
        $org,
        $timezone,
        $user_agent
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