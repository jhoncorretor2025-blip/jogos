(()=>{'use strict';
const KEY='jhonArcadeSettingsV1';
const defaults={theme:'neon',sound:true,volume:45,contrast:false,textSize:'normal',reducedMotion:false,touchControls:'auto'};
function read(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}')||{})}catch(e){return {...defaults}}}
function getSettings(){return read()}
function apply(){
 const s=read(),body=document.body,html=document.documentElement;
 if(!body)return;
 body.dataset.theme=s.theme||'neon';
 body.classList.toggle('arcade-high-contrast',!!s.contrast);
 body.classList.toggle('arcade-large-text',s.textSize==='large');
 body.classList.toggle('arcade-reduced-motion',!!s.reducedMotion);
 document.querySelectorAll('.controls,.pad,.mobile-controls,.touch-controls,.dpad,.control-pad,[data-touch-controls]').forEach(el=>{
   el.classList.remove('arcade-force-touch');
   if(s.touchControls==='hide')el.style.setProperty('display','none','important');
   else if(s.touchControls==='show'){el.style.removeProperty('display');el.classList.add('arcade-force-touch')}
   else el.style.removeProperty('display');
 });
}
function soundAllowed(){const s=read();return s.sound!==false&&Number(s.volume)>0}
function volume(){return Math.max(0,Math.min(1,Number(read().volume??45)/100))}
function playUi(){if(!soundAllowed())return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const ctx=new AC(),o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=660;g.gain.value=.045*volume();o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.07);o.onended=()=>ctx.close()}catch(e){}}
const style=document.createElement('style');style.textContent=`
body.arcade-high-contrast{--txt:#fff!important;--muted:#fff!important;--line:#fff!important;color:#fff!important}
body.arcade-high-contrast .card,body.arcade-high-contrast .panel,body.arcade-high-contrast .stat,body.arcade-high-contrast .box,body.arcade-high-contrast .btn{border-color:#fff!important;color:#fff!important}
body.arcade-high-contrast .sub,body.arcade-high-contrast .help,body.arcade-high-contrast .hint,body.arcade-high-contrast small{color:#fff!important}
body.arcade-large-text{font-size:118%!important}
body.arcade-large-text button,body.arcade-large-text input,body.arcade-large-text select,body.arcade-large-text .desc,body.arcade-large-text .help{font-size:1.12em!important}
body.arcade-reduced-motion *,body.arcade-reduced-motion *::before,body.arcade-reduced-motion *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
.arcade-force-touch.controls{display:flex!important;visibility:visible!important}
.arcade-force-touch.pad,.arcade-force-touch.dpad,.arcade-force-touch.control-pad{display:grid!important;visibility:visible!important}
.arcade-force-touch.mobile-controls,.arcade-force-touch.touch-controls,.arcade-force-touch[data-touch-controls]{display:flex!important;visibility:visible!important}
`;
(document.head||document.documentElement).appendChild(style);
apply();
window.ArcadeCommon={getSettings,apply,soundAllowed,volume,playUi};
window.addEventListener('storage',e=>{if(e.key===KEY)apply()});
})();