import fs from 'fs';
const src=fs.readFileSync('index.html','utf8');
const gen=src.slice(src.indexOf('  function h(x,y)'),src.indexOf('  paths.forEach(function(o){var len'))
  .replace('W=Math.ceil(2300/S)+1,H=Math.ceil(1300/S)+1','W=Math.ceil(1200/S)+1,H=Math.ceil(630/S)+1');
const T={en:'I cook solid systems, then plate them clean.',id:'Saya masak sistem sampai matang, lalu sajikan dengan rapi.'};
for(const l of ['en','id']){
 fs.mkdirSync(`og/${l}/assets/fonts`,{recursive:true});
 for(const f of fs.readdirSync('assets/fonts'))fs.copyFileSync('assets/fonts/'+f,`og/${l}/assets/fonts/`+f);
 fs.copyFileSync('assets/sarimu-1-hero.png',`og/${l}/assets/sarimu-1-hero.png`);
 fs.copyFileSync('assets/gsap.min.js',`og/${l}/assets/gsap.min.js`);
 fs.copyFileSync('hyperframes.json',`og/${l}/hyperframes.json`);
 const css=src.slice(src.indexOf('@font-face'),src.indexOf('*{box-sizing'));
 fs.writeFileSync(`og/${l}/index.html`,`<!doctype html><html lang="${l}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1200, height=630"/><title>OG ${l}</title>
<script src="assets/gsap.min.js"></script><style>${css}
*{box-sizing:border-box}body{margin:0;background:#eef1ef}
#root{position:relative;width:1200px;height:630px;overflow:hidden;background:#eef1ef;font-family:'Geist',sans-serif;color:#15201c}
#contours{position:absolute;left:0;top:0;width:1200px;height:630px}
#contours path{fill:none;stroke:rgba(21,32,28,.16);stroke-width:1.2}#contours path.idx{stroke:rgba(21,32,28,.3);stroke-width:1.8}
.mono{font-family:'Geist Mono',monospace;font-weight:500;letter-spacing:.14em;text-transform:uppercase;font-size:20px;color:#56635d}
.tri{display:inline-block;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:15px solid #d9481a;margin-right:12px;vertical-align:-2px}
h1{position:absolute;left:70px;top:135px;margin:0;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:132px;line-height:.95;letter-spacing:-.03em}
.role{position:absolute;left:70px;top:432px;font-size:29px;font-weight:500;width:720px;white-space:nowrap;line-height:1.25}
.tag{position:absolute;left:70px;top:495px;font-size:23px;color:#56635d;width:560px;line-height:1.3}
.photo{position:absolute;right:70px;top:60px;width:330px;height:440px;border-radius:18px;overflow:hidden;border:2px solid rgba(21,32,28,.14);box-shadow:0 20px 50px rgba(21,32,28,.16)}
.photo img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.top{position:absolute;left:70px;top:60px}.url{position:absolute;right:70px;bottom:48px;font-family:'Geist Mono',monospace;font-weight:500;font-size:26px;background:#15201c;color:#eef1ef;border-radius:999px;padding:12px 30px}
.coord{position:absolute;right:70px;top:520px;width:330px;text-align:left;font-size:16px;letter-spacing:.08em}
</style></head><body><div id="root" data-composition-id="main" data-start="0" data-width="1200" data-height="630" data-duration="1">
<svg id="contours" viewBox="0 0 1200 630"></svg>
<div class="mono top"><i class="tri"></i>6.2088&deg; S, 106.8456&deg; E</div>
<h1>Abdus<br>Salim</h1>
<div class="role">Site Reliability Engineer &amp; Fullstack Developer</div>
<div class="tag">${T[l]}</div>
<div class="photo"><img src="assets/sarimu-1-hero.png"></div>

<div class="url">abdussalim.my.id</div>
</div><script>(function(){${gen}
window.__timelines={main:gsap.timeline({paused:true})};})();</script></body></html>`);
}
