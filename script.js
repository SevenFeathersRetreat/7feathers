// ═══════════════════════════════════════
// CODES & EMAIL OBFUSCATION
// ═══════════════════════════════════════
var CODE_BIZ    = 'grownwork7';
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
// GATE UNLOCK
// ═══════════════════════════════════════
function unlock(){
  var input = document.getElementById('accessCode');
  if(!input) return;
  var v = input.value.trim().toLowerCase();
  var err = document.getElementById('gateError');
  if(v === CODE_BIZ){
    showVersion('business');
  } else if(v === CODE_SPIRIT){
    showVersion('spirit');
  } else {
    if(err) err.style.display='block';
    input.value='';
    input.focus();
  }
}

function showVersion(ver){
  var gate = document.getElementById('gate');
  var biz  = document.getElementById('page-business');
  var spi  = document.getElementById('page-spirit');
  var nav  = document.getElementById('siteNav');
  var ftr  = document.getElementById('siteFooter');
  if(gate) gate.style.display='none';
  if(biz)  biz.style.display  = ver==='business' ? 'block' : 'none';
  if(spi)  spi.style.display  = ver==='spirit'   ? 'block' : 'none';
  if(nav)  nav.style.display  = 'flex';
  if(ftr)  ftr.style.display  = 'block';
  window.scrollTo(0,0);
  injectEmail();
  buildNav(ver);
  observeReveal();
  drawAllLogos();
  startHeroCanvas(ver==='business' ? 'heroCanvas' : 'heroCanvasSpirit');
  drawSmallLogo('ctaCanvasBiz');
  drawSmallLogo('ctaCanvasSpirit');
  drawCardFeathers();
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
var NAV_BIZ = [
  {label:'The Concept',   href:'#b-concept'},
  {label:'The Model',     href:'#b-model'},
  {label:'The Market',    href:'#b-market'},
  {label:'The Founder',   href:'#b-founder'},
];
var NAV_SPIRIT = [
  {label:'The Land',      href:'#s-land'},
  {label:'The Sanctuary', href:'#s-sanctuary'},
  {label:'Healing',       href:'#s-healing'},
  {label:'The Founder',   href:'#s-founder'},
];

function buildNav(ver){
  var wrap = document.getElementById('navLinks');
  if(!wrap) return;
  wrap.innerHTML='';
  var links = ver==='business' ? NAV_BIZ : NAV_SPIRIT;
  links.forEach(function(item){
    var a = document.createElement('a');
    a.href  = item.href;
    a.textContent = item.label;
    a.addEventListener('click',function(e){
      e.preventDefault();
      var t = document.querySelector(item.href);
      if(t) t.scrollIntoView({behavior:'smooth'});
      // close mobile nav if open
      var nl = document.getElementById('navLinks');
      if(nl) nl.classList.remove('open');
    });
    wrap.appendChild(a);
  });
}

// Mobile nav toggle
function toggleMobileNav(){
  var nl = document.getElementById('navLinks');
  if(nl) nl.classList.toggle('open');
}

// Nav scroll shrink
window.addEventListener('scroll',function(){
  var nav = document.getElementById('siteNav');
  if(!nav) return;
  if(window.scrollY > 60){ nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
},{passive:true});

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
// LOGO DRAWING (gate + nav + small CTA)
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
  // sun
  ctx.fillStyle='#D4A017'; ctx.beginPath(); ctx.arc(cx,cy,S*0.09,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#F2C84B'; ctx.beginPath(); ctx.arc(cx,cy,S*0.063,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#FFF5CC'; ctx.beginPath(); ctx.arc(cx,cy,S*0.032,0,Math.PI*2); ctx.fill();
  // feathers
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

function drawSmallLogo(canvasId){
  drawLogo(canvasId);
}

function drawAllLogos(){
  drawLogo('gateLogo');
  drawLogo('navLogo');
}

// ═══════════════════════════════════════
// HERO FEATHER CANVAS ANIMATION
// ═══════════════════════════════════════
var heroAnimRunning = false;

function startHeroCanvas(canvasId){
  if(heroAnimRunning) return;
  heroAnimRunning = true;

  function mulberry32(a){
    return function(){ a|=0; a=a+0x6D2B79F5|0;
      var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t;
      return((t^t>>>14)>>>0)/4294967296; };
  }
  var rng=mulberry32(42);

  var canvas=document.getElementById(canvasId);
  if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var SIZE=600;
  canvas.width=SIZE*DPR; canvas.height=SIZE*DPR;
  canvas.style.width='100%'; canvas.style.maxWidth='280px';
  ctx.setTransform(DPR,0,0,DPR,0,0);

  var chakras=[
    {base:'#C9A8E8',mid:'#B48FD8',dark:'#9B70C0',light:'#EDE0F8',shaft:'#A080C0',wisp:'#D8C0F0'},
    {base:'#9B8DC4',mid:'#8474B0',dark:'#6B58A0',light:'#CEC4E0',shaft:'#7A68A8',wisp:'#B8ACD4'},
    {base:'#A8CBE8',mid:'#88B8D8',dark:'#68A0C8',light:'#D4E8F6',shaft:'#80AAC8',wisp:'#C0D8F0'},
    {base:'#8FBA84',mid:'#72A466',dark:'#5A8A4A',light:'#C0DDB8',shaft:'#6A9860',wisp:'#A8D0A0'},
    {base:'#F0D885',mid:'#E0C460',dark:'#C8A840',light:'#FAF0D0',shaft:'#D0B050',wisp:'#F5E8B0'},
    {base:'#F2B07A',mid:'#E09050',dark:'#C87838',light:'#FAD8C0',shaft:'#D08848',wisp:'#F6C8A0'},
    {base:'#E89DA3',mid:'#D07880',dark:'#B85868',light:'#F6D0D4',shaft:'#C07078',wisp:'#F0B8BC'},
  ];

  var CX=SIZE/2, CY=SIZE/2, CIRCLE_R=120;
  var targets=chakras.map(function(_,i){
    var angle=-Math.PI/2+(Math.PI*2/7)*i;
    return{x:CX+Math.cos(angle)*CIRCLE_R,y:CY+Math.sin(angle)*CIRCLE_R,angle:angle};
  });

  function Feather(i){
    this.i=i; this.col=chakras[i];
    var angle=Math.PI*2/7*i-Math.PI/2;
    this.sx=CX+Math.cos(angle)*SIZE*0.55+(rng()-0.5)*80;
    this.sy=-60-rng()*180;
    this.sr=(rng()-0.5)*2.0;
    this.tx=targets[i].x; this.ty=targets[i].y;
    this.tr=targets[i].angle+Math.PI/2;
    this.x=this.sx; this.y=this.sy; this.rot=this.sr;
    this.delay=0.2+i*0.5+(rng()-0.5)*0.2;
    this.fallDur=3.2+rng()*1.0;
    this.swayFreq=0.8+rng()*0.5;
    this.swayAmpX=20+rng()*25;
    this.swayAmpRot=0.12+rng()*0.15;
    this.restSwayPh=rng()*Math.PI*2;
    this.restSwayAmp=0.008+rng()*0.006;
    this.len=78+rng()*16; this.wMul=0.9+rng()*0.2; this.curve=(rng()-0.5)*0.1;
    this.barbN=22+Math.floor(rng()*5);
    this.barbNoise=[];
    for(var b=0;b<60;b++) this.barbNoise.push({lenMul:0.7+rng()*0.6,angleBias:(rng()-0.5)*0.14,gap:rng()<0.1});
    this.downWisps=[];
    for(var d=0;d<12;d++) this.downWisps.push({angle:(rng()-0.5)*2.5,dx:(rng()-0.5)*8,dy:this.len*0.25+rng()*this.len*0.12,ext:10+rng()*8});
    this.phase='waiting'; this.opacity=0; this.settleT=0;
  }

  var feathers=chakras.map(function(_,i){ return new Feather(i); });
  function eSmooth(t){ return t*t*(3-2*t); }

  function drawFeather(f){
    ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.rot); ctx.globalAlpha=f.opacity;
    var L=f.len,W=16*f.wMul,bias=f.curve,col=f.col;
    ctx.beginPath(); ctx.moveTo(0,L*0.35);
    ctx.bezierCurveTo(-W*0.18+bias*5,L*0.2,-W*0.6+bias*3,0,-W*0.65+bias*2,-L*0.12);
    ctx.bezierCurveTo(-W*0.62+bias*2,-L*0.28,-W*0.42+bias,-L*0.42,-W*0.14,-L*0.46);
    ctx.quadraticCurveTo(-W*0.04,-L*0.5,0,-L*0.52);
    ctx.quadraticCurveTo(W*0.04,-L*0.5,W*0.14,-L*0.46);
    ctx.bezierCurveTo(W*0.42-bias,-L*0.42,W*0.62-bias*2,-L*0.28,W*0.65-bias*2,-L*0.12);
    ctx.bezierCurveTo(W*0.6-bias*3,0,W*0.18-bias*5,L*0.2,0,L*0.35);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.35,0,-L*0.52);
    bg.addColorStop(0,col.light+'CC'); bg.addColorStop(0.2,col.base+'AA');
    bg.addColorStop(0.55,col.mid+'88'); bg.addColorStop(1,col.dark+'44');
    ctx.fillStyle=bg; ctx.fill();
    ctx.globalAlpha=f.opacity*0.18;
    var ig=ctx.createRadialGradient(-W*0.1,-L*0.1,0,0,-L*0.15,W*0.7);
    ig.addColorStop(0,col.light); ig.addColorStop(1,'transparent');
    ctx.fillStyle=ig; ctx.fill(); ctx.globalAlpha=f.opacity;
    ctx.beginPath(); ctx.moveTo(0,L*0.32); ctx.bezierCurveTo(bias*4,L*0.1,bias*2,-L*0.25,bias,-L*0.5);
    ctx.strokeStyle=col.shaft; ctx.lineWidth=0.8; ctx.globalAlpha=f.opacity*0.3; ctx.stroke();
    for(var side=-1;side<=1;side+=2){
      for(var j=0;j<f.barbN;j++){
        var frac=j/(f.barbN-1);
        var noise=f.barbNoise[j]||{lenMul:1,angleBias:0,gap:false};
        if(noise.gap) continue;
        var ry=L*0.28-frac*(L*0.28+L*0.48), rx=bias*3*(1-frac);
        var barbBase=W*(0.5+0.5*Math.sin(frac*Math.PI))*(0.6+0.3*(1-frac));
        var barbLen=barbBase*0.8*noise.lenMul;
        var bA=side*(0.28+0.45*frac+noise.angleBias);
        var ex=rx+Math.sin(bA)*barbLen*side, ey=ry-Math.cos(bA)*barbLen*0.5;
        var cpx=rx+Math.sin(bA)*barbLen*0.42*side, cpy=ry-Math.cos(bA)*barbLen*0.28;
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.quadraticCurveTo(cpx,cpy,ex,ey);
        var bw=(0.22+0.38*(1-frac))*noise.lenMul; ctx.lineWidth=bw;
        ctx.globalAlpha=f.opacity*(0.08+0.14*(1-frac));
        ctx.strokeStyle=side===-1?col.mid:col.base; ctx.stroke();
      }
    }
    ctx.globalAlpha=f.opacity*0.07;
    for(var k=0;k<f.downWisps.length;k++){
      var dw=f.downWisps[k];
      ctx.beginPath(); ctx.moveTo(dw.dx,dw.dy);
      ctx.quadraticCurveTo(dw.dx+Math.sin(dw.angle)*8,dw.dy-4,dw.dx+Math.sin(dw.angle)*14,dw.dy-dw.ext);
      ctx.lineWidth=0.3; ctx.strokeStyle=col.wisp; ctx.stroke();
    }
    ctx.restore();
  }

  function drawSun(opacity,time){
    ctx.save(); ctx.globalAlpha=opacity;
    var g0=ctx.createRadialGradient(CX,CY,0,CX,CY,80);
    g0.addColorStop(0,'rgba(242,200,75,0.18)'); g0.addColorStop(0.4,'rgba(242,200,75,0.06)'); g0.addColorStop(1,'rgba(242,200,75,0)');
    ctx.fillStyle=g0; ctx.beginPath(); ctx.arc(CX,CY,80,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=opacity*0.13; ctx.beginPath(); ctx.arc(CX,CY,CIRCLE_R-5,0,Math.PI*2);
    ctx.strokeStyle='#F2C84B'; ctx.lineWidth=12; ctx.filter='blur(6px)'; ctx.stroke(); ctx.filter='none';
    ctx.globalAlpha=opacity;
    var g1=ctx.createRadialGradient(CX,CY,10,CX,CY,28);
    g1.addColorStop(0,'#FAE8A0'); g1.addColorStop(1,'#D4A017');
    ctx.fillStyle=g1; ctx.beginPath(); ctx.arc(CX,CY,28,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#F2C84B'; ctx.beginPath(); ctx.arc(CX,CY,20,0,Math.PI*2); ctx.fill();
    var cg=ctx.createRadialGradient(CX-2,CY-2,0,CX,CY,12);
    cg.addColorStop(0,'#FFFEF0'); cg.addColorStop(1,'#FFF5CC');
    ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(CX,CY,12,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#F2C84B'; ctx.lineCap='round';
    var pulse=1+Math.sin(time*1.5)*0.08;
    for(var r=0;r<8;r++){
      var a=(Math.PI*2/8)*r+time*0.05;
      ctx.globalAlpha=opacity*(0.2+Math.sin(time*0.8+r)*0.08);
      ctx.lineWidth=1.2; ctx.beginPath();
      ctx.moveTo(CX+Math.cos(a)*30*pulse,CY+Math.sin(a)*30*pulse);
      ctx.lineTo(CX+Math.cos(a)*38*pulse,CY+Math.sin(a)*38*pulse);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawConns(time,sunOp){
    for(var i=0;i<feathers.length;i++){
      var f=feathers[i];
      if(f.opacity<0.3||f.phase==='waiting') continue;
      var str=0;
      if(f.phase==='falling'){
        var dist=Math.sqrt((f.x-f.tx)*(f.x-f.tx)+(f.y-f.ty)*(f.y-f.ty));
        str=Math.max(0,1-dist/150);
      } else if(f.phase==='resting') str=1;
      if(str<=0) continue;
      ctx.save();
      var grad=ctx.createLinearGradient(f.x,f.y,CX,CY);
      grad.addColorStop(0,f.col.base+'60'); grad.addColorStop(0.5,'#F2C84B40'); grad.addColorStop(1,'#F2C84B00');
      ctx.beginPath(); ctx.moveTo(f.x,f.y);
      ctx.quadraticCurveTo((f.x+CX)/2+Math.sin(time+f.i)*3,(f.y+CY)/2+Math.cos(time+f.i)*3,CX,CY);
      ctx.strokeStyle=grad; ctx.lineWidth=0.8; ctx.globalAlpha=str*sunOp*0.5; ctx.stroke();
      ctx.restore();
    }
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
        f.settleT=0;
      } else {
        f.phase='resting';
        f.x=f.tx; f.y=f.ty;
        f.rot=f.tr+Math.sin(elapsed*0.4+f.restSwayPh)*f.restSwayAmp;
        f.opacity=1; f.settleT=1;
      }
    }
    drawConns(elapsed,sunOp);
    for(var i=0;i<feathers.length;i++){ if(feathers[i].opacity>0) drawFeather(feathers[i]); }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ═══════════════════════════════════════
// CARD FEATHERS (values flip cards)
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
  var variations=[
    [1.00,1.00,0.04,0.00,16],[0.95,0.95,0.08,0.06,15],[1.05,0.90,-0.06,-0.05,17],
    [0.98,1.10,0.02,0.00,16],[1.02,0.85,0.10,0.08,14],[0.92,1.05,-0.09,-0.07,15],
    [1.08,0.92,0.05,0.03,18],
  ];

  function drawLargeFeather(canvas,col,idx,opacity){
    var v=variations[idx]||variations[0];
    var S=140,H=260;
    var DPR=Math.min(window.devicePixelRatio||1,2);
    canvas.width=S*DPR; canvas.height=H*DPR;
    canvas.style.width=S+'px'; canvas.style.height=H+'px';
    var ctx=canvas.getContext('2d');
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,S,H); ctx.save();
    ctx.globalAlpha=opacity; ctx.translate(S/2,H*0.78); ctx.rotate(v[3]*0.5);
    var L=200*v[0],W=48*v[1],bias=v[2];
    ctx.beginPath(); ctx.moveTo(0,L*0.35);
    ctx.bezierCurveTo(-W*0.25+bias*10,L*0.2,-W*0.85+bias*5,0,-W*0.9+bias*4,-L*0.15);
    ctx.bezierCurveTo(-W*0.88+bias*3,-L*0.35,-W*0.6+bias*2,-L*0.52,-W*0.2,-L*0.58);
    ctx.quadraticCurveTo(-W*0.05,-L*0.62,0,-L*0.64);
    ctx.quadraticCurveTo(W*0.04,-L*0.62,W*0.18,-L*0.57);
    ctx.bezierCurveTo(W*0.55-bias*2,-L*0.51,W*0.84-bias*3,-L*0.33,W*0.86-bias*4,-L*0.13);
    ctx.bezierCurveTo(W*0.8-bias*5,L*0.02,W*0.22-bias*10,L*0.2,0,L*0.35);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.35,0,-L*0.64);
    bg.addColorStop(0,col.light+'DD'); bg.addColorStop(0.15,col.base+'BB');
    bg.addColorStop(0.4,col.mid+'99'); bg.addColorStop(0.7,col.dark+'66'); bg.addColorStop(1,col.dark+'33');
    ctx.fillStyle=bg; ctx.fill();
    ctx.globalAlpha=opacity*0.15;
    var ig=ctx.createRadialGradient(-W*0.1,-L*0.05,0,0,-L*0.1,W*0.8);
    ig.addColorStop(0,col.light); ig.addColorStop(1,'transparent');
    ctx.fillStyle=ig; ctx.fill(); ctx.globalAlpha=opacity;
    var barbN=v[4]+4;
    for(var side=-1;side<=1;side+=2){
      for(var j=0;j<barbN;j++){
        var frac=j/(barbN-1);
        var ry=L*0.3-frac*(L*0.3+L*0.6), rx=bias*4*(1-frac);
        var barbBase=W*(0.55+0.55*Math.sin(frac*Math.PI))*(0.65+0.35*(1-frac));
        var barbLen=barbBase*0.85;
        var bA=side*(0.3+0.5*frac+bias*0.2);
        var ex=rx+Math.sin(bA)*barbLen*side, ey=ry-Math.cos(bA)*barbLen*0.55;
        var cpx=rx+Math.sin(bA)*barbLen*0.45*side, cpy=ry-Math.cos(bA)*barbLen*0.3;
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.quadraticCurveTo(cpx,cpy,ex,ey);
        ctx.lineWidth=(0.4+0.6*(1-frac))*0.85;
        ctx.globalAlpha=opacity*(0.08+0.15*(1-frac));
        ctx.strokeStyle=side===-1?col.mid:col.base; ctx.stroke();
      }
    }
    ctx.globalAlpha=opacity;
    ctx.beginPath(); ctx.moveTo(0,L*0.33);
    ctx.bezierCurveTo(bias*5,L*0.1,bias*3,-L*0.3,bias*1.5,-L*0.62);
    ctx.strokeStyle=col.shaft; ctx.lineWidth=1.2; ctx.globalAlpha=opacity*0.35; ctx.stroke();
    ctx.restore();
  }

  document.querySelectorAll('canvas.fc-feather-lg').forEach(function(canvas){
    var idx=parseInt(canvas.getAttribute('data-index'),10);
    drawLargeFeather(canvas,chakras[idx],idx,0.85);
  });
  document.querySelectorAll('canvas.fc-feather-lg-back').forEach(function(canvas){
    var idx=parseInt(canvas.getAttribute('data-index'),10);
    drawLargeFeather(canvas,chakras[idx],idx,0.3);
  });
}

// ═══════════════════════════════════════
// INIT ON LOAD (gate logo only)
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded',function(){
  drawLogo('gateLogo');
});
