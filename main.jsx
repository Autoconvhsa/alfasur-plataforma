import React from "react";
import ReactDOM from "react-dom/client";
import App from "./alfasur-plataforma14_07.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra el service worker — sin esto, Chrome/Android no ofrece instalar la
// plataforma como app de verdad, solo como acceso directo genérico.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Si falla (por ejemplo, en navegadores viejos), la plataforma sigue
      // funcionando normal, solo sin la opción de "instalar como app".
    });
  });
}
