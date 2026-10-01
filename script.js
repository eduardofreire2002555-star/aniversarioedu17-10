const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -7% 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%';const hero=document.querySelector('.hero-bg');if(hero && !document.querySelector('.hero-video'))hero.style.transform=`scale(1.08) translateY(${Math.min(scrollY*.025,18)}px)`},{passive:true});
const petals=document.querySelector('.petals');if(petals)for(let i=0;i<18;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;animation-delay:${Math.random()*9}s;animation-duration:${7+Math.random()*8}s;opacity:${.25+Math.random()*.5}`;petals.appendChild(s)}
const IMG={
 feast:'./assets/feast_table.webp',
 sushi:'./assets/food_rolls.webp',
 nigiri:'./assets/nigiri_close.webp',
 drinks:'./assets/red_drink.webp'
};
const categories={
 'Carne':{imgs:[IMG.feast],text:'Pratos quentes e preparos com carne para quem quer sair do sushibar sem sair da experiência Jappa.'},
 'Frango':{imgs:[IMG.feast],text:'Opções quentes com frango e sabores marcantes — incluindo referências como o Satay Perfeito divulgado pelo Jappa.'},
 'Legumes':{imgs:[IMG.feast,IMG.sushi],text:'Legumes aparecem em acompanhamentos, pratos quentes e combinações leves para compartilhar.'},
 'Quentes':{imgs:[IMG.feast,IMG.nigiri],text:'Uma seleção visual de pratos servidos quentes, pensada para mostrar que a mesa vai muito além do sushi.'},
 'Vegetariano':{imgs:[IMG.feast,IMG.sushi],text:'Alternativas leves e combinações com vegetais para quem prefere uma experiência sem peixe ou carne.'},
 'Entradas':{imgs:[IMG.sushi,IMG.feast],text:'Belisques e entradas para abrir a noite, dividir no centro da mesa e começar a comemoração.'},
 'Tempurá':{imgs:[IMG.nigiri,IMG.sushi],text:'Crocância, contraste e apresentação: a ideia é mostrar o lado frito e quente do menu.'},
 'Autorais':{imgs:[IMG.drinks,IMG.feast],text:'Criações da casa que misturam apresentação, ingredientes e personalidade — nos pratos e no bar.'},
 'Clássicos':{imgs:[IMG.drinks,IMG.sushi],text:'Clássicos para acompanhar a noite, do sushibar ao balcão de drinks.'},
 'Saquê':{imgs:[IMG.drinks],text:'O brinde japonês da noite, ao lado dos coquetéis e outras opções do bar.'}
};
const modal=document.getElementById('dishModal'),mImg=document.getElementById('modalImage'),mTitle=document.getElementById('modalTitle'),mText=document.getElementById('modalText'),mCount=document.getElementById('modalCount');let current=null,idx=0;
function renderModal(){const d=categories[current];mImg.style.animation='none';void mImg.offsetWidth;mImg.style.animation='';mImg.src=d.imgs[idx];mImg.alt=`Seleção visual: ${current}`;mTitle.textContent=current;mText.textContent=d.text;mCount.textContent=`${String(idx+1).padStart(2,'0')} / ${String(d.imgs.length).padStart(2,'0')}`}
function openModal(name){current=name;idx=0;renderModal();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.category)));
document.querySelector('.modal-close')?.addEventListener('click',closeModal);modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.getElementById('modalPrev')?.addEventListener('click',()=>{const n=categories[current].imgs.length;idx=(idx-1+n)%n;renderModal()});document.getElementById('modalNext')?.addEventListener('click',()=>{const n=categories[current].imgs.length;idx=(idx+1)%n;renderModal()});

// v3 — cursor em formato de hashi: aberto em repouso, fecha ao clicar
if (window.matchMedia('(pointer:fine)').matches) {
  const hc = document.createElement('div');
  hc.className = 'hashi-cursor';
  hc.setAttribute('aria-hidden','true');
  hc.innerHTML = '<i class="hashi-stick one"></i><i class="hashi-stick two"></i>';
  document.body.appendChild(hc);
  let x = innerWidth/2, y = innerHeight/2, tx=x, ty=y;
  const draw=()=>{ x += (tx-x)*.38; y += (ty-y)*.38; hc.style.left=x+'px'; hc.style.top=y+'px'; requestAnimationFrame(draw) };
  draw();
  document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;hc.style.opacity='1'},{passive:true});
  document.addEventListener('mouseleave',()=>hc.style.opacity='0');
  document.addEventListener('mouseenter',()=>hc.style.opacity='1');
  document.addEventListener('mouseover',e=>hc.classList.toggle('is-hover',!!e.target.closest('a,button,[role="button"],[data-category]')));
  document.addEventListener('mousedown',e=>{ if(e.button===0){ hc.classList.remove('is-clicking'); void hc.offsetWidth; hc.classList.add('is-clicking'); }});
  document.addEventListener('mouseup',()=>setTimeout(()=>hc.classList.remove('is-clicking'),140));
}

// v4 — parallax suave no vídeo do topo
const heroVideo = document.querySelector('.hero-video');
window.addEventListener('scroll',()=>{
  if(heroVideo) heroVideo.style.transform=`scale(1.035) translateY(${Math.min(scrollY*.018,14)}px)`;
},{passive:true});

// v4 — trilha vermelha/dourada seguindo o hashi em todo o site
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const canvas=document.createElement('canvas');
  canvas.className='cursor-trail';
  canvas.setAttribute('aria-hidden','true');
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let dpr=Math.min(devicePixelRatio||1,2), w=0, h=0;
  const particles=[];
  const resize=()=>{w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)};
  resize(); addEventListener('resize',resize,{passive:true});
  let lx=-100,ly=-100;
  const addPetal=(x,y,burst=false)=>{
    const n=burst?12:1;
    for(let i=0;i<n;i++) particles.push({x,y,vx:(Math.random()-.5)*(burst?3.2:1.2),vy:(Math.random()-.5)*(burst?3.2:1.2)-.15,r:Math.random()*Math.PI,s:3+Math.random()*5,life:1,spin:(Math.random()-.5)*.18,gold:Math.random()<.16});
    if(particles.length>90) particles.splice(0,particles.length-90);
  };
  document.addEventListener('mousemove',e=>{
    const dx=e.clientX-lx,dy=e.clientY-ly;
    if(dx*dx+dy*dy>70){addPetal(e.clientX,e.clientY);lx=e.clientX;ly=e.clientY}
  },{passive:true});
  document.addEventListener('mousedown',e=>{if(e.button===0)addPetal(e.clientX,e.clientY,true)});
  const tick=()=>{
    ctx.clearRect(0,0,w,h);
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.012;p.r+=p.spin;p.life-=.022;
      if(p.life<=0){particles.splice(i,1);continue}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.globalAlpha=Math.max(0,p.life)*.9;
      ctx.fillStyle=p.gold?'#d9a65d':'#d8382f';
      ctx.beginPath();ctx.moveTo(-p.s*.9,0);ctx.quadraticCurveTo(0,-p.s*.58,p.s,0);ctx.quadraticCurveTo(0,p.s*.58,-p.s*.9,0);ctx.fill();ctx.restore();
    }
    requestAnimationFrame(tick);
  };
  tick();
}

// v4 — halo sutil segue o mouse dentro de cards/fotos
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.food-card,.venue-grid figure,.book-card').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')},{passive:true});
  });
}

// v6 — touch/mobile extras: swipe na galeria e fallback de vídeo no iOS/Android
(() => {
  const media = document.querySelector('.modal-media');
  if (media) {
    let startX = 0, startY = 0;
    media.addEventListener('touchstart', e => {
      const t = e.changedTouches[0]; startX = t.clientX; startY = t.clientY;
    }, {passive:true});
    media.addEventListener('touchend', e => {
      if (!modal.classList.contains('open')) return;
      const t = e.changedTouches[0], dx = t.clientX - startX, dy = t.clientY - startY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        const n = categories[current].imgs.length;
        idx = dx < 0 ? (idx + 1) % n : (idx - 1 + n) % n;
        renderModal();
      }
    }, {passive:true});
  }

  const v = document.querySelector('.hero-video');
  if (v) {
    v.muted = true;
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    const tryPlay = () => v.play().catch(()=>{});
    tryPlay();
    document.addEventListener('touchstart', () => { if (v.paused) tryPlay(); }, {passive:true, once:true});
    document.addEventListener('visibilitychange', () => { if (!document.hidden && v.paused) tryPlay(); });
  }
})();
