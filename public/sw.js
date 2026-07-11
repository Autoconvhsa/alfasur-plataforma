// Service worker mínimo — su única función es existir y responder a las peticiones,
// para que Chrome/Android reconozcan la plataforma como una app instalable de verdad
// (con su propio ícono, sin la barra del navegador encima), no solo un acceso directo.
// No guarda nada en caché: cada vez que abras la app, sigue pidiendo todo a internet,
// así que siempre ves la información más reciente, igual que ahora.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Simplemente deja pasar la petición tal cual, sin interceptar ni guardar nada.
  event.respondWith(fetch(event.request));
});
