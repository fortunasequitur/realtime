<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'sobf5627_gilang', '@Gilang123', 'sobf5627_realtimegilang');
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