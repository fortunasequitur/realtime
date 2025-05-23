<?php
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) exit;

// Koneksi DB ke database baru
$pdo = new PDO(
    'mysql:host=localhost;dbname=lazfsvyj_realtime',
    'lazfsvyj_realtime',
    '@Wisnudinar21',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$stmt = $pdo->prepare('
  INSERT INTO visits
    (
      ip, city, region, country,
      loc, org, timezone,
      user_agent, referer, is_mobile,
      connection_type, subsource, `timestamp`
    )
  VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
');

$stmt->execute([
  $data['ip'],             // 1
  $data['city'],           // 2
  $data['region'],         // 3
  $data['country'],        // 4
  $data['loc'],            // 5
  $data['org'],            // 6
  $data['tz'],             // 7
  $data['ua'],             // 8
  $data['referer'],        // 9
  $data['is_mobile'],      // 10
  $data['connection_type'],// 11
  $data['subsource'],      // 12
  $data['ts']              // 13
]); 