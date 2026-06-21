# 🏝️ La Isla · Escape Room

Juego de escape room interactivo: **apareces en una isla, no sabes cómo has
llegado y la única forma de salir es averiguar cómo lo hiciste.**

Cada partida elige al azar **una de 8 historias** distintas sobre cómo acabaste
en la isla, así que no hay dos partidas iguales. Antes de empezar eliges entre
**3 niveles de dificultad** que cambian el número de enigmas, el tiempo y las
pistas disponibles.

## Historias (variantes)

| Historia | Cómo llegaste | Cómo escapas |
|----------|---------------|--------------|
| ⛵ El Naufragio | Tu barco se hundió en una tormenta | Reparas un bote y navegas guiándote por las estrellas |
| ✈️ El Accidente Aéreo | Tu avioneta amerizó | Reparas la radio y emites en la frecuencia de socorro |
| 🎈 El Globo Perdido | Una corriente secuestró tu globo | Reparas el quemador y vuelves a elevarte |
| 🤿 La Inmersión | Un fallo de aire buceando un pecio | Reactivas el batiscafo y vuelves a la nodriza |
| 🌀 El Portal Olvidado | Un portal de runas te trajo | Descifras las runas y reabres el portal |
| 🛳️ El Crucero | Caíste por la borda de noche | Subes al acantilado y atraes a un barco con un espejo de señales |
| 🏴‍☠️ Abandonado por Piratas | Te dejaron marooned en un islote | Descifras el mapa, desentierras el tesoro y huyes en una chalupa |
| 🛰️ La Cápsula de Escape | Amerizaste en una cápsula de emergencia | Reinicias los sistemas y activas la baliza vía satélite |

## Niveles de dificultad

| Nivel | Enigmas | Tiempo | Pistas | Respuestas |
|-------|---------|--------|--------|------------|
| 🏖️ Explorador | 4 | 15 min | 3 por enigma | Flexibles |
| 🌅 Náufrago | 5 | 14 min | 2 por enigma | Flexibles |
| ⛈️ Superviviente | 6 | 12 min | 1 por enigma | Exactas |

## Minijuegos interactivos

Muchos enigmas no se resuelven escribiendo, sino jugando. Tipos disponibles:

- 🔒 **Cerradura de dial** — gira las ruedas hasta la combinación correcta
- 🔌 **Conectar cables** — une cada cable/sistema con su destino
- 🧠 **Secuencia de memoria** (tipo Simon) — repite la secuencia que se ilumina
- 📻 **Sintonizador** — desliza hasta fijar la señal/valor correcto
- 🧩 **Puzzle de piezas** (taquín) — desliza las fichas hasta recomponer el mapa
- 🌀 **Laberinto** — llega a la salida con las flechas, WASD o los botones

Los minijuegos se mezclan con los enigmas de texto y están repartidos para que
aparezca al menos uno en cualquier nivel. Las secuencias, laberintos y puzzles
se generan al azar en cada partida.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) para la interfaz
- Sin backend: todo el juego corre en el cliente (ideal para Vercel)

## Desarrollo

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start
```

## Despliegue en Vercel

El proyecto es un Next.js estándar: al importar el repositorio en Vercel se
detecta y despliega automáticamente sin configuración adicional.

## Cómo añadir más historias o enigmas

Todo el contenido vive en [`lib/scenarios.ts`](lib/scenarios.ts). Cada escenario
tiene 5 `puzzles` ordenados de fácil a difícil; el **último siempre es el
escape**. La dificultad escoge los primeros `(n-1)` enigmas más el desenlace.
Para añadir una historia nueva basta con añadir otro objeto al array `SCENARIOS`.
