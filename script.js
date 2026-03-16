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
  var featherColors=['#4F7942','#71A95A','#B8860B','#c8a97a','#7ba7c2','#ffffff'];
  var max=7;
  var active=[];

  function spawn(){
    if(active.length>=max)return;
    var el=document.createElement('span');
    el.className='feather-float';
    el.textContent='🪶';
    var left=Math.random()*92;
    var duration=12+Math.random()*16;
    var delay=Math.random()*1.5;
    var size=0.7+Math.random()*0.7;
    var color=featherColors[Math.floor(Math.random()*featherColors.length)];
    el.style.left=left+'%';
    el.style.animationDuration=duration+'s';
    el.style.animationDelay=delay+'s';
    el.style.fontSize=size+'rem';
    el.style.color=color;
    el.style.zIndex='10';
    document.body.appendChild(el);
    active.push(el);
    setTimeout(function(){
      el.remove();
      active.splice(active.indexOf(el),1);
    },(duration+delay+1)*1000);
  }

  function loop(){
    spawn();
    setTimeout(loop, 3000+Math.random()*4000);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',loop);
  } else {
    loop();
  }
})();
