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
document.addEventListener('keydown',function(e){
  if(e.key==='Escape')closeDocViewer();
  // Block Ctrl+C, Ctrl+A, Ctrl+P on overlay
  if(document.getElementById('docOverlay').classList.contains('open')){
    if(e.ctrlKey&&(e.key==='c'||e.key==='a'||e.key==='p'||e.key==='s')){e.preventDefault();}
    if(e.metaKey&&(e.key==='c'||e.key==='a'||e.key==='p'||e.key==='s')){e.preventDefault();}
  }
});
// Block drag
document.getElementById('docOverlay').addEventListener('dragstart',function(e){e.preventDefault();});

// Flying feathers
(function(){
  var chakraColors=['#C9A8E8','#9B8DC4','#A8CBE8','#8FBA84','#F0D885','#F2B07A','#E89DA3'];
  var max=7;
  var count=0;

  function spawn(){
    if(count>=max)return;
    count++;
    var el=document.createElement('span');
    var left=Math.random()*90;
    var duration=(14+Math.random()*14).toFixed(1);
    var size=(0.8+Math.random()*0.6).toFixed(2);
    var color=chakraColors[Math.floor(Math.random()*chakraColors.length)];
    var drift=(Math.random()*80-40).toFixed(0);
    el.textContent='🪶';
    el.setAttribute('style',
      'position:fixed;top:-50px;left:'+left+'%;'+
      'font-size:'+size+'rem;'+
      'color:'+color+';'+
      'pointer-events:none;'+
      'z-index:10;'+
      'opacity:0;'+
      'transition:none;'+
      'animation:featherFall '+duration+'s linear forwards;'+
      '--drift:'+drift+'px;'
    );
    document.body.appendChild(el);
    var ms=(parseFloat(duration)+0.5)*1000;
    setTimeout(function(){
      el.remove();
      count--;
      setTimeout(spawn, 1500+Math.random()*2500);
    }, ms);
  }

  function start(){
    for(var i=0;i<4;i++){
      setTimeout(spawn, i*800);
    }
    setInterval(function(){
      if(count<max) spawn();
    }, 2500);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
