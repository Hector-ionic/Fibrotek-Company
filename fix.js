const fs = require('fs');

const htmlFiles = ['index.html', 'nosotros.html', 'productos.html', 'proyectos.html', 'servicios.html'];

for (let file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Lazy loading
  content = content.replace(/<img(?![^>]*loading=)([^>]*)>/gi, '<img loading="lazy"$1>');
  content = content.replace(/<img loading="lazy" src="\.\/assets\/img\/logo\.png"/gi, '<img src="./assets/img/logo.png"');

  // 2. ARIA labels
  content = content.replace(/<button class="mob-close"/g, '<button class="mob-close" aria-label="Cerrar menú"');
  content = content.replace(/<button class="ham"/g, '<button class="ham" aria-label="Abrir menú"');
  content = content.replace(/<button id="btt"/g, '<button id="btt" aria-label="Volver arriba"');
  content = content.replace(/<a class="wa-fab"/g, '<a class="wa-fab" aria-label="Chat en WhatsApp"');
  content = content.replace(/<a class="soc" href="#"><i class="bi bi-facebook"><\/i><\/a>/g, '<a class="soc" href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>');
  content = content.replace(/<a class="soc" href="#"><i class="bi bi-instagram"><\/i><\/a>/g, '<a class="soc" href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>');
  content = content.replace(/<a class="soc" href="#"><i class="bi bi-tiktok"><\/i><\/a>/g, '<a class="soc" href="#" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>');
  content = content.replace(/<a class="soc" href="https:\/\/wa\.me\/59168124071"><i class="bi bi-whatsapp"><\/i><\/a>/g, '<a class="soc" href="https://wa.me/59168124071" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>');

  // 3. OG Tags
  if (file !== 'index.html') {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description"[\s\S]*?content="([^"]+)"[\s\S]*?\/>/);
    if (titleMatch && descMatch) {
      const title = titleMatch[1];
      const desc = descMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ');
      const ogTags = `\n  <meta property="og:title" content="${title}" />\n  <meta property="og:description" content="${desc}" />\n  <meta property="og:image" content="./assets/img/logo.png" />\n  <meta property="og:type" content="website" />\n  <meta property="og:url" content="https://fibrotek.bo/${file}" />`;
      content = content.replace(/(<meta name="description"[\s\S]*?content="[^"]+"[\s\S]*?\/>)/, `$1${ogTags}`);
    } else {
      console.log('Missed OG tags in', file);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}

// 4. JS ARIA fixes
let js = fs.readFileSync('js/main.js', 'utf8');
js = js.replace("d.className='car-dot'+(i===0?' on':'');", "d.className='car-dot'+(i===0?' on':'');\n      d.setAttribute('aria-label', 'Ir a diapositiva ' + (i+1));");
js = js.replace("btn.innerHTML='<i class=\"bi bi-x-lg\"></i>';", "btn.innerHTML='<i class=\"bi bi-x-lg\"></i>';\n    btn.setAttribute('aria-label', 'Cerrar imagen');");
fs.writeFileSync('js/main.js', js, 'utf8');

console.log('All fixes applied correctly with UTF-8 encoding.');
