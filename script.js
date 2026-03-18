var CODE="Root&Rise7!";
function showPage(n){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  var t=document.getElementById('page-'+n);
  if(t)t.classList.add('active');
  window.scrollTo(0,0);
  var inv=n==='invest';
  ['l1','l2','l3','l4'].forEach(function(id){var e=document.getElementById('nl'+id);if(e)e.style.display=inv?'none':'';});
  var il=document.getElementById('ni');if(il)il.style.display=inv?'none':'';
  var bl=document.getElementById('nb');if(bl)bl.style.display=inv?'inline':'none';
  if(n==='invest'){
    var g=document.getElementById('gate');if(g)g.style.display='flex';
    var ic=document.getElementById('ic');if(ic)ic.style.display='none';
    var pe=document.getElementById('perr');if(pe)pe.style.display='none';
    var p=document.getElementById('pwd');if(p)p.value='';
  }
  if(n==='main'){
    var g=document.getElementById('gate');if(g)g.style.display='flex';
    var ic=document.getElementById('ic');if(ic)ic.style.display='none';
    var p=document.getElementById('pwd');if(p)p.value='';
  }
}
function unlock(){
  var v=document.getElementById('pwd').value.trim();
  if(v===CODE){
    document.getElementById('gate').style.display='none';
    document.getElementById('ic').style.display='block';
    window.scrollTo(0,0);
  } else {
    document.getElementById('perr').style.display='block';
    document.getElementById('pwd').value='';
    document.getElementById('pwd').focus();
  }
}

function openDocViewer(){
  document.getElementById('docOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('docOverlay').scrollTop=0;
}
function closeDocViewer(){
  document.getElementById('docOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('DOMContentLoaded',function(){
  var overlay=document.getElementById('docOverlay');
  if(overlay){
    overlay.addEventListener('dragstart',function(e){e.preventDefault();});
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape')closeDocViewer();
  var overlay=document.getElementById('docOverlay');
  if(overlay&&overlay.classList.contains('open')){
    if(e.ctrlKey&&(e.key==='c'||e.key==='a'||e.key==='p'||e.key==='s')){e.preventDefault();}
    if(e.metaKey&&(e.key==='c'||e.key==='a'||e.key==='p'||e.key==='s')){e.preventDefault();}
  }
});

// ===== HERO FEATHER CANVAS ANIMATION =====
(function(){
  function mulberry32(a){
    return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  }
  var rng=mulberry32(42);

  var canvas=document.getElementById('heroCanvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var SIZE=600;
  canvas.width=SIZE*DPR; canvas.height=SIZE*DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);

  var chakras=[
    {name:'Crown',       base:'#C9A8E8',mid:'#B48FD8',dark:'#9B70C0',light:'#EDE0F8',shaft:'#A080C0',wisp:'#D8C0F0'},
    {name:'Third Eye',   base:'#9B8DC4',mid:'#8474B0',dark:'#6B58A0',light:'#CEC4E0',shaft:'#7A68A8',wisp:'#B8ACD4'},
    {name:'Throat',      base:'#A8CBE8',mid:'#88B8D8',dark:'#68A0C8',light:'#D4E8F6',shaft:'#80AAC8',wisp:'#C0D8F0'},
    {name:'Heart',       base:'#8FBA84',mid:'#72A466',dark:'#5A8A4A',light:'#C0DDB8',shaft:'#6A9860',wisp:'#A8D0A0'},
    {name:'Solar Plexus',base:'#F0D885',mid:'#E0C460',dark:'#C8A840',light:'#FAF0D0',shaft:'#D0B050',wisp:'#F5E8B0'},
    {name:'Sacral',      base:'#F2B07A',mid:'#E09050',dark:'#C87838',light:'#FAD8C0',shaft:'#D08848',wisp:'#F6C8A0'},
    {name:'Root',        base:'#E89DA3',mid:'#D07880',dark:'#B85868',light:'#F6D0D4',shaft:'#C07078',wisp:'#F0B8BC'},
  ];

  var CX=SIZE/2,CY=SIZE/2,CIRCLE_R=120;
  var targets=chakras.map(function(_,i){
    var angle=-Math.PI/2+(Math.PI*2/7)*i;
    return{x:CX+Math.cos(angle)*CIRCLE_R,y:CY+Math.sin(angle)*CIRCLE_R,angle:angle};
  });
  var startYs=[0.10,0.20,0.32,0.43,0.54,0.65,0.76];

  function Feather(i){
    this.i=i;this.col=chakras[i];
    this.sx=-65-rng()*30;this.sy=SIZE*startYs[i];this.sr=(rng()-0.5)*1.0+0.3;
    this.tx=targets[i].x;this.ty=targets[i].y;this.tr=targets[i].angle+Math.PI/2;
    this.x=this.sx;this.y=this.sy;this.rot=this.sr;
    this.delay=0.4+i*0.55;this.driftDur=2.8;this.settleDur=1.6;
    this.m1x=SIZE*0.12+rng()*SIZE*0.12;this.m1y=this.sy+(rng()-0.5)*100;this.m1r=this.sr+(rng()-0.5)*0.7;
    this.m2x=SIZE*0.35+rng()*SIZE*0.15;this.m2y=(this.sy+this.ty)/2+(rng()-0.5)*60;this.m2r=(this.sr+this.tr)/2+(rng()-0.5)*0.3;
    this.phase='waiting';this.opacity=0;this.settleT=0;
    this.swayPh=rng()*Math.PI*2;this.swayAmp=0.012+rng()*0.008;
    this.len=78+rng()*16;this.wMul=0.9+rng()*0.2;this.curve=(rng()-0.5)*0.1;
    this.barbN=22+Math.floor(rng()*5);
    this.barbNoise=[];
    for(var b=0;b<60;b++)this.barbNoise.push({lenMul:0.7+rng()*0.6,angleBias:(rng()-0.5)*0.14,gap:rng()<0.1});
    this.downWisps=[];
    for(var d=0;d<12;d++)this.downWisps.push({angle:(rng()-0.5)*2.5,dx:(rng()-0.5)*8,dy:this.len*0.25+rng()*this.len*0.12,ext:10+rng()*8});
  }

  var feathers=chakras.map(function(_,i){return new Feather(i);});
  function eOC(t){return 1-Math.pow(1-t,3);}
  function eIQ(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
  function cB(a,b,c,d,t){var u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d;}

  function drawFeather(f){
    ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);ctx.globalAlpha=f.opacity;
    var L=f.len,W=16*f.wMul,bias=f.curve,col=f.col;
    ctx.beginPath();ctx.moveTo(0,L*0.35);
    ctx.bezierCurveTo(-W*0.25+bias*10,L*0.2,-W*0.85+bias*5,0,-W*0.9+bias*4,-L*0.15);
    ctx.bezierCurveTo(-W*0.88+bias*3,-L*0.35,-W*0.6+bias*2,-L*0.52,-W*0.2,-L*0.58);
    ctx.quadraticCurveTo(-W*0.05,-L*0.62,0,-L*0.64);
    ctx.quadraticCurveTo(W*0.04,-L*0.62,W*0.18,-L*0.57);
    ctx.bezierCurveTo(W*0.55-bias*2,-L*0.51,W*0.84-bias*3,-L*0.33,W*0.86-bias*4,-L*0.13);
    ctx.bezierCurveTo(W*0.8-bias*5,L*0.02,W*0.22-bias*10,L*0.2,0,L*0.35);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.35,0,-L*0.64);
    bg.addColorStop(0,col.light+'CC');bg.addColorStop(0.2,col.base+'AA');bg.addColorStop(0.5,col.mid+'88');bg.addColorStop(0.8,col.dark+'55');bg.addColorStop(1,col.dark+'22');
    ctx.fillStyle=bg;ctx.filter='blur(1.2px)';ctx.fill();ctx.filter='none';
    ctx.globalAlpha=f.opacity*0.2;
    var ig=ctx.createRadialGradient(-W*0.1,-L*0.05,0,0,-L*0.1,W*0.8);ig.addColorStop(0,col.light);ig.addColorStop(1,'transparent');ctx.fillStyle=ig;ctx.fill();ctx.globalAlpha=f.opacity;
    ctx.beginPath();ctx.moveTo(0,L*0.33);ctx.bezierCurveTo(bias*5,L*0.1,bias*3,-L*0.3,bias*1.5,-L*0.62);
    ctx.strokeStyle=col.shaft;ctx.lineWidth=0.8;ctx.globalAlpha=f.opacity*0.4;ctx.stroke();ctx.globalAlpha=f.opacity;
    for(var side=-1;side<=1;side+=2){for(var j=0;j<f.barbN;j++){
      var noise=f.barbNoise[j+(side===1?30:0)]||f.barbNoise[j];if(noise.gap)continue;
      var frac=j/(f.barbN-1),ry=L*0.3-frac*(L*0.3+L*0.6),rx=bias*4*(1-frac);
      var barbBase=W*(0.55+0.55*Math.sin(frac*Math.PI))*(0.65+0.35*(1-frac)),barbLen=barbBase*noise.lenMul;
      var bA=side*(0.3+0.5*frac+bias*0.2)+noise.angleBias;
      var ex=rx+Math.sin(bA)*barbLen*side,ey=ry-Math.cos(bA)*barbLen*0.55;
      var cpx=rx+Math.sin(bA)*barbLen*0.45*side,cpy=ry-Math.cos(bA)*barbLen*0.3;
      ctx.beginPath();ctx.moveTo(rx,ry);ctx.quadraticCurveTo(cpx,cpy,ex,ey);
      var bw=(0.25+0.45*(1-frac))*noise.lenMul;ctx.lineWidth=bw;ctx.globalAlpha=f.opacity*(0.1+0.18*(1-frac));
      ctx.strokeStyle=side===-1?col.mid:col.base;ctx.stroke();
      if(noise.lenMul>0.9&&frac<0.8){ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+Math.sin(bA+0.1)*barbLen*0.25*side,ey-Math.cos(bA)*barbLen*0.15);ctx.lineWidth=bw*0.4;ctx.globalAlpha=f.opacity*0.06;ctx.strokeStyle=col.wisp;ctx.stroke();}
    }}
    ctx.globalAlpha=f.opacity*0.08;
    for(var k=0;k<f.downWisps.length;k++){var dw=f.downWisps[k];ctx.beginPath();ctx.moveTo(dw.dx,dw.dy);ctx.quadraticCurveTo(dw.dx+Math.sin(dw.angle)*10,dw.dy-5,dw.dx+Math.sin(dw.angle)*18,dw.dy-dw.ext);ctx.lineWidth=0.3;ctx.strokeStyle=col.wisp;ctx.stroke();}
    ctx.restore();
  }

  function drawSun(opacity,time){
    ctx.save();ctx.globalAlpha=opacity;
    var g0=ctx.createRadialGradient(CX,CY,0,CX,CY,80);g0.addColorStop(0,'rgba(242,200,75,0.18)');g0.addColorStop(0.4,'rgba(242,200,75,0.06)');g0.addColorStop(1,'rgba(242,200,75,0)');ctx.fillStyle=g0;ctx.beginPath();ctx.arc(CX,CY,80,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=opacity*0.15;ctx.beginPath();ctx.arc(CX,CY,CIRCLE_R-5,0,Math.PI*2);ctx.strokeStyle='#F2C84B';ctx.lineWidth=12;ctx.filter='blur(6px)';ctx.stroke();ctx.filter='none';ctx.globalAlpha=opacity;
    var g1=ctx.createRadialGradient(CX,CY,10,CX,CY,28);g1.addColorStop(0,'#FAE8A0');g1.addColorStop(1,'#D4A017');ctx.fillStyle=g1;ctx.beginPath();ctx.arc(CX,CY,28,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#F2C84B';ctx.beginPath();ctx.arc(CX,CY,20,0,Math.PI*2);ctx.fill();
    var cg=ctx.createRadialGradient(CX-2,CY-2,0,CX,CY,12);cg.addColorStop(0,'#FFFEF0');cg.addColorStop(1,'#FFF5CC');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(CX,CY,12,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#F2C84B';ctx.lineCap='round';var pulse=1+Math.sin(time*1.5)*0.08;
    for(var r=0;r<8;r++){var a=(Math.PI*2/8)*r+time*0.05;ctx.globalAlpha=opacity*(0.2+Math.sin(time*0.8+r)*0.08);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(CX+Math.cos(a)*30*pulse,CY+Math.sin(a)*30*pulse);ctx.lineTo(CX+Math.cos(a)*38*pulse,CY+Math.sin(a)*38*pulse);ctx.stroke();}
    ctx.restore();
  }

  function drawConns(time,sunOp){
    for(var i=0;i<feathers.length;i++){var f=feathers[i];if(f.opacity<0.3||f.phase==='waiting')continue;
      var str=0;if(f.phase==='settling')str=Math.min(1,(f.settleT||0)*1.5);else if(f.phase==='resting')str=1;if(str<=0)continue;
      ctx.save();var grad=ctx.createLinearGradient(f.x,f.y,CX,CY);grad.addColorStop(0,f.col.base+'60');grad.addColorStop(0.5,'#F2C84B40');grad.addColorStop(1,'#F2C84B00');
      ctx.beginPath();ctx.moveTo(f.x,f.y);ctx.quadraticCurveTo((f.x+CX)/2+Math.sin(time+f.i)*3,(f.y+CY)/2+Math.cos(time+f.i)*3,CX,CY);
      ctx.strokeStyle=grad;ctx.lineWidth=0.8;ctx.globalAlpha=str*sunOp*0.5;ctx.stroke();ctx.restore();}
  }

  var startTime=null;
  var heroText=document.getElementById('heroText');



  function update(ts){
    if(!startTime)startTime=ts;
    var elapsed=(ts-startTime)/1000;
    ctx.clearRect(0,0,SIZE,SIZE);
    var sunOp=Math.min(1,Math.max(0,(elapsed-1.5)/2.5));
    drawSun(sunOp,elapsed);
    for(var i=0;i<feathers.length;i++){var f=feathers[i],t=elapsed-f.delay;
      if(t<0){f.phase='waiting';f.opacity=0;}
      else if(t<f.driftDur){f.phase='drifting';var p=eIQ(t/f.driftDur);f.x=cB(f.sx,f.m1x,f.m2x,f.tx,p);f.y=cB(f.sy,f.m1y,f.m2y,f.ty,p);f.rot=cB(f.sr,f.m1r,f.m2r,f.tr,p);var bob=1-p;f.y+=Math.sin(t*2+f.i*1.3)*8*bob;f.x+=Math.sin(t*1.4+f.i*0.9)*4*bob;f.rot+=Math.sin(t*1.6+f.i*0.7)*0.1*bob;f.opacity=Math.min(1,t/0.6);}
      else if(t<f.driftDur+f.settleDur){f.phase='settling';var st=(t-f.driftDur)/f.settleDur;f.settleT=st;var sp=eOC(st);f.x=f.tx+Math.sin(st*Math.PI)*3*(1-sp);f.y=f.ty+Math.sin(st*Math.PI*1.3)*3*(1-sp);f.rot=f.tr+Math.sin(st*Math.PI)*0.03*(1-sp);f.opacity=1;}
      else{f.phase='resting';f.x=f.tx;f.y=f.ty;f.rot=f.tr+Math.sin(elapsed*0.6+f.swayPh)*f.swayAmp;f.opacity=1;}
    }
    drawConns(elapsed,sunOp);
    for(var i=0;i<feathers.length;i++){if(feathers[i].opacity>0)drawFeather(feathers[i]);}
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
})();


// ===== CARD FEATHERS =====
(function(){
  var chakras=[
    {base:'#C9A8E8',mid:'#B48FD8',dark:'#9B70C0',light:'#EDE0F8',shaft:'#A080C0',wisp:'#D8C0F0'},
    {base:'#9B8DC4',mid:'#8474B0',dark:'#6B58A0',light:'#CEC4E0',shaft:'#7A68A8',wisp:'#B8ACD4'},
    {base:'#A8CBE8',mid:'#88B8D8',dark:'#68A0C8',light:'#D4E8F6',shaft:'#80AAC8',wisp:'#C0D8F0'},
    {base:'#8FBA84',mid:'#72A466',dark:'#5A8A4A',light:'#C0DDB8',shaft:'#6A9860',wisp:'#A8D0A0'},
    {base:'#F0D885',mid:'#E0C460',dark:'#C8A840',light:'#FAF0D0',shaft:'#D0B050',wisp:'#F5E8B0'},
    {base:'#F2B07A',mid:'#E09050',dark:'#C87838',light:'#FAD8C0',shaft:'#D08848',wisp:'#F6C8A0'},
    {base:'#E89DA3',mid:'#D07880',dark:'#B85868',light:'#F6D0D4',shaft:'#C07078',wisp:'#F0B8BC'},
  ];

  function drawCardFeather(canvas, col){
    var S=40, H=56;
    var DPR=Math.min(window.devicePixelRatio||1,2);
    canvas.width=S*DPR; canvas.height=H*DPR;
    canvas.style.width=S+'px'; canvas.style.height=H+'px';
    var ctx=canvas.getContext('2d');
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,S,H);
    ctx.save();
    ctx.translate(S/2, H*0.82);
    ctx.rotate(0);

    var L=42, W=10, bias=0.04;

    // Vane shape
    ctx.beginPath();
    ctx.moveTo(0, L*0.35);
    ctx.bezierCurveTo(-W*0.25+bias*10,L*0.2,-W*0.85+bias*5,0,-W*0.9+bias*4,-L*0.15);
    ctx.bezierCurveTo(-W*0.88+bias*3,-L*0.35,-W*0.6+bias*2,-L*0.52,-W*0.2,-L*0.58);
    ctx.quadraticCurveTo(-W*0.05,-L*0.62,0,-L*0.64);
    ctx.quadraticCurveTo(W*0.04,-L*0.62,W*0.18,-L*0.57);
    ctx.bezierCurveTo(W*0.55-bias*2,-L*0.51,W*0.84-bias*3,-L*0.33,W*0.86-bias*4,-L*0.13);
    ctx.bezierCurveTo(W*0.8-bias*5,L*0.02,W*0.22-bias*10,L*0.2,0,L*0.35);
    ctx.closePath();
    var bg=ctx.createLinearGradient(0,L*0.35,0,-L*0.64);
    bg.addColorStop(0,col.light+'CC');
    bg.addColorStop(0.2,col.base+'AA');
    bg.addColorStop(0.5,col.mid+'88');
    bg.addColorStop(0.8,col.dark+'55');
    bg.addColorStop(1,col.dark+'22');
    ctx.fillStyle=bg;
    ctx.fill();

    // Barbs
    var barbN=16;
    for(var side=-1;side<=1;side+=2){
      for(var j=0;j<barbN;j++){
        var frac=j/(barbN-1);
        var ry=L*0.3-frac*(L*0.3+L*0.6);
        var rx=bias*4*(1-frac);
        var barbBase=W*(0.55+0.55*Math.sin(frac*Math.PI))*(0.65+0.35*(1-frac));
        var barbLen=barbBase*0.85;
        var bA=side*(0.3+0.5*frac+bias*0.2);
        var ex=rx+Math.sin(bA)*barbLen*side;
        var ey=ry-Math.cos(bA)*barbLen*0.55;
        var cpx=rx+Math.sin(bA)*barbLen*0.45*side;
        var cpy=ry-Math.cos(bA)*barbLen*0.3;
        ctx.beginPath();
        ctx.moveTo(rx,ry);
        ctx.quadraticCurveTo(cpx,cpy,ex,ey);
        ctx.lineWidth=(0.25+0.45*(1-frac))*0.85;
        ctx.globalAlpha=0.1+0.18*(1-frac);
        ctx.strokeStyle=side===-1?col.mid:col.base;
        ctx.stroke();
      }
    }

    // Shaft
    ctx.beginPath();
    ctx.moveTo(0,L*0.33);
    ctx.bezierCurveTo(bias*5,L*0.1,bias*3,-L*0.3,bias*1.5,-L*0.62);
    ctx.strokeStyle=col.shaft;
    ctx.lineWidth=0.7;
    ctx.globalAlpha=0.45;
    ctx.stroke();

    ctx.restore();
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('canvas.fc-feather').forEach(function(canvas){
      var idx=parseInt(canvas.getAttribute('data-index'),10);
      drawCardFeather(canvas, chakras[idx]);
    });
  });
})();
(function(){
  var c=document.getElementById('navLogo');
  if(!c)return;
  var ctx=c.getContext('2d');
  var S=56,cx=S/2,cy=S/2+4,R=16;
  var cols=['#C9A8E8','#9B8DC4','#A8CBE8','#8FBA84','#F0D885','#F2B07A','#E89DA3'];
  ctx.clearRect(0,0,S,S);
  // Sun
  ctx.fillStyle='#D4A017';ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#F2C84B';ctx.beginPath();ctx.arc(cx,cy,3.5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#FFF5CC';ctx.beginPath();ctx.arc(cx,cy,1.8,0,Math.PI*2);ctx.fill();
  // 7 feathers in circle
  for(var i=0;i<7;i++){
    var angle=-Math.PI/2+(Math.PI*2/7)*i;
    var fx=cx+Math.cos(angle)*R,fy=cy+Math.sin(angle)*R;
    ctx.save();ctx.translate(fx,fy);ctx.rotate(angle+Math.PI/2);
    ctx.beginPath();ctx.moveTo(0,5);
    ctx.bezierCurveTo(-2.5,3,-3.5,-2,-2.5,-7);ctx.quadraticCurveTo(0,-9,0,-10);
    ctx.quadraticCurveTo(0,-9,2.5,-7);ctx.bezierCurveTo(3.5,-2,2.5,3,0,5);ctx.closePath();
    ctx.fillStyle=cols[i];ctx.globalAlpha=0.75;ctx.fill();
    ctx.beginPath();ctx.moveTo(0,4);ctx.lineTo(0,-9);ctx.strokeStyle=cols[i];ctx.lineWidth=0.4;ctx.globalAlpha=0.4;ctx.stroke();
    ctx.restore();
  }
})();
