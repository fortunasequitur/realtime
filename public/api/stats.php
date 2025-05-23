<?php
// stats.php - Display visitor log with Tailwind CSS styling

// 1) Database connection
$pdo = new PDO(
    'mysql:host=localhost;dbname=lazfsvyj_realtime',
    'lazfsvyj_realtime',
    '@Wisnudinar21',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// Define bot regex
define('BOT_REGEX', 'bot|crawl|spider|facebookexternalhit');

// 2) OS detection helper
function detectOS(string $ua): string {
    $ua = strtolower($ua);
    if (strpos($ua, 'windows')    !== false) return 'Windows';
    if (strpos($ua, 'android')    !== false) return 'Android';
    if (strpos($ua, 'iphone')     !== false) return 'iOS';
    if (strpos($ua, 'ipad')       !== false) return 'iPad';
    if (strpos($ua, 'macintosh')  !== false) return 'MacOS';
    if (strpos($ua, 'linux')      !== false) return 'Linux';
    return 'Unknown';
}

// 3) Fetch rows (excluding bots)
$sql = "
    SELECT
      `timestamp`, subsource, country,
      region, city, user_agent, ip, referer
    FROM visits
    WHERE user_agent NOT REGEXP '" . BOT_REGEX . "'
    ORDER BY `timestamp` DESC
";
$rows = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Visitor Log</title>
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-800">
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Visitor Log</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-50">
          <tr class="text-sm font-medium text-gray-700 uppercase tracking-wider">
            <th class="px-4 py-2">Time</th>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Country</th>
            <th class="px-4 py-2">Region</th>
            <th class="px-4 py-2">City</th>
            <th class="px-4 py-2">OS</th>
            <th class="px-4 py-2">IP</th>
            <th class="px-4 py-2">Referer</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <?php foreach ($rows as $r):
            $time    = htmlspecialchars($r['timestamp'] ?? '', ENT_QUOTES);
            $id      = htmlspecialchars($r['subsource'] ?? '', ENT_QUOTES);
            $country = htmlspecialchars($r['country']   ?? '', ENT_QUOTES);
            $region  = htmlspecialchars($r['region']    ?? '', ENT_QUOTES);
            $city    = htmlspecialchars($r['city']      ?? '', ENT_QUOTES);
            $os      = detectOS($r['user_agent'] ?? '');
            $ip      = htmlspecialchars($r['ip']        ?? '', ENT_QUOTES);
            $ref     = htmlspecialchars($r['referer']   ?? '', ENT_QUOTES);
          ?>
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-2 text-sm"><?= $time ?></td>
            <td class="px-4 py-2 text-sm"><?= $id ?></td>
            <td class="px-4 py-2 text-sm"><?= $country ?></td>
            <td class="px-4 py-2 text-sm"><?= $region ?></td>
            <td class="px-4 py-2 text-sm"><?= $city ?></td>
            <td class="px-4 py-2 text-sm"><?= $os ?></td>
            <td class="px-4 py-2 text-sm"><?= $ip ?></td>
            <td class="px-4 py-2 text-sm truncate"><?= $ref ?: '-' ?></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html> 