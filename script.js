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

  if(ver==='business'){
    startHeroCanvas('heroCanvas');
    drawSmallLogo('ctaCanvasBiz');
  } else {
    startHeroCanvas('heroCanvasSpirit');
    drawSmallLogo('ctaCanvasSpirit');
  }
}

// ═══════════════════════════════════════
// NAV CONFIG
// ═══════════════════════════════════════
var NAV_BIZ = [
  {label:'The Concept',     href:'#b-concept'},
  {label:'The Model',       href:'#b-model'},
  {label:'The Market',      href:'#b-market'},
  {label:'The Founder',     href:'#b-founder'},
  {label:'Retreat Vision',  action:'spirit'},
];

var NAV_SPIRIT = [
  {label:'← Investment',   action:'business'},
  {label:'The Values',     href:'#s-healing'},
  {label:'The Vision',     href:'#s-land'},
  {label:'Walk With Us',   href:'#s-founder'},
];

// ✅ FIXED NAV BUILDER (single correct version)
function buildNav(ver){
  var wrap = document.getElementById('navLinks');
  if(!wrap) return;

  wrap.innerHTML='';
  var links = ver==='business' ? NAV_BIZ : NAV_SPIRIT;

  links.forEach(function(item){
    var a = document.createElement('a');
    a.href = item.href || '#';
    a.textContent = item.label;

    a.addEventListener('click',function(e){
      e.preventDefault();

      // PAGE SWITCH
      if(item.action){
        showVersion(item.action);
      }
      // SCROLL
      else if(item.href){
        var t = document.querySelector(item.href);
        if(t) t.scrollIntoView({behavior:'smooth'});
      }

      // close mobile nav
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

  document.querySelectorAll('.reveal').forEach(function(el){
    io.observe(el);
  });
}

// ═══════════════════════════════════════
// LOGOS (unchanged)
// ═══════════════════════════════════════
function drawSmallLogo(id){ drawLogo(id); }
function drawAllLogos(){ drawLogo('navLogo'); }

// keep your existing drawLogo + canvas animation code BELOW THIS
