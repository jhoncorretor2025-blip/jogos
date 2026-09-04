/* Jhon's Epic Forest Quest — inimigos v4.2 */
(function(){
  if (window.__jhonEnemies42) return;
  window.__jhonEnemies42 = true;
  const version = document.querySelector('.version');
  if(version) version.textContent="🥷 JHON'S EPIC FOREST QUEST • v4.2";

  const originalBuild = build;
  build = function(lv){
    originalBuild(lv);
    enemies.forEach(function(e,i){
      if(e.type === 'boss') return;
      const kind = i % 3;
      e.type = kind === 0 ? 'jumper' : (kind === 1 ? 'runner' : 'ninja');
      e.enemyKind = e.type;
      e.jumpPhase = (i % 2) * 1.7;
      e.baseY = e.y;
      e.shotClock = 0;
      e.shotInterval = 240 + (i % 2) * 45;
      e.color = e.type === 'jumper' ? '#facc15' : (e.type === 'runner' ? '#92400e' : '#f8fafc');
    });
  };

  const originalFixed = fixed;
  fixed = function(){
    originalFixed();
    if(typeof enemies === 'undefined') return;
    for(const e of enemies){
      if(!e.alive || e.type === 'boss') continue;
      if(e.type === 'jumper'){
        e.jumpPhase += 0.115;
        const lift = Math.max(0, Math.sin(e.jumpPhase)) * 72;
        e.y = e.baseY - lift;
      }
      if(e.type === 'ninja'){
        e.shotClock++;
        if(e.shotClock >= e.shotInterval){
          e.shotClock = 0;
          const dir = p.x < e.x ? -1 : 1;
          shots.push({x:e.x+e.w/2,y:e.y+e.h/2,dx:dir*3.5,r:5,a:0});
        }
      }
    }
  };

  const originalDraw = draw;
  draw = function(){
    originalDraw();
    if(typeof enemies === 'undefined' || typeof camera === 'undefined') return;
    ctx.save();
    ctx.translate(-camera,0);
    for(const e of enemies){
      if(!e.alive || e.type === 'boss') continue;
      const x=e.x, y=e.y;
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = e.color;
      if(e.type === 'jumper'){
        ctx.fillStyle='#facc15'; ctx.fillRect(x+7,y+13,20,20);
        ctx.beginPath(); ctx.arc(x+17,y+9,10,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#422006'; ctx.fillRect(x+11,y+7,3,3); ctx.fillRect(x+21,y+7,3,3);
        ctx.fillStyle='#f59e0b'; ctx.fillRect(x+5,y+33,9,4); ctx.fillRect(x+21,y+33,9,4);
      } else if(e.type === 'runner'){
        ctx.fillStyle='#92400e'; ctx.fillRect(x+7,y+13,20,20);
        ctx.beginPath(); ctx.arc(x+17,y+9,10,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#fef3c7'; ctx.fillRect(x+11,y+7,3,3); ctx.fillRect(x+21,y+7,3,3);
        ctx.fillStyle='#451a03'; ctx.fillRect(x+5,y+33,9,4); ctx.fillRect(x+21,y+33,9,4);
      } else if(e.type === 'ninja'){
        ctx.fillStyle='#f8fafc'; ctx.fillRect(x+7,y+13,20,20);
        ctx.beginPath(); ctx.arc(x+17,y+9,10,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#0f172a'; ctx.fillRect(x+8,y+5,18,7);
        ctx.fillStyle='#fff'; ctx.fillRect(x+11,y+7,3,2); ctx.fillRect(x+21,y+7,3,2);
        ctx.fillStyle='#cbd5e1'; ctx.fillRect(x+5,y+33,9,4); ctx.fillRect(x+21,y+33,9,4);
        ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(x+34,y+18);ctx.lineTo(x+42,y+18);ctx.moveTo(x+38,y+14);ctx.lineTo(x+38,y+22);ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();
  };
})();
