<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$network = $_GET['network'] ?? '';
$subid = $_GET['subid'] ?? '';
$payout = $_GET['payout'] ?? '';
$country = $_GET['country'] ?? '';
// date_default_timezone_set('Asia/Jakarta'); // HAPUS atau KOMENTARI baris ini jika ada
$time = gmdate('Y-m-d H:i:s');

if (!$network || !$subid || !$payout || !$country) {
    echo json_encode(['error' => 'Missing parameters.']);
    exit;
}

$conn = new mysqli('localhost', 'sobf5627_gilang', '@Gilang123', 'sobf5627_realtimegilang');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO conversions (network, subid, payout, country, time) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssdss", $network, $subid, $payout, $country, $time);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?> 