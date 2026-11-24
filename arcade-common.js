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
body[data-theme="light"]{--bg:#f8fafc;--card:#ffffff;--line:#cbd5e1;--txt:#0f172a;--muted:#475569;--surface:#ffffff;--surface2:#f1f5f9;--surface3:#e2e8f0;--primary:#0891b2;--info:#2563eb;--border:#cbd5e1;background-color:#f8fafc!important;color:#0f172a!important}
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

#arcadeTouchKit{position:fixed;z-index:9999;left:50%;bottom:calc(9px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(360px,calc(100vw - 20px));display:none;align-items:center;justify-content:space-between;gap:12px;padding:8px 10px;border:1px solid #7890aa55;border-radius:22px;background:linear-gradient(145deg,#071525ed,#0b172beF);box-shadow:0 12px 32px #0009;backdrop-filter:blur(9px);touch-action:none;user-select:none;-webkit-user-select:none}
body.has-arcade-touch-kit{padding-bottom:150px!important}
#arcadeTouchKit .joy-base{width:112px;height:112px;flex:0 0 112px;border-radius:50%;position:relative;border:2px solid #7dd3fc88;background:radial-gradient(circle at 35% 28%,#294867,#10243b 68%,#081423);box-shadow:inset 0 4px 14px #0009,0 4px 12px #0006;touch-action:none}
#arcadeTouchKit .joy-base:before{content:"";position:absolute;inset:18px;border:1px dashed #b9dfff55;border-radius:50%}
#arcadeTouchKit .joy-knob{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px;border-radius:50%;background:linear-gradient(145deg,#e0f2fe,#38bdf8 55%,#0369a1);border:2px solid #e0f2fe;box-shadow:0 4px 10px #0009,inset 0 2px 4px #fff9;pointer-events:none;transform:translate(0,0)}
#arcadeTouchKit .joy-label{position:absolute;left:0;right:0;bottom:4px;text-align:center;color:#c5d7eb;font:800 8px system-ui;letter-spacing:1px;pointer-events:none}
#arcadeTouchKit .arrow-grid{display:grid;grid-template-columns:repeat(3,42px);grid-template-rows:repeat(3,36px);gap:4px;flex:0 0 auto}
#arcadeTouchKit button{border:1px solid #58718d;background:linear-gradient(145deg,#203b58,#10243b);color:#eff8ff;border-radius:10px;font:900 18px system-ui;box-shadow:inset 0 1px #ffffff30,0 3px 6px #0005;touch-action:none;user-select:none;-webkit-user-select:none}
#arcadeTouchKit button:active,#arcadeTouchKit button.is-down{background:linear-gradient(145deg,#0e7490,#164e63);transform:translateY(1px)}
#arcadeTouchKit .up{grid-column:2;grid-row:1}#arcadeTouchKit .left{grid-column:1;grid-row:2}#arcadeTouchKit .right{grid-column:3;grid-row:2}#arcadeTouchKit .down{grid-column:2;grid-row:3}
@media (pointer:coarse),(max-width:850px){#arcadeTouchKit{display:flex}}
@media (max-width:370px){#arcadeTouchKit{gap:7px;padding:7px;width:calc(100vw - 12px)}#arcadeTouchKit .joy-base{width:96px;height:96px;flex-basis:96px}#arcadeTouchKit .joy-knob{width:40px;height:40px;margin:-20px}#arcadeTouchKit .arrow-grid{grid-template-columns:repeat(3,38px);grid-template-rows:repeat(3,34px)}}
`;
(document.head||document.documentElement).appendChild(style);
apply();
function mountTouchKit(){
 const mode=document.body?.dataset?.arcadeControls;
 if(!mode||mode==='none'||document.getElementById('arcadeTouchKit'))return;
 const repeat=document.body.dataset.arcadeRepeat==='true';
 const directions={up:'ArrowUp',left:'ArrowLeft',right:'ArrowRight',down:'ArrowDown'};
 const kit=document.createElement('div');kit.id='arcadeTouchKit';kit.setAttribute('role','group');kit.setAttribute('aria-label','Joystick e setas de movimento');
 const base=document.createElement('div');base.className='joy-base';base.setAttribute('role','application');base.setAttribute('aria-label','Joystick virtual; arraste para mover');
 const knob=document.createElement('div');knob.className='joy-knob';base.appendChild(knob);
 const label=document.createElement('span');label.className='joy-label';label.textContent='JOYSTICK';base.appendChild(label);
 const pad=document.createElement('div');pad.className='arrow-grid';pad.setAttribute('aria-label','Setas direcionais');
 for(const [d,sym] of [['up','▲'],['left','◀'],['right','▶'],['down','▼']]){
  const b=document.createElement('button');b.type='button';b.className=d;b.textContent=sym;b.setAttribute('aria-label',({up:'Cima',down:'Baixo',left:'Esquerda',right:'Direita'})[d]);b.dataset.dir=d;pad.appendChild(b);
 }
 if(mode!=='arrows')kit.appendChild(base);if(mode!=='joystick')kit.appendChild(pad);document.body.appendChild(kit);document.body.classList.add('has-arcade-touch-kit');
 const pressed=new Set();let activeDir=null,repeatTimer=null,pointerId=null;
 function event(type,key,isRepeat=false){try{window.dispatchEvent(new KeyboardEvent(type,{key,code:key,bubbles:true,cancelable:true,repeat:isRepeat}))}catch(e){}}
 function release(){if(repeatTimer){clearInterval(repeatTimer);repeatTimer=null}if(activeDir){event('keyup',directions[activeDir]);pressed.delete(activeDir);activeDir=null}}
 function press(dir){if(!directions[dir])return;if(activeDir===dir)return;release();activeDir=dir;event('keydown',directions[dir]);pressed.add(dir);if(repeat)repeatTimer=setInterval(()=>{if(activeDir===dir)event('keydown',directions[dir],true)},175)}
 function moveStick(e){
  const rect=base.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
  let dx=e.clientX-cx,dy=e.clientY-cy,dist=Math.hypot(dx,dy),max=33;
  if(dist>max){dx=dx/dist*max;dy=dy/dist*max}
  knob.style.transform='translate('+dx+'px,'+dy+'px)';
  if(dist<17){release();return}
  press(Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down'));
 }
 base.addEventListener('pointerdown',e=>{e.preventDefault();pointerId=e.pointerId;base.setPointerCapture?.(pointerId);moveStick(e)});
 base.addEventListener('pointermove',e=>{if(pointerId===e.pointerId){e.preventDefault();moveStick(e)}});
 const stopStick=e=>{if(pointerId!==null&&(e.pointerId===undefined||e.pointerId===pointerId)){release();pointerId=null;knob.style.transform='translate(0,0)'}};
 ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>base.addEventListener(ev,stopStick));
 pad.querySelectorAll('button[data-dir]').forEach(b=>{
  const down=e=>{e.preventDefault();b.classList.add('is-down');b.setPointerCapture?.(e.pointerId);press(b.dataset.dir)};
  const up=e=>{e.preventDefault();b.classList.remove('is-down');release()};
  b.addEventListener('pointerdown',down);['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>b.addEventListener(ev,up));
 });
 window.addEventListener('blur',()=>{release();pointerId=null;knob.style.transform='translate(0,0)'});
}
mountTouchKit();
window.ArcadeCommon={getSettings,apply,soundAllowed,volume,playUi};
window.addEventListener('storage',e=>{if(e.key===KEY)apply()});
})();