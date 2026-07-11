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

// Cuando llega un aviso push del servidor, se muestra como notificación del sistema.
self.addEventListener("push", (event) => {
  let datos = { title: "Recordatorio", body: "Tienes una cita próxima." };
  try { datos = event.data.json(); } catch {}
  event.waitUntil(
    self.registration.showNotification(datos.title, {
      body: datos.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
    })
  );
});

// Al tocar la notificación, abre (o enfoca) la plataforma.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return self.clients.openWindow("/");
    })
  );
});
