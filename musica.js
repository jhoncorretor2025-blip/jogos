// Jhon's Epic Forest Quest — música ambiente v4.3
(function(){
  'use strict';
  let ctx=null, master=null, timer=null, playing=false, step=0;
  const notes=[[196,.28],[247,.28],[294,.28],[247,.28],[220,.28],[262,.28],[330,.34],[294,.22],[196,.28],[247,.28],[294,.28],[370,.28],[330,.34],[294,.22],[247,.30],[220,.30]];
  function init(){if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;ctx=new AC();master=ctx.createGain();master.gain.value=.045;master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume();return true}
  function tone(freq,dur,when){if(!ctx||!master)return;const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();o.type='sine';o.frequency.setValueAtTime(freq,when);f.type='lowpass';f.frequency.value=1200;g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(.22,when+.025);g.gain.exponentialRampToValueAtTime(.0001,when+dur-.03);o.connect(f);f.connect(g);g.connect(master);o.start(when);o.stop(when+dur)}
  function tick(){if(!playing||!ctx)return;const now=ctx.currentTime,[freq,dur]=notes[step%notes.length];tone(freq,dur,now+.02);if(step%4===0)tone(freq/2,dur*1.7,now+.02);step++}
  function updateButton(){const b=document.getElementById('musicToggle');if(b)b.textContent=playing?'🔊 Música':'🔇 Música'}
  function start(){if(!init()||playing)return;playing=true;step=0;tick();timer=setInterval(tick,280);updateButton()}
  function stop(){playing=false;if(timer){clearInterval(timer);timer=null}updateButton()}
  function addButton(){if(document.getElementById('musicToggle'))return;const b=document.createElement('button');b.id='musicToggle';b.type='button';b.textContent='🔇 Música';b.style.cssText='position:absolute;right:10px;top:10px;z-index:120;border:1px solid #475569;background:#111827;color:#fff;border-radius:12px;padding:8px 11px;font-weight:900;cursor:pointer;box-shadow:0 8px 22px #0008';b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();playing?stop():start()});const frame=document.getElementById('gameFrame'),d=frame&&frame.contentDocument;if(d&&d.querySelector('.game'))d.querySelector('.game').appendChild(b)}
  function patchFrame(){try{const frame=document.getElementById('gameFrame'),d=frame&&frame.contentDocument;if(!d)return;const v=d.querySelector('.version');if(v)v.textContent="🥷 JHON'S EPIC FOREST QUEST • v4.3";const play=d.getElementById('play');if(play&&!play.dataset.musicBound){play.dataset.musicBound='1';play.addEventListener('click',()=>setTimeout(start,100))}addButton();if(d.head&&!d.getElementById('music43style')){const s=d.createElement('style');s.id='music43style';s.textContent='@media(max-width:900px){#musicToggle{top:72px!important;right:10px!important;font-size:11px;padding:7px 9px!important}}';d.head.appendChild(s)}}catch(e){}}
  window.addEventListener('load',()=>{patchFrame();setTimeout(patchFrame,400);setTimeout(patchFrame,1200)});setInterval(patchFrame,2200);
})();
