const CACHE_NAME="jogos-do-jhon-v2.6.1";
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
 "./games/cobra.html",
 "./games/memoria.html",
 "./games/velha.html",
 "./games/campo-minado.html",
 "./games/forca.html",
 "./games/tetris.html",
 "./games/voo-desafiador.html",
 "./games/labirinto.html",
 "./games/sudoku.html",
 "./games/xadrez.html",
 "./games/palavras-cruzadas.html"
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