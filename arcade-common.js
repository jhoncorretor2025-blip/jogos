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
body[data-theme="retro"]{--bg:#170e08;--card:#2b1b0f;--line:#77512e;--txt:#fff0cf;--muted:#e2c49c;--surface:#2b1b0f;--surface2:#3b2818;--surface3:#52371f;--primary:#fb923c;--info:#facc15;--border:#77512e;background-color:#170e08!important;color:#fff0cf!important}
body[data-theme="minimal"]{--bg:#111827;--card:#1f2937;--line:#4b5563;--txt:#f9fafb;--muted:#cbd5e1;--surface:#1f2937;--surface2:#273449;--surface3:#374151;--primary:#e5e7eb;--info:#cbd5e1;--border:#4b5563;background-color:#111827!important;color:#f9fafb!important}
body[data-theme="colorful"]{--bg:#160d2a;--card:#251442;--line:#68449a;--txt:#fff7ff;--muted:#e9d5ff;--surface:#251442;--surface2:#38205a;--surface3:#4c2d70;--primary:#f0abfc;--info:#22d3ee;--border:#68449a;background-color:#160d2a!important;color:#fff7ff!important}
body[data-theme="retro"] .panel,body[data-theme="retro"] .box,body[data-theme="retro"] .sidebox,body[data-theme="retro"] .boardwrap,body[data-theme="retro"] .stat,body[data-theme="retro"] .next{background-color:#2b1b0f!important;border-color:#77512e!important;color:#fff0cf!important}
body[data-theme="minimal"] .panel,body[data-theme="minimal"] .box,body[data-theme="minimal"] .sidebox,body[data-theme="minimal"] .boardwrap,body[data-theme="minimal"] .stat,body[data-theme="minimal"] .next{background-color:#1f2937!important;border-color:#4b5563!important;color:#f9fafb!important}
body[data-theme="colorful"] .panel,body[data-theme="colorful"] .box,body[data-theme="colorful"] .sidebox,body[data-theme="colorful"] .boardwrap,body[data-theme="colorful"] .stat,body[data-theme="colorful"] .next{background-color:#251442!important;border-color:#68449a!important;color:#fff7ff!important}
body.arcade-high-contrast{--txt:#fff!important;--muted:#fff!important;--line:#fff!important;color:#fff!important}
body.arcade-high-contrast .card,body.arcade-high-contrast .panel,body.arcade-high-contrast .stat,body.arcade-high-contrast .box,body.arcade-high-contrast .btn{border-color:#fff!important;color:#fff!important}
body.arcade-high-contrast .sub,body.arcade-high-contrast .help,body.arcade-high-contrast .hint,body.arcade-high-contrast small{color:#fff!important}
body.arcade-large-text{font-size:118%!important}
body.arcade-large-text button,body.arcade-large-text input,body.arcade-large-text select,body.arcade-large-text .desc,body.arcade-large-text .help{font-size:1.12em!important}
body.arcade-reduced-motion *,body.arcade-reduced-motion *::before,body.arcade-reduced-motion *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
.arcade-force-touch.controls{display:flex!important;visibility:visible!important}
.arcade-force-touch.pad,.arcade-force-touch.dpad,.arcade-force-touch.control-pad{display:grid!important;visibility:visible!important}
.arcade-force-touch.mobile-controls{display:grid!important;visibility:visible!important}
.arcade-force-touch.touch-controls,.arcade-force-touch[data-touch-controls]{display:flex!important;visibility:visible!important}
`;
(document.head||document.documentElement).appendChild(style);
apply();
window.ArcadeCommon={getSettings,apply,soundAllowed,volume,playUi};
window.addEventListener('storage',e=>{if(e.key===KEY)apply()});
})();