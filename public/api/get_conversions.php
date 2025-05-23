<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'lazfsvyj_realtime', '@Wisnudinar21', 'lazfsvyj_realtime');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$result = $conn->query("SELECT * FROM conversions ORDER BY time DESC LIMIT 100");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
$conn->close();
?> 