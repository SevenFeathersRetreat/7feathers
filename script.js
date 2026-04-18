// ═══════════════════════════════════════
// CODES & EMAIL OBFUSCATION
// ═══════════════════════════════════════
var CODE_BIZ    = 'groundwork7';
var CODE_SPIRIT = 'homecoming7';
var EM = ['info','7feathersretreat','com'];

function getEmail(){ return EM[0]+'@'+EM[1]+'.'+EM[2]; }

function injectEmail(){
  var addr = getEmail();
  document.querySelectorAll('[data-role="email-link"]').forEach(function(el){
    var subj = el.getAttribute('data-subject')||'Hello';
    el.href = 'mailto:'+addr+'?subject='+encodeURIComponent(subj);
  });
  document.querySelectorAll('[data-role="email-text"]').forEach(function(el){
    el.textContent = addr;
  });
}

// ═══════════════════════════════════════
// GATE UNLOCK — both codes open same page
// ═══════════════════════════════════════
function unlock(){
  var input = document.getElementById('accessCode');
  if(!input) return;
  var v = input.value.trim().toLowerCase();
  var err = document.getElementById('gateError');
  if(v === CODE_BIZ || v === CODE_SPIRIT){
    showMain();
  } else {
    if(err) err.style.display='block';
    input.value='';
    input.focus();
  }
}

function showMain(){
  var gate = document.getElementById('gate');
  var main = document.getElementById('page-main');
  var nav  = document.getElementById('siteNav');
  var ftr  = document.getElementById('siteFooter');
  if(gate) gate.style.display='none';
  if(main) main.style.display='block';
  if(nav)  nav.style.display='flex';
  if(ftr)  ftr.style.display='block';
  window.scrollTo(0,0);
  injectEmail();
  buildNav();
  observeReveal();
  drawAllLogos();
  startHeroCanvas('heroCanvas');
  drawSmallLogo('ctaCanvasBiz');
  drawCardFeathers();
}

// ═══════════════════════════════════════
// NAV — single unified set
// ═══════════════════════════════════════
var NAV_LINKS = [
  {label:'The Concept',      href:'#b-concept'},
  {label:'The Model',        href:'#b-model'},
  {label:'The Market',       href:'#b-market'},
  {label:'The Founder',      href:'#b-founder'},
  {label:'Retreat Vision',   href:'#s-sanctuary'},
  {label:'The Values',       href:'#s-healing'},
  {label:'Walk With Us',     href:'#s-founder'},
];

function buildNav(){
  var wrap = document.getElementById('navLinks');
  if(!wrap) return;
  wrap.innerHTML='';
  NAV_LINKS.forEach(function(item){
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.addEventListener('click',function(e){
      e.preventDefault();
      var t = document.querySelector(item.href);
      if(t) t.scrollIntoView({behavior:'smooth'});
      var nl = document.getElementById('navLinks');
      if(nl) nl.classList.remove('open');
    });
    wrap.appendChild(a);
  });
}

function toggleMobileNav(){
  var nl = document.getElementById('navLinks');
  if(nl) nl.classList.toggle('open');
}

window.addEventListener('scroll',function(){
  var nav = document.getElementById('siteNav');
  if(!nav) return;
  if(window.scrollY > 60){ nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
},{passive:true});

// ═══════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════
function submitContactForm(e){
  e.preventDefault();
  var name    = document.getElementById('cf-name')    ? document.getElementById('cf-name').value    : '';
  var email   = document.getElementById('cf-email')   ? document.getElementById('cf-email').value   : '';
  var role    = document.getElementById('cf-role')    ? document.getElementById('cf-role').value    : '';
  var message = document.getElementById('cf-message') ? document.getElementById('cf-message').value : '';
  var subject = encodeURIComponent('Seven Feathers Partnership Inquiry: '+role);
  var body    = encodeURIComponent('Name: '+name+'\nEmail: '+email+'\nRole: '+role+'\n\n'+message);
  var addr    = getEmail();
  window.location.href = 'mailto:'+addr+'?subject='+subject+'&body='+body;
  var success = document.getElementById('cf-success');
  if(success){ success.style.display='block'; }
  e.target.reset();
}

// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════
function observeReveal(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
}

// ═══════════════════════════════════════
// LOGO DRAWING
// ═══════════════════════════════════════
var CHAKRA_COLS = [
  '#C9A8E8','#9B8DC4','#A8CBE8','#8FBA84','#F0D885','#F2B07A','#E89DA3'
];

function drawLogo(canvasId){
  var c = document.getElementById(canvasId);
  if(!c) return;
  var DPR = Math.min(window.devicePixelRatio||1,2);
  var S   = parseInt(c.getAttribute('data-size')||c.getAttribute('width')||'56',10);
  c.width  = S*DPR; c.height = S*DPR;
  c.style.width  = S+'px'; c.style.height = S+'px';
  var ctx = c.getContext('2d');
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.clearRect(0,0,S,S);
  var cx=S/2, cy=S/2+S*0.04, R=S*0.29;
  ctx.fillStyle='#D4A017'; ctx.beginPath(); ctx.arc(cx,cy,S*0.09,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#F2C84B'; ctx.beginPath(); ctx.arc(cx,cy,S*0.063,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#FFF5CC'; ctx.beginPath(); ctx.arc(cx,cy,S*0.032,0,Math.PI*2); ctx.fill();
  for(var i=0;i<7;i++){
    var angle=-Math.PI/2+(Math.PI*2/7)*i;
    var fx=cx+Math.cos(angle)*R, fy=cy+Math.sin(angle)*R;
    ctx.save(); ctx.translate(fx,fy); ctx.rotate(angle+Math.PI/2);
    var fs=S*0.18;
    ctx.beginPath();
    ctx.moveTo(0,fs*0.5);
    ctx.bezierCurveTo(-fs*0.25,fs*0.3,-fs*0.35,-fs*0.2,-fs*0.25,-fs*0.7);
    ctx.quadraticCurveTo(0,-fs*0.9,0,-fs);
    ctx.quadraticCurveTo(0,-fs*0.9,fs*0.25,-fs*0.7);
    ctx.bezierCurveTo(fs*0.35,-fs*0.2,fs*0.25,fs*0.3,0,fs*0.5);
    ctx.closePath();
    ctx.fillStyle=CHAKRA_COLS[i]; ctx.globalAlpha=0.82; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,fs*0.4); ctx.lineTo(0,-fs*0.9);
    ctx.strokeStyle=CHAKRA_COLS[i]; ctx.lineWidth=0.4; ctx.globalAlpha=0.35; ctx.stroke();
    ctx.restore();
  }
}

function drawSmallLogo(canvasId){ drawLogo(canvasId); }
function drawAllLogos(){ drawLogo('navLogo'); }

// ═══════════════════════════════════════
// HERO CANVAS ANIMATION
// ═══════════════════════════════════════
function startHeroCanvas(canvasId){
  var c = document.getElementById(canvasId);
  if(!c) return;
  var DPR  = Math.min(window.devicePixelRatio||1,2);
  var SIZE = 320;
  c.width  = SIZE*DPR; c.height = SIZE*DPR;
  c.style.width = SIZE+'px'; c.style.height = SIZE+'px';
  var ctx = c.getContext('2d');
  ctx.setTransform(DPR,0,0,DPR,0,0);
  var CX=SIZE/2, CY=SIZE/2, CIRCLE_R=SIZE*0.38;

  var chakras=[
    {base:'#C9A8E8',mid:'#B48FD8',dark:'#9B70C0',light:'#EDE0F8',shaft:'#A080C0',wisp:'#D8C0F0'},
    {base:'#9B8DC4',mid:'#8474B0',dark:'#6B58A0',light:'#CEC4E0',shaft:'#7A68A8',wisp:'#B8ACD4'},
    {base:'#A8CBE8',mid:'#88B8D8',dark:'#68A0C8',light:'#D4E8F6',shaft:'#80AAC8',wisp:'#C0D8F0'},
    {base:'#8FBA84',mid:'#72A466',dark:'#5A8A4A',light:'#C0DDB8',shaft:'#6A9860',wisp:'#A8D0A0'},
    {base:'#F0D885',mid:'#E0C460',dark:'#C8A840',light:'#FAF0D0',shaft:'#D0B050',wisp:'#F5E8B0'},
    {base:'#F2B07A',mid:'#E09050',dark:'#C87838',light:'#FAD8C0',shaft:'#D08848',wisp:'#F6C8A0'},
    {base:'#E89DA3',mid:'#D07880',dark:'#B85868',light:'#F6D0D4',shaft:'#C07078',wisp:'#F0B8BC'},
  ];

  function eSmooth(t){ return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2; }

  function makeNoise(seed){
    var s=seed*9301+49297; s=s%233280;
    return {lenMul:0.7+((s%100)/100)*0.6, angleMul:0.8+((s%50)/50)*0.4};
  }

  var feathers=[];
  for(var i=0;i<7;i++){
    var angle=-Math.PI/2+(Math.PI*2/7)*i;
    feathers.push({
      i:i, col:chakras[i],
      tx:CX+Math.cos(angle)*CIRCLE_R, ty:CY+Math.sin(angle)*CIRCLE_R,
      sx:CX+Math.cos(angle)*(CIRCLE_R*0.3)+(Math.random()-0.5)*60,
      sy:CY-SIZE*0.55,
      tr:angle+Math.PI/2+(Math.random()-0.5)*0.3,
      sr:angle+Math.PI/2+(Math.random()-0.5)*1.2,
      x:0,y:0,rot:0,opacity:0,phase:'waiting',settleT:0,
      delay:i*0.28+0.15,
      fallDur:1.2+Math.random()*0.3,
      swayFreq:0.7+Math.random()*0.5,
      swayAmpX:18+Math.random()*14,
      swayAmpRot:0.18+Math.random()*0.12,
      restSwayAmp:0.018+Math.random()*0.012,
      restSwayPh:Math.random()*Math.PI*2,
      noise:makeNoise(i*17+3),
    });
  }

  function drawFeather(f){
    var col=f.col, noise=f.noise;
    ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.rot);
    var L=82, W=20;
    ctx.beginPath(); ctx.moveTo(0,L*0.35);
    ctx.bezierCurveTo(-W*0.3,L*0.18,-W*0.85,0,-W*0.88,-L*0.15);
    ctx.bezierCurveTo(-W*0.85,-L*0.35,-W*0.6,-L*0.52,-W*0.18,-L*0.58);
    ctx.quadraticCurveTo(-W*0.05,-L*0.62,0,-L*0.64);
    ctx.quadraticCurveTo(W*0.04,-L*0.62,W*0.17,-L*0.57);
    ctx.bezierCurveTo(W*0.57,-L*0.51,W*0.82,-L*0.33,W*0.85,-L*0.13);
    ctx.bezierCurveTo(W*0.8,L*0.02,W*0.28,L*0.18,0,L*0.35);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.35,0,-L*0.64);
    bg.addColorStop(0,col.light+'CC'); bg.addColorStop(0.2,col.base+'AA');
    bg.addColorStop(0.6,col.mid+'77'); bg.addColorStop(1,col.dark+'44');
    ctx.fillStyle=bg; ctx.globalAlpha=f.opacity; ctx.fill();
    var barbN=14;
    for(var side=-1;side<=1;side+=2){
      for(var j=0;j<barbN;j++){
        var frac=j/(barbN-1);
        var ry=L*0.28-frac*(L*0.28+L*0.58), rx=0;
        var barbBase=W*(0.5+0.5*Math.sin(frac*Math.PI))*(0.6+0.4*(1-frac));
        var barbLen=barbBase*noise.lenMul;
        var bA=side*(0.35+0.45*frac)*noise.angleMul;
        var ex=rx+Math.sin(bA)*barbLen*side, ey=ry-Math.cos(bA)*barbLen*0.5;
        var cpx=rx+Math.sin(bA)*barbLen*0.45*side, cpy=ry-Math.cos(bA)*barbLen*0.28;
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.quadraticCurveTo(cpx,cpy,ex,ey);
        var bw=(0.22+0.38*(1-frac))*noise.lenMul; ctx.lineWidth=bw;
        ctx.globalAlpha=f.opacity*(0.08+0.14*(1-frac));
        ctx.strokeStyle=side===-1?col.mid:col.base; ctx.stroke();
      }
    }
    ctx.globalAlpha=f.opacity;
    ctx.beginPath(); ctx.moveTo(0,L*0.33); ctx.lineTo(0,-L*0.62);
    ctx.strokeStyle=col.shaft; ctx.lineWidth=1.2; ctx.globalAlpha=f.opacity*0.35; ctx.stroke();
    ctx.restore();
  }

  function drawSun(opacity,time){
    ctx.save(); ctx.globalAlpha=opacity;
    var g1=ctx.createRadialGradient(CX,CY,10,CX,CY,28);
    g1.addColorStop(0,'#FAE8A0'); g1.addColorStop(1,'#D4A017');
    ctx.fillStyle=g1; ctx.beginPath(); ctx.arc(CX,CY,28,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#F2C84B'; ctx.beginPath(); ctx.arc(CX,CY,20,0,Math.PI*2); ctx.fill();
    var cg=ctx.createRadialGradient(CX-2,CY-2,0,CX,CY,12);
    cg.addColorStop(0,'#FFFEF0'); cg.addColorStop(1,'#FFF5CC');
    ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(CX,CY,12,0,Math.PI*2); ctx.fill();
    var pulse=1+Math.sin(time*1.5)*0.08;
    for(var r=0;r<8;r++){
      var a=(Math.PI*2/8)*r+time*0.05;
      ctx.globalAlpha=opacity*(0.2+Math.sin(time*0.8+r)*0.08);
      ctx.strokeStyle='#F2C84B'; ctx.lineWidth=1.2; ctx.lineCap='round';
      ctx.beginPath();
      ctx.moveTo(CX+Math.cos(a)*30*pulse,CY+Math.sin(a)*30*pulse);
      ctx.lineTo(CX+Math.cos(a)*38*pulse,CY+Math.sin(a)*38*pulse);
      ctx.stroke();
    }
    ctx.restore();
  }

  var startTime=null;
  function update(ts){
    if(!startTime) startTime=ts;
    var elapsed=(ts-startTime)/1000;
    ctx.clearRect(0,0,SIZE,SIZE);
    var sunOp=Math.min(1,Math.max(0,(elapsed-2.5)/2.5));
    drawSun(sunOp,elapsed);
    for(var i=0;i<feathers.length;i++){
      var f=feathers[i], t=elapsed-f.delay;
      if(t<0){ f.phase='waiting'; f.opacity=0; }
      else if(t<f.fallDur){
        f.phase='falling';
        var p=eSmooth(t/f.fallDur);
        var sway=(1-p)*(1-p)*(1-p);
        f.x=f.sx+(f.tx-f.sx)*p+Math.sin(t*f.swayFreq)*f.swayAmpX*sway;
        f.y=f.sy+(f.ty-f.sy)*p;
        f.rot=f.sr+(f.tr-f.sr)*p+Math.sin(t*f.swayFreq*0.7+1.2)*f.swayAmpRot*sway;
        f.opacity=Math.min(1,t/1.2);
      } else {
        f.phase='resting';
        f.x=f.tx; f.y=f.ty;
        f.rot=f.tr+Math.sin(elapsed*0.4+f.restSwayPh)*f.restSwayAmp;
        f.opacity=1;
      }
    }
    for(var i=0;i<feathers.length;i++){ if(feathers[i].opacity>0) drawFeather(feathers[i]); }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ═══════════════════════════════════════
// CARD FEATHERS (values flip cards)
// — canvas is 80x160, feather sized to fit
// ═══════════════════════════════════════
function drawCardFeathers(){
  var chakras=[
    {base:'#C9A8E8',mid:'#B48FD8',dark:'#9B70C0',light:'#EDE0F8',shaft:'#A080C0',wisp:'#D8C0F0'},
    {base:'#9B8DC4',mid:'#8474B0',dark:'#6B58A0',light:'#CEC4E0',shaft:'#7A68A8',wisp:'#B8ACD4'},
    {base:'#A8CBE8',mid:'#88B8D8',dark:'#68A0C8',light:'#D4E8F6',shaft:'#80AAC8',wisp:'#C0D8F0'},
    {base:'#8FBA84',mid:'#72A466',dark:'#5A8A4A',light:'#C0DDB8',shaft:'#6A9860',wisp:'#A8D0A0'},
    {base:'#F0D885',mid:'#E0C460',dark:'#C8A840',light:'#FAF0D0',shaft:'#D0B050',wisp:'#F5E8B0'},
    {base:'#F2B07A',mid:'#E09050',dark:'#C87838',light:'#FAD8C0',shaft:'#D08848',wisp:'#F6C8A0'},
    {base:'#E89DA3',mid:'#D07880',dark:'#B85868',light:'#F6D0D4',shaft:'#C07078',wisp:'#F0B8BC'},
  ];
  var biases=[0.04,0.08,-0.06,0.02,0.10,-0.09,0.05];

  function drawFeatherOnCard(canvas, col, idx, opacity){
    var SW=canvas.getAttribute('data-w')||canvas.parentElement.offsetWidth||160;
    var SH=canvas.getAttribute('data-h')||canvas.parentElement.offsetHeight||320;
    SW=parseInt(SW); SH=parseInt(SH);
    var DPR=Math.min(window.devicePixelRatio||1,2);
    canvas.width=SW*DPR; canvas.height=SH*DPR;
    canvas.style.width=SW+'px'; canvas.style.height=SH+'px';
    var ctx=canvas.getContext('2d');
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,SW,SH);
    ctx.save();
    // anchor at 80% down, centered
    ctx.translate(SW/2, SH*0.80);
    var bias=biases[idx]||0;
    ctx.rotate(bias*0.3);
    var L=SH*0.88, W=SW*0.38;
    ctx.beginPath(); ctx.moveTo(0,L*0.20);
    ctx.bezierCurveTo(-W*0.25+bias*8,L*0.10,-W*0.85+bias*4,0,-W*0.88+bias*3,-L*0.14);
    ctx.bezierCurveTo(-W*0.85+bias*2,-L*0.34,-W*0.6+bias,-L*0.52,-W*0.18,-L*0.58);
    ctx.quadraticCurveTo(-W*0.05,-L*0.62,0,-L*0.64);
    ctx.quadraticCurveTo(W*0.04,-L*0.62,W*0.17,-L*0.57);
    ctx.bezierCurveTo(W*0.57-bias,-L*0.51,W*0.82-bias*2,-L*0.32,W*0.85-bias*3,-L*0.12);
    ctx.bezierCurveTo(W*0.8-bias*4,L*0.02,W*0.24-bias*8,L*0.10,0,L*0.20);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.20,0,-L*0.64);
    bg.addColorStop(0,col.light+'EE');
    bg.addColorStop(0.2,col.base+'CC');
    bg.addColorStop(0.5,col.mid+'99');
    bg.addColorStop(1,col.dark+'55');
    ctx.fillStyle=bg; ctx.globalAlpha=opacity; ctx.fill();
    var barbN=22;
    for(var side=-1;side<=1;side+=2){
      for(var j=0;j<barbN;j++){
        var frac=j/(barbN-1);
        var ry=L*0.18-frac*(L*0.18+L*0.58);
        var rx=bias*3*(1-frac);
        var barbBase=W*(0.5+0.5*Math.sin(frac*Math.PI))*(0.65+0.35*(1-frac));
        var barbLen=barbBase*0.9;
        var bA=side*(0.32+0.48*frac+bias*0.15);
        var ex=rx+Math.sin(bA)*barbLen*side;
        var ey=ry-Math.cos(bA)*barbLen*0.52;
        var cpx=rx+Math.sin(bA)*barbLen*0.45*side;
        var cpy=ry-Math.cos(bA)*barbLen*0.28;
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.quadraticCurveTo(cpx,cpy,ex,ey);
        ctx.lineWidth=0.4+0.6*(1-frac);
        ctx.globalAlpha=opacity*(0.09+0.16*(1-frac));
        ctx.strokeStyle=side===-1?col.mid:col.base; ctx.stroke();
      }
    }
    ctx.globalAlpha=opacity*0.4;
    ctx.beginPath(); ctx.moveTo(bias*4,L*0.18); ctx.lineTo(bias*1.5,-L*0.62);
    ctx.strokeStyle=col.shaft; ctx.lineWidth=1.2; ctx.stroke();
    ctx.restore();
  }

  function renderCardFeathers(){
    document.querySelectorAll('canvas.fc-feather-lg').forEach(function(canvas){
      var idx=parseInt(canvas.getAttribute('data-index'),10);
      drawFeatherOnCard(canvas,chakras[idx],idx,0.92);
    });
    document.querySelectorAll('canvas.fc-feather-lg-back').forEach(function(canvas){
      var idx=parseInt(canvas.getAttribute('data-index'),10);
      drawFeatherOnCard(canvas,chakras[idx],idx,0.30);
    });
  }

  // Run after layout so offsetWidth/Height are real
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', renderCardFeathers);
  } else {
    setTimeout(renderCardFeathers, 50);
  }
}

// ═══════════════════════════════════════
// DECK VIEWER
// ═══════════════════════════════════════
function openDeck(){
  var overlay = document.getElementById('deckOverlay');
  if(!overlay) return;
  overlay.style.display='flex';
  document.body.style.overflow='hidden';
}
function closeDeck(){
  var overlay = document.getElementById('deckOverlay');
  if(overlay) overlay.style.display='none';
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape') closeDeck();
});

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded',function(){
  injectEmail();
  startHeroCanvas('gateCanvas');
});
