// Jhon's Epic Forest Quest — música ambiente v4.1
(function(){
  'use strict';
  let ctx=null, master=null, timer=null, playing=false, step=0;

  // Tema original sintetizado, leve e em loop. Não depende de arquivo externo.
  const notes=[
    [196,0.28],[247,0.28],[294,0.28],[247,0.28],
    [220,0.28],[262,0.28],[330,0.34],[294,0.22],
    [196,0.28],[247,0.28],[294,0.28],[370,0.28],
    [330,0.34],[294,0.22],[247,0.30],[220,0.30]
  ];

  function init(){
    if(!ctx){
      const AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return false;
      ctx=new AC();
      master=ctx.createGain();
      master.gain.value=0.045;
      master.connect(ctx.destination);
    }
    if(ctx.state==='suspended')ctx.resume();
    return true;
  }

  function tone(freq,dur,when){
    if(!ctx||!master)return;
    const o=ctx.createOscillator();
    const g=ctx.createGain();
    const f=ctx.createBiquadFilter();
    o.type='sine';
    o.frequency.setValueAtTime(freq,when);
    f.type='lowpass';
    f.frequency.value=1200;
    g.gain.setValueAtTime(0.0001,when);
    g.gain.exponentialRampToValueAtTime(0.22,when+0.025);
    g.gain.exponentialRampToValueAtTime(0.0001,when+dur-0.03);
    o.connect(f);f.connect(g);g.connect(master);
    o.start(when);o.stop(when+dur);
  }

  function tick(){
    if(!playing||!ctx)return;
    const now=ctx.currentTime;
    const [freq,dur]=notes[step%notes.length];
    tone(freq,dur,now+0.02);
    // nota grave suave a cada 4 passos
    if(step%4===0)tone(freq/2,dur*1.7,now+0.02);
    step++;
  }

  function start(){
    if(!init())return;
    if(playing)return;
    playing=true;step=0;tick();
    timer=setInterval(tick,280);
    updateButton();
  }

  function stop(){
    playing=false;
    if(timer){clearInterval(timer);timer=null;}
    updateButton();
  }

  function updateButton(){
    const b=document.getElementById('musicToggle');
    if(b)b.textContent=playing?'🔊 Música':'🔇 Música';
  }

  function addButton(){
    if(document.getElementById('musicToggle'))return;
    const b=document.createElement('button');
    b.id='musicToggle';
    b.type='button';
    b.textContent='🔇 Música';
    b.style.cssText='position:absolute;right:10px;top:10px;z-index:120;border:1px solid #475569;background:#111827;color:#fff;border-radius:12px;padding:8px 11px;font-weight:900;cursor:pointer;box-shadow:0 8px 22px #0008';
    b.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      if(playing)stop();else start();
    });
    const frame=document.getElementById('gameFrame');
    const d=frame&&frame.contentDocument;
    if(d&&d.querySelector('.game'))d.querySelector('.game').appendChild(b);
  }

  function patchFrame(){
    try{
      const frame=document.getElementById('gameFrame');
      const d=frame&&frame.contentDocument;
      if(!d)return;
      const v=d.querySelector('.version');
      if(v)v.textContent="🥷 JHON'S EPIC FOREST QUEST • v4.1";
      const play=d.getElementById('play');
      if(play&&!play.dataset.musicBound){
        play.dataset.musicBound='1';
        play.addEventListener('click',()=>setTimeout(start,80),{once:true});
      }
      addButton();
      const style=d.createElement('style');
      style.textContent='@media(max-width:900px){#musicToggle{top:72px!important;right:10px!important;font-size:11px;padding:7px 9px!important}}';
      d.head.appendChild(style);
    }catch(e){}
  }

  window.addEventListener('load',()=>{patchFrame();setTimeout(patchFrame,400);setTimeout(patchFrame,1200);});
  setInterval(patchFrame,2200);
})();
