// Emergency backup build script
const fs = require('fs')

console.log('🆘 Emergency build starting...')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const html = `<!DOCTYPE html>
<html>
<head>
    <title>Tintbot.ai</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-6xl font-bold mb-4">Tintbot.ai</h1>
        <p class="text-xl">AI-powered platform for window tinting professionals</p>
        <div class="mt-8 text-2xl">🚀 Coming Soon!</div>
    </div>
</body>
</html>`

fs.writeFileSync('dist/index.html', html)
console.log('✅ Emergency build complete!')
