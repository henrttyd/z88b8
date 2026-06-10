export async function onRequest(context) {
    const { request, next } = context;
    const ua = (request.headers.get('User-Agent') || '').toLowerCase();
    
    const botPatterns = [
        'twitterbot', 'twitter external service', 'twitter card validator',
        'facebookexternalhit', 'linkedinbot', 'slackbot', 'whatsapp',
        'telegrambot', 'discordbot', 'redditbot', 'pinterest', 'tumblr',
        'snapchat', 'tiktokbot', 'embedly',
        'googlebot', 'bingbot', 'baiduspider', 'yandexbot', 'duckduckbot',
        'sogou', 'msnbot', 'applebot',
        'mj12bot', 'ahrefsbot', 'semrushbot', 'dotbot',
        'curl', 'wget', 'python-requests', 'python-urllib', 'scrapy',
        'go-http-client', 'java/', 'okhttp', 'libwww-perl',
        'headlesschrome', 'phantomjs', 'puppeteer', 'playwright', 'selenium',
        'bot', 'spider', 'crawler', 'scraper', 'fetch', 'monitor',
        'preview', 'validator'
    ];
    
    const isBot = botPatterns.some(p => ua.includes(p));
    const suspiciousUA = !ua || ua.length < 20;
    
    if (isBot || suspiciousUA) {
        return new Response(getDecoyPage(), {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=3600',
                'X-Robots-Tag': 'noindex, nofollow'
            }
        });
    }
    
    return next();
}

function getDecoyPage() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Michael Liu - Personal Portfolio</title>
<meta name="description" content="Independent designer and content creator sharing thoughts on minimalist design and creative work.">
</head>
<body style="font-family:Georgia,serif;max-width:680px;margin:60px auto;padding:0 24px;color:#333;line-height:1.7">
<h1>Michael Liu</h1>
<p style="color:#888;font-style:italic">Independent Designer · Writer · Quiet Observer</p>
<p>Welcome to my personal corner of the internet. I write occasionally about design philosophy, the tools I use, and the small daily rituals that shape creative work.</p>
<h2>About</h2>
<p>I'm a freelance designer based in a small coastal town. Most of my work involves brand identity, editorial design, and the occasional book cover.</p>
<h2>Contact</h2>
<p>For inquiries, please reach out via the contact form on my main site.</p>
<p style="margin-top:60px;color:#999;font-size:14px">&copy; 2026 Michael Liu</p>
</body>
</html>`;
}