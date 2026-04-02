// ===== ACCESS CODES =====
var CODES = {
  'Groundwork7': 'business',
  'Homecoming7': 'spirit'
};

function unlock() {
  var input = document.getElementById('accessCode').value.trim();
  var version = CODES[input];
  if (version) {
    // Hide gate, show content
    document.getElementById('gate').style.display = 'none';
    document.getElementById('page-' + version).style.display = 'block';
    document.getElementById('siteNav').style.display = '';
    document.getElementById('siteFooter').style.display = '';
    window.scrollTo(0, 0);

    // Set nav links based on version
    var navLinks = document.getElementById('navLinks');
    if (version === 'business') {
      navLinks.innerHTML =
        '<a href="#b-concept">Concept</a>' +
        '<a href="#b-model">Model</a>' +
        '<a href="#b-founder">Founder</a>' +
        '<a href="mailto:info@7feathersretreat.com?subject=Investment%20Inquiry" class="nav-cta">Request Deck</a>';
    } else {
      navLinks.innerHTML =
        '<a href="#s-land">The Land</a>' +
        '<a href="#s-sanctuary">Retreats</a>' +
        '<a href="#s-healing">Healing</a>' +
        '<a href="#s-founder">Founder</a>' +
        '<a href="mailto:info@7feathersretreat.com?subject=Partnership%20Inquiry" class="nav-cta">Connect</a>';
    }

    // Draw canvases for the active version
    drawAllCanvases(version);
  } else {
    document.getElementById('gateError').style.display = 'block';
    document.getElementById('accessCode').value = '';
    document.getElementById('accessCode').focus();
  }
}

// ===== FEATHER DRAWING HELPERS =====
var featherCols = ['#C9A8E8','#9B8DC4','#A8CBE8','#8FBA84','#F0D885','#F2B07A','#E89DA3'];

function drawFeatherShape(ctx, x, y, angle, scale, color, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(-2.5, 3, -3.5, -2, -2.5, -7);
  ctx.quadraticCurveTo(0, -9, 0, -10);
  ctx.quadraticCurveTo(0, -9, 2.5, -7);
  ctx.bezierCurveTo(3.5, -2, 2.5, 3, 0, 5);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, -9);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.4;
  ctx.globalAlpha = opacity * 0.5;
  ctx.stroke();
  ctx.restore();
}

function drawSmallLogo(canvasId) {
  var c = document.getElementById(canvasId);
  if (!c) return;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var S = parseInt(c.getAttribute('width')) || 40;
  c.width = S * DPR;
  c.height = S * DPR;
  c.style.width = S + 'px';
  c.style.height = S + 'px';
  var ctx = c.getContext('2d');
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  var cx = S / 2, cy = S / 2 + 2, R = S * 0.32;
  ctx.clearRect(0, 0, S, S);
  // Sun
  ctx.fillStyle = '#D4A017';
  ctx.beginPath(); ctx.arc(cx, cy, S * 0.1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#F2C84B';
  ctx.beginPath(); ctx.arc(cx, cy, S * 0.07, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFF5CC';
  ctx.beginPath(); ctx.arc(cx, cy, S * 0.038, 0, Math.PI * 2); ctx.fill();
  // Feathers
  for (var i = 0; i < 7; i++) {
    var angle = -Math.PI / 2 + (Math.PI * 2 / 7) * i;
    drawFeatherShape(ctx, cx + Math.cos(angle) * R, cy + Math.sin(angle) * R, angle + Math.PI / 2, 1, featherCols[i], 0.75);
  }
}

function drawHeroCanvas(canvasId) {
  var c = document.getElementById(canvasId);
  if (!c) return;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var S = 500;
  c.width = S * DPR;
  c.height = S * DPR;
  var ctx = c.getContext('2d');
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  var cx = S / 2, cy = S / 2, R = 160;
  ctx.clearRect(0, 0, S, S);
  // Sun glow
  var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
  g.addColorStop(0, 'rgba(242, 200, 75, 0.3)');
  g.addColorStop(0.5, 'rgba(242, 200, 75, 0.08)');
  g.addColorStop(1, 'rgba(242, 200, 75, 0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
  // Sun center
  ctx.fillStyle = '#F2C84B'; ctx.globalAlpha = 0.6;
  ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFF5CC'; ctx.globalAlpha = 0.5;
  ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
  // Feathers
  for (var i = 0; i < 7; i++) {
    var angle = -Math.PI / 2 + (Math.PI * 2 / 7) * i;
    var fx = cx + Math.cos(angle) * R;
    var fy = cy + Math.sin(angle) * R;
    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate(angle + Math.PI / 2);
    ctx.globalAlpha = 0.7;
    var L = 70, W = 18;
    ctx.beginPath();
    ctx.moveTo(0, L * 0.35);
    ctx.bezierCurveTo(-W * 0.25, L * 0.2, -W * 0.85, 0, -W * 0.9, -L * 0.15);
    ctx.bezierCurveTo(-W * 0.88, -L * 0.35, -W * 0.6, -L * 0.52, -W * 0.2, -L * 0.58);
    ctx.quadraticCurveTo(-W * 0.05, -L * 0.62, 0, -L * 0.64);
    ctx.quadraticCurveTo(W * 0.04, -L * 0.62, W * 0.18, -L * 0.57);
    ctx.bezierCurveTo(W * 0.55, -L * 0.51, W * 0.84, -L * 0.33, W * 0.86, -L * 0.13);
    ctx.bezierCurveTo(W * 0.8, L * 0.02, W * 0.22, L * 0.2, 0, L * 0.35);
    ctx.closePath();
    var bg = ctx.createLinearGradient(0, L * 0.35, 0, -L * 0.64);
    bg.addColorStop(0, featherCols[i] + 'CC');
    bg.addColorStop(0.5, featherCols[i] + '88');
    bg.addColorStop(1, featherCols[i] + '33');
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, L * 0.33);
    ctx.lineTo(0, -L * 0.62);
    ctx.strokeStyle = featherCols[i];
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.restore();
    // Connection line
    ctx.save();
    ctx.globalAlpha = 0.12;
    var grad = ctx.createLinearGradient(fx, fy, cx, cy);
    grad.addColorStop(0, featherCols[i]);
    grad.addColorStop(1, 'rgba(242, 200, 75, 0)');
    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(cx, cy);
    ctx.strokeStyle = grad; ctx.lineWidth = 0.8; ctx.stroke();
    ctx.restore();
  }
}

function drawCTAFeather(canvasId) {
  var c = document.getElementById(canvasId);
  if (!c) return;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var S = 60;
  c.width = S * DPR; c.height = S * DPR;
  c.style.width = S + 'px'; c.style.height = S + 'px';
  var ctx = c.getContext('2d');
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.translate(S / 2, S * 0.75);
  ctx.globalAlpha = 0.6;
  var L = 38, W = 10, col = '#7EA878';
  ctx.beginPath();
  ctx.moveTo(0, L * 0.35);
  ctx.bezierCurveTo(-W * 0.25, L * 0.2, -W * 0.85, 0, -W * 0.9, -L * 0.15);
  ctx.bezierCurveTo(-W * 0.88, -L * 0.35, -W * 0.6, -L * 0.52, -W * 0.2, -L * 0.58);
  ctx.quadraticCurveTo(-W * 0.05, -L * 0.62, 0, -L * 0.64);
  ctx.quadraticCurveTo(W * 0.04, -L * 0.62, W * 0.18, -L * 0.57);
  ctx.bezierCurveTo(W * 0.55, -L * 0.51, W * 0.84, -L * 0.33, W * 0.86, -L * 0.13);
  ctx.bezierCurveTo(W * 0.8, L * 0.02, W * 0.22, L * 0.2, 0, L * 0.35);
  ctx.closePath();
  var bg = ctx.createLinearGradient(0, L * 0.35, 0, -L * 0.64);
  bg.addColorStop(0, col + 'CC'); bg.addColorStop(0.5, col + '88'); bg.addColorStop(1, col + '33');
  ctx.fillStyle = bg; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, L * 0.33); ctx.lineTo(0, -L * 0.62);
  ctx.strokeStyle = col; ctx.lineWidth = 0.6; ctx.globalAlpha = 0.35; ctx.stroke();
  ctx.restore();
}

function drawAllCanvases(version) {
  drawSmallLogo('navLogo');
  if (version === 'business') {
    drawHeroCanvas('heroCanvas');
    drawCTAFeather('ctaCanvasBiz');
  } else {
    drawHeroCanvas('heroCanvasSpirit');
    drawCTAFeather('ctaCanvasSpirit');
  }
}

// ===== GATE LOGO =====
(function(){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ drawSmallLogo('gateLogo'); });
  } else {
    drawSmallLogo('gateLogo');
  }
})();

// ===== SMOOTH SCROLL =====
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
