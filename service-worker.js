const CACHE_NAME="jogos-do-jhon-v4.19";
const CORE=[
 "./",
 "./index.html",
 "./manifest.webmanifest",
 "./arcade-common.js",
 "./icons/arcade-icon.svg",
 "./imagens/ninja.svg",
 "./imagens/inimigo.svg",
 "./imagens/carla.svg",
 "./imagens/moeda.svg",
 "./imagens/shuriken.svg",
 "./ninja_forest_run_v4_10.html",
 "./games/2048.html",
 "./games/batalha-naval.html",
 "./games/banco-imobiliario.html",
 "./games/detetive.html",
 "./games/corrida.html",
 "./games/sinuca.html",
 "./games/caminhoneiro.html",
 "./games/cobra.html",
 "./games/memoria.html",
 "./games/memoria.html?build=memory-2.1-20261125",
 "./games/velha.html",
 "./games/campo-minado.html",
 "./games/forca.html",
 "./games/tetris.html",
 "./games/voo-desafiador.html",
 "./games/labirinto.html",
 "./games/sudoku.html",
 "./games/xadrez.html",
 "./games/palavras-cruzadas.html",
 "./games/stop.html",
 "./games/galaxia-invasora.html",
 "./games/classicos-arcade.html",
 "./games/domino.html",
 "./games/paciencia.html",
 "./games/pinball.html",
 "./games/bubble-shooter.html",
 "./games/travessia-maluca.html",
 "./games/resta-um.html",
 "./games/duelo-reflexos.html",
 "./games/conecte-pontos.html",
 "./games/acerte-numero.html",
 "./games/caca-palavras.html",
 "./games/torre-hanoi.html",
 "./games/damas.html",
 "./games/ludo.html",
 "./games/tower-defense.html",
 "./games/jewel-match.html",
 "./games/conecte-cores.html",
 "./games/reversi.html",
 "./games/mancala.html",
 "./games/arkanoid.html",
 "./games/corte-frutas.html",
 "./games/salto-infinito.html",
 "./games/arena-bombas.html",
 "./games/ritmo-neon.html",
 "./games/arena-tanques.html",
 "./games/classicos-arcade.html?game=domino",
 "./games/classicos-arcade.html?game=paciencia",
 "./games/classicos-arcade.html?game=pinball",
 "./games/classicos-arcade.html?game=bolhas",
 "./games/classicos-arcade.html?game=frogger",
 "./games/classicos-arcade.html?game=resta"
];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("jogos-do-jhon-")&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET")return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith("/games/memoria.html")){
  const fallback="./games/memoria.html";
  event.respondWith(fetch(req,{cache:"no-store"}).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy))}
   return response;
  }).catch(()=>caches.match(req).then(cached=>cached||caches.match(fallback))));
  return;
 }
 if(req.mode==="navigate"){
  event.respondWith(fetch(req).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy))}
   return response;
  }).catch(()=>caches.match(req).then(cached=>cached||caches.match("./index.html"))));
 }else{
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy))}
   return response;
  })));
 }
});