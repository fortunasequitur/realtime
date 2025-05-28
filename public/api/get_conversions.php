<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'sobf5627_gilang', '@Gilang123', 'sobf5627_realtimegilang');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Set timezone ke UTC
$conn->query("SET time_zone = '+00:00'");

$filter = $_GET['filter'] ?? 'today';
$start = $_GET['start'] ?? null;
$end = $_GET['end'] ?? null;

// Default: today UTC+0
if ($filter === 'today') {
    $today = gmdate('Y-m-d');
    $result = $conn->query("SELECT * FROM conversions WHERE DATE(time) = '$today' ORDER BY time DESC");
} elseif ($filter === 'yesterday') {
    $yesterday = gmdate('Y-m-d', strtotime('-1 day'));
    $result = $conn->query("SELECT * FROM conversions WHERE DATE(time) = '$yesterday' ORDER BY time DESC");
} elseif ($filter === 'thisMonth') {
    $first = gmdate('Y-m-01');
    $last = gmdate('Y-m-t');
    $result = $conn->query("SELECT * FROM conversions WHERE DATE(time) BETWEEN '$first' AND '$last' ORDER BY time DESC");
} elseif ($filter === 'lastMonth') {
    $first = gmdate('Y-m-01', strtotime('first day of last month'));
    $last = gmdate('Y-m-t', strtotime('last day of last month'));
    $result = $conn->query("SELECT * FROM conversions WHERE DATE(time) BETWEEN '$first' AND '$last' ORDER BY time DESC");
} elseif ($filter === 'custom' && $start && $end) {
    $result = $conn->query("SELECT * FROM conversions WHERE time BETWEEN '$start 00:00:00' AND '$end 23:59:59' ORDER BY time DESC");
} else {
    // Default fallback: tampilkan 100 data terbaru
    $result = $conn->query("SELECT * FROM conversions ORDER BY time DESC LIMIT 100");
}
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
$conn->close();
?> 