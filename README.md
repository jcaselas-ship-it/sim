# △ Juego del Sim

Juego del Sim en HTML (PWA instalable). 6 puntos y 15 líneas: por turnos cada jugador colorea una línea; **pierde quien forme un triángulo con los tres lados de su color**. Nunca hay empate (R(3,3)=6).

**Jugar:** https://jcaselas-ship-it.github.io/sim/

## Modos
- 👥 **2 jugadores** en el mismo dispositivo
- 🤖 **Contra el ordenador** (Fácil / Medio / Difícil) — eliges tu color
- 🌐 **Online** con PeerJS: uno crea la partida (y elige color) y el otro se une con el código de 5 letras o con el enlace `?sim=CÓDIGO`

## Extras
Deshacer jugada · modo claro/oscuro · sonido y vibración on/off · ayuda de "líneas prohibidas" · confirmación con 2º toque en pantallas táctiles · diseño para móvil y tablet (vertical y horizontal) · funciona sin conexión (salvo el modo online).

## Archivos
- `index.html` — el juego completo
- `manifest.webmanifest`, `sw.js`, `icons/` — PWA

Al publicar cambios, sube `VERSION` en `sw.js` para que los dispositivos instalados se actualicen.

Escuela Técnica de Ajedrez · Jacobo Caselas
