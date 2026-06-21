import type { Scenario } from "./types";

/**
 * Cada escenario representa una forma distinta de haber llegado a la isla.
 * Al empezar una partida se elige uno al azar, de modo que cada partida
 * cuenta una historia diferente.
 *
 * Convención: `puzzles[0..3]` son la progresión (ordenados de fácil a difícil)
 * y `puzzles[4]` es SIEMPRE el desenlace (el escape). La selección por
 * dificultad coge los primeros (count-1) puzzles + el desenlace.
 */
export const SCENARIOS: Scenario[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "naufragio",
    title: "El Naufragio",
    arrival:
      "Lo último que recuerdas es el crujido del casco partiéndose y una ola del tamaño de una montaña. Despiertas boca arriba en la arena, con un chaleco salvavidas medio deshecho y sal en los labios. Tu barco ya no existe.",
    goal: "Reúne los restos del naufragio, repara un bote y navega hasta tierra firme.",
    ending:
      "Empujas el bote remendado hasta la rompiente, la quilla rasga la espuma y, por fin, la isla queda atrás. Has escapado del mar que un día te trajo.",
    icon: "⛵",
    gradient: "from-ocean-950 via-ocean-800 to-ocean-600",
    puzzles: [
      {
        id: "n1",
        title: "Restos en la orilla",
        scene:
          "La marea ha escupido cajas de la bodega por toda la playa. Necesitas inventariar lo que sirve antes de que el agua se lo lleve de vuelta.",
        riddle:
          "Cuentas 4 cajas intactas. Cada caja guarda 3 sacos y, dentro de cada saco, hay 3 cocos. ¿Cuántos cocos tienes en total?",
        kind: "text",
        answers: ["36", "treinta y seis"],
        hints: [
          "Es una multiplicación encadenada, no una suma.",
          "Primero cocos por saco (3), luego sacos por caja (3).",
          "4 cajas × 3 sacos × 3 cocos = …",
        ],
        success:
          "36 cocos. Agua y comida para días. Guardas todo bajo una lona y sigues registrando los restos.",
        icon: "📦",
      },
      {
        id: "n2",
        title: "El mensaje en la botella",
        scene:
          "Entre las algas brilla una botella sellada con cera. Dentro, una nota escrita por otro náufrago: las letras parecen desplazadas, cifradas.",
        riddle:
          "La nota dice: «KH IDUR». El autor anota debajo: ‘cada letra avanzó 3 puestos en el alfabeto’. Descífrala (escribe las dos palabras).",
        kind: "text",
        answers: ["el faro", "elfaro"],
        hints: [
          "Es un cifrado César: retrocede cada letra 3 posiciones.",
          "K → H, H → E… empieza por ahí.",
          "La primera palabra es ‘EL’. La segunda empieza por F.",
        ],
        success:
          "«EL FARO». Levantas la vista: en el promontorio del norte se recorta una torre de piedra. Allí debe haber respuestas.",
        icon: "🍾",
      },
      {
        id: "n-slide",
        title: "El mapa roto",
        scene:
          "Dentro de la botella, junto a la nota, viajaba un mapa de la isla partido en pedazos que se han desordenado. Recompónlo deslizando las piezas para descubrir dónde se alza el faro.",
        riddle: "Desliza las piezas hasta ordenar el mapa (del 1 al 8).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "slide",
          size: 3,
          clue: "Mueve las piezas contiguas al hueco hasta dejarlas en orden.",
        },
        hints: [
          "Resuelve por filas: coloca primero el 1, 2 y 3 arriba.",
          "Cuando una fila esté bien, intenta no volver a tocarla.",
          "Deja el hueco abajo a la derecha para el final.",
        ],
        success:
          "Las piezas encajan y el mapa revela el camino hasta el faro del promontorio.",
        icon: "🗺️",
      },
      {
        id: "n3",
        title: "La cerradura del faro",
        scene:
          "La puerta del faro está cerrada con un viejo candado de ruedas numéricas. Alguien grabó una secuencia en el marco de madera, con el último número borrado.",
        riddle:
          "El marco muestra la serie 2 · 4 · 8 · 16 · 32 · ? . Gira las ruedas hasta el número que la completa.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "lock",
          digits: 2,
          code: "64",
          clue: "Cada número es el doble del anterior. Marca el que sigue.",
        },
        hints: [
          "Cada número guarda la misma relación con el anterior.",
          "No se suma una cantidad fija: se multiplica.",
          "Cada número es el doble del anterior. 32 × 2 = …",
        ],
        success:
          "El candado cede con un chasquido. La puerta del faro se abre a una escalera de caracol que huele a aceite y a mar.",
        icon: "🔒",
      },
      {
        id: "n4",
        title: "El cuaderno del farero",
        scene:
          "Arriba, junto a la linterna apagada, encuentras el cuaderno del último farero. La última página tiene una adivinanza y, debajo, un mapa hacia un bote escondido.",
        riddle:
          "El farero escribió: «Soy ligero como una pluma, pero ni el hombre más fuerte puede sostenerme mucho tiempo. ¿Qué soy?»",
        kind: "text",
        answers: [
          "el aliento",
          "aliento",
          "la respiracion",
          "respiracion",
          "el aire",
          "aire",
          "la respiración",
        ],
        hints: [
          "No es un objeto: es algo que haces ahora mismo sin pensar.",
          "Lo retienes cuando te sumerges… pero no por mucho.",
          "Tiene que ver con respirar.",
        ],
        success:
          "«EL ALIENTO». La página se despliega y revela el escondite: una cala oculta tras las rocas, donde aguarda un bote de remos.",
        icon: "📖",
      },
      {
        id: "n5",
        title: "Rumbo a casa",
        scene:
          "El bote tiene una vía de agua que tapas con brea y trapos. Funciona. El cuaderno del farero marcaba el rumbo exacto a tierra firme: 45° (Noreste). Debes alinear tu brújula improvisada con ese azimut.",
        riddle:
          "Gira la brújula hasta fijar el rumbo a tierra firme: 45° (Noreste).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "tune",
          min: 0,
          max: 360,
          target: 45,
          tolerance: 5,
          step: 1,
          unit: "°",
          clue: "Mueve la aguja hasta los 45° y mantén la señal fijada.",
        },
        hints: [
          "El Noreste está a mitad de camino entre el Norte (0°) y el Este (90°).",
          "Busca el valor 45 en el dial.",
          "Cuando la señal se fije en verde, confirma.",
        ],
        success:
          "Fijas la proa en la Estrella Polar y remas con todas tus fuerzas.",
        icon: "⭐",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "avion",
    title: "El Accidente Aéreo",
    arrival:
      "La avioneta tosió, perdió altura y el mundo se volvió un rugido de metal. Despiertas colgado del cinturón, con el fuselaje partido sobre la arena y el olor a combustible quemado. El piloto no está.",
    goal: "Recupera la electrónica del avión, repara la radio y emite en la frecuencia de socorro.",
    ending:
      "Una voz rasgada responde entre el ruido blanco: «Recibido, mantenga posición, vamos hacia usted». Te dejas caer sobre la arena, sonriendo al cielo.",
    icon: "✈️",
    gradient: "from-slate-900 via-ocean-900 to-ocean-700",
    puzzles: [
      {
        id: "a1",
        title: "La caja negra",
        scene:
          "Entre los hierros retorcidos rescatas la caja negra (que en realidad es naranja). Su pantalla parpadea con los últimos datos del vuelo.",
        riddle:
          "La pantalla muestra: altitud 9000 pies, descendiendo 1500 pies cada minuto. Si el motor falló a esa altitud, ¿cuántos minutos tardó en tocar el suelo (0 pies)?",
        kind: "text",
        answers: ["6", "seis", "6 minutos", "seis minutos"],
        hints: [
          "Es una simple división.",
          "Cuánto baja por minuto cabe cuántas veces en la altitud total.",
          "9000 ÷ 1500 = …",
        ],
        success:
          "6 minutos de caída. La caja negra se reinicia y libera el panel de la radio. Tienes con qué trabajar.",
        icon: "🟧",
      },
      {
        id: "a2",
        title: "Cablear la radio",
        scene:
          "La radio de emergencia está desconectada: cuatro cables sueltos cuelgan del panel. Cada uno tiene su color y debe ir a su borne correcto, o saltarán las chispas.",
        riddle:
          "Conecta cada cable de colores con el borne que le corresponde.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "wires",
          clue: "Pulsa un cable y luego su borne. El color te guía.",
          pairs: [
            { left: "Cable rojo", right: "Borne + (positivo)", color: "#ef4444" },
            { left: "Cable verde", right: "Toma de tierra", color: "#22c55e" },
            { left: "Cable azul", right: "Antena", color: "#3b82f6" },
            { left: "Cable amarillo", right: "Altavoz", color: "#eab308" },
          ],
        },
        hints: [
          "El rojo casi siempre es el polo positivo.",
          "El verde suele ser la toma de tierra.",
          "Azul → antena, amarillo → altavoz.",
        ],
        success:
          "La radio cobra vida con un zumbido. Ahora hay que encontrar la frecuencia correcta.",
        icon: "🔌",
      },
      {
        id: "a-maze",
        title: "El laberinto de dunas",
        scene:
          "La antena de la cola salió despedida y quedó tras un campo de dunas y chatarra retorcida que forma un auténtico laberinto. Sin ella la radio no alcanzará a nadie: ve a por ella.",
        riddle: "Atraviesa el laberinto hasta la 🏁 para recuperar la antena.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "maze",
          cols: 8,
          rows: 8,
          clue: "Desde la esquina superior izquierda, llega hasta la bandera.",
        },
        hints: [
          "Si un pasillo no tiene salida, retrocede y prueba otro.",
          "Truco clásico: sigue siempre la pared de tu derecha.",
          "Tiende a avanzar hacia abajo y a la derecha.",
        ],
        success:
          "Sales del laberinto de chatarra con la antena en la mano. La señal será mucho más potente.",
        icon: "🏜️",
      },
      {
        id: "a3",
        title: "La frecuencia de emergencia",
        scene:
          "El manual de a bordo, chamuscado, explica cómo sintonizar la radio. La frecuencia de socorro aeronáutico aparece pero con un dígito ilegible: «1 2 _ . 5».",
        riddle:
          "Sintoniza el dial hasta la frecuencia internacional de socorro aeronáutico: 121.5 MHz.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "tune",
          min: 118,
          max: 137,
          target: 121.5,
          tolerance: 0.3,
          step: 0.1,
          unit: "MHz",
          clue: "Desliza con cuidado hasta 121.5 MHz, la frecuencia de emergencia.",
        },
        hints: [
          "La frecuencia de socorro aéreo es 121 coma algo.",
          "Acércate al principio de la banda, sobre 121.",
          "El valor exacto es 121.5 MHz.",
        ],
        success:
          "121.5 MHz, la frecuencia internacional de emergencia. Tecleas el dial con dedos temblorosos.",
        icon: "🎚️",
      },
      {
        id: "a4",
        title: "Cablear el aparato",
        scene:
          "La radio funciona pero no tiene corriente. Hay tres cables sueltos y una batería con un acertijo pintado por el técnico de mantenimiento para evitar cortocircuitos.",
        riddle:
          "El técnico anotó: «Cuantos más quitas de mí, más grande me vuelvo. ¿Qué soy?»",
        kind: "text",
        answers: ["un agujero", "agujero", "el agujero", "un hoyo", "hoyo"],
        hints: [
          "Piensa en algo definido por lo que NO está.",
          "Cavando, lo haces crecer.",
          "Es un agujero / hoyo.",
        ],
        success:
          "«UN AGUJERO». Entiendes el truco: conectas al hueco negativo y la radio se enciende con un zumbido vivo.",
        icon: "🔋",
      },
      {
        id: "a5",
        title: "Transmitir el SOS",
        scene:
          "Todo está listo: radio encendida, frecuencia correcta. La torre de rescate emite una secuencia de pulsos de confirmación que debes repetir exactamente para enganchar la señal y lanzar el MAYDAY.",
        riddle:
          "Observa la secuencia de pulsos y repítela en el mismo orden.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "memory",
          length: 4,
          clue: "Memoriza el orden en que se iluminan los pulsos y reprodúcelo.",
          pads: [
            { symbol: "◉", color: "#ef4444" },
            { symbol: "◉", color: "#22c55e" },
            { symbol: "◉", color: "#3b82f6" },
            { symbol: "◉", color: "#eab308" },
          ],
        },
        hints: [
          "Mira la secuencia entera antes de tocar nada.",
          "Si fallas, puedes volver a verla.",
          "Repite los colores en el mismo orden que se encendieron.",
        ],
        success:
          "Repites los pulsos sin un fallo. «MAYDAY, MAYDAY, MAYDAY», gritas al micrófono.",
        icon: "🆘",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "globo",
    title: "El Globo Perdido",
    arrival:
      "Subiste para ver el amanecer desde las nubes, pero una corriente furiosa secuestró el globo y apagó el quemador. Despiertas enredado en la lona de seda colapsada sobre una duna, con la cesta de mimbre volcada a tu lado.",
    goal: "Repara el quemador, aligera la carga y vuelve a elevar el globo con el viento a favor.",
    ending:
      "El quemador ruge, la seda se hincha como un pulmón gigante y la cesta se despega de la arena. Asciendes hacia el cielo limpio, llevado por el mismo viento que casi te mata.",
    icon: "🎈",
    gradient: "from-orange-300 via-rose-300 to-ocean-400",
    puzzles: [
      {
        id: "g1",
        title: "Inventario en la cesta",
        scene:
          "El globo no se elevará si pesa demasiado. Repasas los sacos de lastre que cuelgan de la cesta para calcular cuánto debes soltar.",
        riddle:
          "Hay 5 sacos de lastre de 8 kg cada uno. Para despegar necesitas reducir el peso a la mitad. ¿Cuántos kilos de lastre debes soltar?",
        kind: "text",
        answers: ["20", "20 kg", "veinte"],
        hints: [
          "Primero calcula el peso total de los 5 sacos.",
          "5 × 8 = 40 kg en total.",
          "La mitad de 40 es…",
        ],
        success:
          "20 kg fuera. La cesta ya parece dispuesta a obedecer al fuego.",
        icon: "⚖️",
      },
      {
        id: "g2",
        title: "El veleta de la duna",
        scene:
          "Necesitas saber hacia dónde te llevará el viento antes de volar. Una vieja veleta oxidada gira en lo alto de la duna y un grabado explica cómo leerla.",
        riddle:
          "La punta de la veleta señala de forma constante hacia donde sale el sol. ¿Hacia qué punto cardinal te empujará el viento?",
        kind: "text",
        answers: ["este", "el este", "oriente", "e"],
        hints: [
          "El viento ‘viene del’ punto al que apunta la veleta.",
          "El sol sale por un punto cardinal concreto.",
          "El sol nace por el Este.",
        ],
        success:
          "Hacia el Este, donde el mapa marca tierra habitada. El rumbo es bueno.",
        icon: "🧭",
      },
      {
        id: "g-slide",
        title: "La carta de navegación",
        scene:
          "La carta de vuelo se rasgó en pedazos al caer. Recomponla deslizando las piezas para entender por dónde sopla la corriente que te llevará a tierra firme.",
        riddle: "Ordena las piezas de la carta (del 1 al 8).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "slide",
          size: 3,
          clue: "Desliza las piezas contiguas al hueco hasta ordenarlas.",
        },
        hints: [
          "Empieza por la primera fila: 1, 2, 3.",
          "Ve resolviendo fila a fila de arriba abajo.",
          "El hueco debe acabar abajo a la derecha.",
        ],
        success:
          "La carta queda completa: ahora ves clara la ruta de vientos hacia tierra firme.",
        icon: "🗺️",
      },
      {
        id: "g3",
        title: "La válvula del quemador",
        scene:
          "El quemador tiene un dial de seguridad con números. El manual de mimbre, mordido por la humedad, da una secuencia para abrir el paso del gas.",
        riddle:
          "La secuencia de apertura es 1 · 1 · 2 · 3 · 5 · 8 · ? . Marca en el dial el número que continúa la serie.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "lock",
          digits: 2,
          code: "13",
          clue: "Cada número es la suma de los dos anteriores (Fibonacci).",
        },
        hints: [
          "Cada número depende de los dos anteriores.",
          "Es la famosa sucesión de Fibonacci.",
          "5 + 8 = …",
        ],
        success:
          "13. El dial encaja y el gas empieza a fluir con un silbido prometedor.",
        icon: "🔥",
      },
      {
        id: "g4",
        title: "El nudo del aeronauta",
        scene:
          "La lona debe sujetarse a la cesta con un nudo que aguante tensión sin apretarse hasta bloquearse. El cuaderno del aeronauta lo describe con una adivinanza.",
        riddle:
          "El cuaderno reza: «Cuanto más me secas, más mojado estoy. ¿Qué soy?»",
        kind: "text",
        answers: ["la toalla", "toalla", "una toalla", "el trapo", "trapo"],
        hints: [
          "Es un objeto cotidiano de tela.",
          "Lo usas al salir de la ducha.",
          "Es una toalla.",
        ],
        success:
          "«LA TOALLA». Mojas un trapo, lo enrollas en la cuerda para que no resbale y aseguras la lona. Ingenioso.",
        icon: "🪢",
      },
      {
        id: "g5",
        title: "El último ascenso",
        scene:
          "Lastre soltado, rumbo fijado, lona asegurada. Solo falta calentar el aire del interior: si lo subes demasiado poco no despegas, si te pasas, la seda peligra. El punto justo está en torno a los 95 °C.",
        riddle:
          "Regula el quemador hasta calentar el aire interior a unos 95 °C para despegar.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "tune",
          min: 20,
          max: 140,
          target: 95,
          tolerance: 5,
          step: 5,
          unit: "°C",
          clue: "Sube la llama hasta acercarte a los 95 °C y mantén la señal estable.",
        },
        hints: [
          "El aire caliente pesa menos y empuja el globo hacia arriba.",
          "Apunta a unos 95 grados, ni poco ni demasiado.",
          "Cuando el medidor se fije en verde, confirma.",
        ],
        success:
          "Aire caliente. Abres el quemador al máximo y la seda se tensa hacia el cielo.",
        icon: "☀️",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "buceo",
    title: "La Inmersión",
    arrival:
      "Bajaste a explorar un pecio a cuarenta metros. Algo falló con el aire, el pánico nubló todo y ascendiste demasiado rápido. Despiertas tosiendo agua salada en una cala rocosa, con el regulador colgando y el batiscafo de superficie a la deriva.",
    goal: "Recupera el equipo, reactiva el batiscafo de superficie y vuelve a la embarcación nodriza.",
    ending:
      "El motor del batiscafo despierta con un borboteo grave y la pequeña nave corta las olas hacia el barco que parpadea en el horizonte. Esta vez sales del agua por tu propio pie.",
    icon: "🤿",
    gradient: "from-ocean-950 via-teal-900 to-emerald-700",
    puzzles: [
      {
        id: "b1",
        title: "Las botellas de oxígeno",
        scene:
          "Tres botellas de aire han quedado varadas en la cala. Antes de volver al agua necesitas saber con cuánto aire cuentas.",
        riddle:
          "Cada botella marca 200 bar y consumes 25 bar por minuto de inmersión. Con las 3 botellas llenas, ¿cuántos minutos de aire tienes en total?",
        kind: "text",
        answers: ["24", "24 minutos", "veinticuatro"],
        hints: [
          "Calcula primero el total de bar y luego divide por el consumo.",
          "3 × 200 = 600 bar disponibles.",
          "600 ÷ 25 = …",
        ],
        success:
          "24 minutos de aire. Suficiente para lo que viene si no te entretienes.",
        icon: "🫧",
      },
      {
        id: "b2",
        title: "El código del pecio",
        scene:
          "En el casco del pecio hundido hay una escotilla con un teclado estanco. Junto a él, una placa de latón con una pista del antiguo capitán.",
        riddle:
          "La placa dice: «La profundidad a la que dormimos, en metros». El diario menciona ‘dos veintenas y diez metros’. Marca ese número en el teclado.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "lock",
          digits: 2,
          code: "50",
          clue: "Una veintena son 20. Dos veintenas y diez metros…",
        },
        hints: [
          "Una veintena son 20.",
          "‘Dos veintenas’ = 2 × 20 = 40.",
          "40 + 10 = …",
        ],
        success:
          "50. La escotilla se abre con un suspiro de burbujas y deja a la vista la sala de máquinas.",
        icon: "🔢",
      },
      {
        id: "b-maze",
        title: "La cueva submarina",
        scene:
          "Tras la escotilla se abre una red de galerías inundadas. Con el aire justo, debes encontrar la salida que lleva a la sala de máquinas sin perderte en la oscuridad.",
        riddle: "Encuentra la salida de la cueva hasta la 🏁.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "maze",
          cols: 9,
          rows: 9,
          clue: "Nada desde la entrada (arriba) hasta la salida (abajo a la derecha).",
        },
        hints: [
          "No malgastes aire: si llegas a un fondo, vuelve atrás.",
          "Sigue una pared de forma constante para no dar vueltas.",
          "El destino está en la esquina opuesta a la entrada.",
        ],
        success:
          "Emerges en una bolsa de aire justo en la sala de máquinas. Lo lograste.",
        icon: "🕳️",
      },
      {
        id: "b3",
        title: "El habitante de la cala",
        scene:
          "Mientras buscas piezas, una criatura de ocho brazos te observa desde una grieta sin soltar la herramienta que necesitas. El diario del capitán dejó una adivinanza sobre ella.",
        riddle:
          "El diario describe: «Tengo ocho brazos, tres corazones y sangre azul; cambio de color para esconderme. ¿Qué animal soy?»",
        kind: "text",
        answers: ["pulpo", "el pulpo", "un pulpo", "octopus"],
        hints: [
          "Vive en el mar y es muy inteligente.",
          "Ocho brazos con ventosas…",
          "Es un pulpo.",
        ],
        success:
          "«EL PULPO». Le ofreces una concha brillante a cambio y, sorprendentemente, suelta la llave inglesa. Trato hecho.",
        icon: "🐙",
      },
      {
        id: "b4",
        title: "Pulsos en el sónar",
        scene:
          "El batiscafo pide sincronizarse con el sónar. La pantalla emite una secuencia de pulsos luminosos que debes reproducir para enganchar la señal.",
        riddle:
          "Memoriza la secuencia de pulsos del sónar y repítela.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "memory",
          length: 4,
          clue: "Observa el orden de los pulsos y reprodúcelo tocando los paneles.",
          pads: [
            { symbol: "◉", color: "#06b6d4" },
            { symbol: "◉", color: "#10b981" },
            { symbol: "◉", color: "#a78bfa" },
            { symbol: "◉", color: "#f59e0b" },
          ],
        },
        hints: [
          "Mira la secuencia completa antes de tocar.",
          "Puedes volver a verla si fallas.",
          "Reproduce los pulsos en el mismo orden.",
        ],
        success:
          "El sónar deja de parpadear y el batiscafo entra en modo de navegación.",
        icon: "📈",
      },
      {
        id: "b5",
        title: "Reconectar el motor",
        scene:
          "Última maniobra antes de ascender: el motor del batiscafo está desmontado y cada sistema debe volver a su sitio. Conéctalo bien o no habrá propulsión para subir.",
        riddle:
          "Reconecta cada sistema del batiscafo con su destino correcto.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "wires",
          clue: "Pulsa un sistema y luego su destino. El color te guía.",
          pairs: [
            { left: "Batería", right: "Cuadro eléctrico", color: "#84cc16" },
            { left: "Hélice", right: "Eje del motor", color: "#f59e0b" },
            { left: "Bomba de achique", right: "Conducto de agua", color: "#06b6d4" },
            { left: "Sónar", right: "Pantalla de mando", color: "#a78bfa" },
          ],
        },
        hints: [
          "La batería alimenta el cuadro eléctrico.",
          "La hélice gira con el eje del motor.",
          "La bomba va al agua; el sónar, a su pantalla.",
        ],
        success:
          "El motor ronronea de nuevo. Programas un ascenso lento y seguro hacia la superficie.",
        icon: "⬆️",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "portal",
    title: "El Portal Olvidado",
    arrival:
      "No hay barco, ni avión, ni recuerdo. Solo un arco de piedra cubierto de runas en mitad de la selva y la certeza imposible de que ayer estabas en tu casa, a mil kilómetros del mar. El arco aún zumba con una energía tibia.",
    goal: "Descifra las runas del arco, restaura la secuencia de energía y reabre el portal por el que llegaste.",
    ending:
      "Las runas se encienden una a una en el orden correcto y el arco se llena de una luz líquida. Respiras hondo, das un paso al frente y la isla se disuelve a tu espalda como un sueño que termina.",
    icon: "🌀",
    gradient: "from-indigo-950 via-purple-900 to-fuchsia-700",
    puzzles: [
      {
        id: "p1",
        title: "La inscripción del arco",
        scene:
          "La base del arco tiene una inscripción matemática que cuenta cuántas almas han cruzado. Debes completarla para que la piedra te reconozca.",
        riddle:
          "La piedra muestra: 1 · 4 · 9 · 16 · 25 · ? . ¿Qué número completa la inscripción?",
        kind: "text",
        answers: ["36", "treinta y seis"],
        hints: [
          "Cada número es un cuadrado perfecto.",
          "1=1², 4=2², 9=3², 16=4², 25=5²…",
          "El siguiente es 6² = …",
        ],
        success:
          "36. La inscripción brilla un instante: la piedra te ha aceptado como viajero.",
        icon: "🪨",
      },
      {
        id: "p2",
        title: "El acertijo del guardián",
        scene:
          "Una voz sin cuerpo resuena en la selva. El guardián del portal no te dejará tocar las runas hasta que respondas su enigma.",
        riddle:
          "El guardián pregunta: «Hablo sin boca y oigo sin oídos. No tengo cuerpo, pero cobro vida con el viento. ¿Qué soy?»",
        kind: "text",
        answers: ["el eco", "eco", "un eco"],
        hints: [
          "Lo encuentras en montañas y cuevas.",
          "Repite lo que dices.",
          "Es el eco.",
        ],
        success:
          "«EL ECO». La voz ríe, satisfecha, y las runas del arco se vuelven tangibles bajo tus dedos.",
        icon: "👁️",
      },
      {
        id: "p-maze",
        title: "El laberinto de la selva",
        scene:
          "La maleza alrededor del arco se ha cerrado formando un laberinto vegetal. El guardián no reabrirá nada hasta que demuestres que sabes moverte por su dominio.",
        riddle: "Atraviesa la selva hasta la 🏁.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "maze",
          cols: 8,
          rows: 8,
          clue: "Avanza desde la entrada hasta el corazón de la selva (la bandera).",
        },
        hints: [
          "Si te topas con un callejón sin salida, retrocede.",
          "Sigue siempre la misma pared para no perderte.",
          "El claro está en la esquina inferior derecha.",
        ],
        success:
          "Sales a un claro y el arco de runas se alza ante ti, más cerca que nunca.",
        icon: "🌿",
      },
      {
        id: "p3",
        title: "El reloj de runas",
        scene:
          "Una de las runas es un reloj sin agujas. Para alinearla debes responder a su enigma del tiempo grabado alrededor de la esfera.",
        riddle:
          "La runa pregunta: «Cuanto más hay de mí, menos ves. ¿Qué soy?»",
        kind: "text",
        answers: ["la oscuridad", "oscuridad", "la niebla", "niebla", "tinieblas"],
        hints: [
          "Llega cada noche.",
          "Es lo contrario de la luz.",
          "Es la oscuridad (o la niebla).",
        ],
        success:
          "«LA OSCURIDAD». La runa-reloj gira sola y encaja en su lugar con un destello violeta.",
        icon: "🕳️",
      },
      {
        id: "p4",
        title: "Elementos y runas",
        scene:
          "Cuatro runas del arco representan los elementos, pero están desordenadas. Un grabado explica qué símbolo pertenece a cada uno. Únelos correctamente para canalizar la energía.",
        riddle:
          "Conecta cada elemento con la runa que le corresponde.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "wires",
          clue: "Pulsa un elemento y luego su runa. El color te guía.",
          pairs: [
            { left: "Aire", right: "Runa del viento ᚹ", color: "#93c5fd" },
            { left: "Agua", right: "Runa de la ola ᛚ", color: "#38bdf8" },
            { left: "Fuego", right: "Runa de la llama ᚲ", color: "#fb923c" },
            { left: "Tierra", right: "Runa de la roca ᛒ", color: "#a3a380" },
          ],
        },
        hints: [
          "El aire es el viento; el agua, la ola.",
          "El fuego es la llama; la tierra, la roca.",
          "Fíjate en el dibujo de cada runa.",
        ],
        success:
          "Las cuatro runas se encienden en cascada y el arco vibra con fuerza renovada.",
        icon: "🜁",
      },
      {
        id: "p5",
        title: "La secuencia de activación",
        scene:
          "Todo está alineado. El arco te muestra una última vez el orden en que las runas deben encenderse para abrir el portal. Memorízalo y repítelo sin un solo error: es tu billete de vuelta a casa.",
        riddle:
          "Observa el orden en que se encienden las runas y repítelo para activar el portal.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "memory",
          length: 5,
          clue: "Memoriza la secuencia completa de runas y reprodúcela en orden.",
          pads: [
            { symbol: "ᚠ", color: "#a78bfa" },
            { symbol: "ᚢ", color: "#f472b6" },
            { symbol: "ᛗ", color: "#22d3ee" },
            { symbol: "ᛟ", color: "#facc15" },
          ],
        },
        hints: [
          "Observa la secuencia entera antes de tocar ninguna runa.",
          "Si te equivocas, el arco te la mostrará de nuevo.",
          "Repite las runas exactamente en el orden en que brillaron.",
        ],
        success:
          "Las runas prenden una a una como estrellas y el arco se llena de luz.",
        icon: "✨",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "crucero",
    title: "El Crucero",
    arrival:
      "Era la última noche de fiesta a bordo. Te asomaste a la barandilla de popa para tomar el aire, una ola inesperada golpeó el casco… y de pronto estabas en el agua negra, viendo cómo las luces del crucero se alejaban sin que nadie te oyera. Nadaste hacia una sombra de tierra hasta perder el sentido.",
    goal: "Sube al punto más alto de la isla, enciende una señal y atrae a un barco que pase por la ruta.",
    ending:
      "El destello del espejo encuentra por fin el puente de un mercante en el horizonte. Tres bocinas largas responden: te han visto. Te dejas caer sobre la roca, agotado y a salvo.",
    icon: "🛳️",
    gradient: "from-indigo-900 via-ocean-800 to-cyan-600",
    puzzles: [
      {
        id: "c1",
        title: "Lo que llevabas encima",
        scene:
          "Vacías los bolsillos sobre una roca: lo poco que sobrevivió al chapuzón será todo tu equipo de supervivencia. Conviene saber con qué cuentas.",
        riddle:
          "Encuentras 3 bengalas y cada una arde durante 120 segundos. ¿Cuántos minutos de señal luminosa tienes en total?",
        kind: "text",
        answers: ["6", "seis", "6 minutos", "seis minutos"],
        hints: [
          "Primero pasa los segundos de cada bengala a minutos.",
          "120 segundos son 2 minutos.",
          "3 bengalas × 2 minutos = …",
        ],
        success:
          "6 minutos de luz. Poca cosa: tendrás que usarlas en el momento justo. Guardas las bengalas y miras hacia arriba.",
        icon: "🎆",
      },
      {
        id: "c-maze",
        title: "El ascenso al acantilado",
        scene:
          "El mejor punto para hacer una señal es la cima del acantilado, pero la pared está plagada de salientes y callejones sin salida. Tienes que encontrar la vereda que llega arriba.",
        riddle: "Sube por el acantilado hasta la cima (la 🏁).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "maze",
          cols: 8,
          rows: 8,
          clue: "Desde la base (arriba a la izquierda) busca la senda hasta la cima.",
        },
        hints: [
          "Si una repisa no tiene continuación, retrocede.",
          "Sigue una pared de forma constante para no dar vueltas.",
          "La cima está en la esquina opuesta a donde empiezas.",
        ],
        success:
          "Llegas jadeando a la cima. Desde aquí se domina todo el horizonte: el sitio perfecto para una señal.",
        icon: "🧗",
      },
      {
        id: "c-lock",
        title: "El cofre del bote salvavidas",
        scene:
          "Un cofre de emergencia de un bote salvavidas ha encallado en las rocas. Dentro hay un espejo de señales, pero está cerrado con un candado numérico. Una etiqueta da la pista.",
        riddle:
          "La etiqueta dice: «código = el triple de 7». Marca ese número en el candado.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "lock",
          digits: 2,
          code: "21",
          clue: "El triple de 7 es 7 + 7 + 7.",
        },
        hints: [
          "Triple significa multiplicar por 3.",
          "7 × 3 = …",
          "El código es 21.",
        ],
        success:
          "El candado se abre. Dentro, intacto, un espejo de señales pulido. Justo lo que necesitabas.",
        icon: "🧰",
      },
      {
        id: "c4",
        title: "El acertijo del vigía",
        scene:
          "Grabada en la tapa del cofre hay una adivinanza que dejó algún vigía con tiempo de sobra. Resolverla te recuerda dónde mirar.",
        riddle:
          "«Tengo ciudades, pero no casas; montañas, pero no árboles; y agua, pero ni un solo pez. ¿Qué soy?»",
        kind: "text",
        answers: ["un mapa", "mapa", "el mapa"],
        hints: [
          "Es un objeto plano que cabe doblado en un bolsillo.",
          "Lo usas para no perderte.",
          "Es un mapa.",
        ],
        success:
          "«UN MAPA». En el forro del cofre hay justamente uno con las rutas de navegación marcadas: sabrás por dónde pasan los barcos.",
        icon: "🗺️",
      },
      {
        id: "c5",
        title: "La hoguera de señales",
        scene:
          "Antes de usar el espejo preparas una hoguera de respaldo en la cima. Necesitas leña suficiente para que el humo se vea a kilómetros.",
        riddle:
          "Juntas 5 ramas grandes y el doble de ramas pequeñas. ¿Cuántas ramas pequeñas reúnes?",
        kind: "text",
        answers: ["10", "diez"],
        hints: [
          "El doble significa multiplicar por 2.",
          "5 × 2 = …",
          "Son 10 ramas pequeñas.",
        ],
        success:
          "10 ramas pequeñas y 5 grandes: una buena pira lista para arder. Solo falta llamar la atención de un barco.",
        icon: "🔥",
      },
      {
        id: "c-tune",
        title: "El espejo de señales",
        scene:
          "Un mercante asoma en el horizonte. Tienes una sola oportunidad: inclinar el espejo en el ángulo exacto para que el reflejo del sol golpee su puente y te vean.",
        riddle:
          "Orienta el espejo hasta fijar el reflejo sobre el barco: ángulo 60°.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "tune",
          min: 0,
          max: 90,
          target: 60,
          tolerance: 3,
          step: 1,
          unit: "°",
          clue: "Inclina el espejo despacio hasta que la señal se fije sobre el barco.",
        },
        hints: [
          "El barco está alto en el horizonte: necesitas bastante inclinación.",
          "Acércate a los 60 grados.",
          "Cuando el medidor se ponga verde, confirma.",
        ],
        success:
          "El haz de luz da de lleno en el puente del mercante.",
        icon: "🪞",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "piratas",
    title: "Abandonado por Piratas",
    arrival:
      "Te acusaron de quedarte con parte del botín. El capitán, sin juicio ni clemencia, te dejó marooned en este islote con una cantimplora medio vacía, una pistola con una sola bala y un trozo de mapa que nadie supo leer. «La ley de la costa», dijeron, antes de izar velas.",
    goal: "Descifra el mapa, desentierra el tesoro y huye en la chalupa que los contrabandistas esconden en la cueva.",
    ending:
      "Empujas la chalupa fuera de la cueva con el cofre a bordo. El islote, que iba a ser tu tumba, se encoge tras la estela. Tendrás tu venganza… pero primero, libertad.",
    icon: "🏴‍☠️",
    gradient: "from-amber-900 via-orange-800 to-stone-700",
    puzzles: [
      {
        id: "pi1",
        title: "El trozo de mapa",
        scene:
          "El pedazo de mapa está escrito a la vieja usanza, con cifras romanas que marcan los pasos hasta el tesoro. Tienes que traducirlas para no cavar en el sitio equivocado.",
        riddle:
          "El mapa indica avanzar «XV» pasos hacia el peñasco. ¿Cuántos pasos son en números normales?",
        kind: "text",
        answers: ["15", "quince"],
        hints: [
          "En números romanos, X vale 10 y V vale 5.",
          "XV = 10 + 5.",
          "Son 15 pasos.",
        ],
        success:
          "15 pasos. Cuentas desde el peñasco y marcas el punto con un palo. El mapa, sin embargo, sigue roto en pedazos.",
        icon: "📜",
      },
      {
        id: "pi-slide",
        title: "El mapa rasgado",
        scene:
          "El resto del mapa está hecho jirones. Recolócalo deslizando los fragmentos para ver el dibujo completo de la ubicación del cofre.",
        riddle: "Ordena los fragmentos del mapa (del 1 al 8).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "slide",
          size: 3,
          clue: "Desliza los pedazos contiguos al hueco hasta recomponer el mapa.",
        },
        hints: [
          "Coloca primero la fila superior: 1, 2, 3.",
          "Resuelve fila por fila, de arriba abajo.",
          "El hueco debe quedar abajo a la derecha.",
        ],
        success:
          "El mapa cobra sentido: una equis bajo la palmera torcida. Ahí está el tesoro.",
        icon: "🗺️",
      },
      {
        id: "pi3",
        title: "El guardián de la palmera",
        scene:
          "Junto a la palmera torcida, alguien clavó una tabla con una adivinanza tallada a cuchillo. Los piratas eran supersticiosos: mejor responder antes de cavar.",
        riddle:
          "«No estoy vivo, pero crezco; no tengo pulmones, pero necesito aire; no tengo boca, pero el agua me mata. ¿Qué soy?»",
        kind: "text",
        answers: ["el fuego", "fuego", "la llama", "llama"],
        hints: [
          "Da luz y calor.",
          "Lo apagas echándole agua.",
          "Es el fuego.",
        ],
        success:
          "«EL FUEGO». La tabla cede y, debajo, la tierra está removida: empiezas a cavar y tu pala golpea madera.",
        icon: "🔥",
      },
      {
        id: "pi-lock",
        title: "El cofre del tesoro",
        scene:
          "El cofre está cerrado con un candado de tres ruedas. Tallados en la tapa, los toques de campana con que el capitán abría su botín.",
        riddle:
          "Los toques de campana fueron: cuatro, luego dos, luego uno. Marca esa combinación.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "lock",
          digits: 3,
          code: "421",
          clue: "Cuatro — dos — uno, en ese orden.",
        },
        hints: [
          "Cada rueda es un toque de campana.",
          "Primero el 4, luego el 2, luego el 1.",
          "La combinación es 421.",
        ],
        success:
          "El candado se abre con un crujido. Oro, monedas y joyas relucen dentro. Pero aún tienes que salir de la isla.",
        icon: "💰",
      },
      {
        id: "pi5",
        title: "El rumbo de la chalupa",
        scene:
          "El mapa marca dónde esconden los contrabandistas una chalupa: «hacia donde muere el sol». Necesitas tener clara la dirección antes de cargar con el cofre.",
        riddle:
          "Si la chalupa está «hacia donde muere el sol», ¿en qué punto cardinal debes buscarla?",
        kind: "text",
        answers: ["oeste", "el oeste", "occidente", "o", "poniente"],
        hints: [
          "El sol nace por un lado y se pone por el contrario.",
          "Sale por el Este…",
          "…y se pone por el Oeste.",
        ],
        success:
          "Al Oeste. Arrastras el cofre hacia la costa de poniente, donde una boca de cueva se abre entre las rocas.",
        icon: "🧭",
      },
      {
        id: "pi-maze",
        title: "La cueva del contrabandista",
        scene:
          "La cueva es un dédalo de galerías excavadas para despistar a la autoridad. En algún rincón aguarda la chalupa. Con la marea subiendo, no puedes permitirte perderte.",
        riddle: "Encuentra la chalupa al fondo de la cueva (la 🏁).",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "maze",
          cols: 9,
          rows: 9,
          clue: "Avanza desde la entrada hasta la chalupa, en el extremo opuesto.",
        },
        hints: [
          "Los callejones sin salida son trampas: retrocede.",
          "Sigue siempre la misma pared para no repetir camino.",
          "La salida con la chalupa está abajo a la derecha.",
        ],
        success:
          "Al fondo, a flote en una poza, una chalupa con remos.",
        icon: "🛶",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "capsula",
    title: "La Cápsula de Escape",
    arrival:
      "La estación oceanográfica flotante se inundaba y las alarmas aullaban. Apenas tuviste tiempo de meterte en una cápsula de escape antes de que todo se fuera al fondo. La cápsula amerizó dando tumbos y la corriente te varó en esta isla. Ahora yace medio inundada en la arena, con la electrónica chisporroteando.",
    goal: "Achica la cápsula, reinicia sus sistemas y reactiva la baliza para enviar tu posición al satélite de rescate.",
    ending:
      "La baliza emite un pitido firme y un LED verde confirma: posición enviada al satélite. En cuestión de horas alguien sabrá exactamente dónde estás. Te recuestas en la cápsula y, por primera vez, respiras tranquilo.",
    icon: "🛰️",
    gradient: "from-slate-950 via-cyan-900 to-emerald-700",
    puzzles: [
      {
        id: "ca1",
        title: "El registro de la cápsula",
        scene:
          "La pantalla de diagnóstico aún funciona a ratos. Antes de nada conviene saber cuánta autonomía te queda para no quedarte a oscuras a mitad de la reparación.",
        riddle:
          "La batería está al 80 % y pierde un 5 % cada hora. ¿Cuántas horas tardará en quedarse a 0 %?",
        kind: "text",
        answers: ["16", "dieciseis", "dieciséis", "16 horas"],
        hints: [
          "Tienes que ver cuántas veces cabe el 5 en el 80.",
          "Es una división: 80 ÷ 5.",
          "80 ÷ 5 = …",
        ],
        success:
          "16 horas de margen. Tiempo suficiente si no te entretienes. Te pones manos a la obra.",
        icon: "🔋",
      },
      {
        id: "ca-wires",
        title: "El panel quemado",
        scene:
          "El cortocircuito ha soltado los conectores principales del panel. Cada módulo debe volver a su toma correcta o nada arrancará.",
        riddle: "Reconecta cada módulo de la cápsula con su toma correcta.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "wires",
          clue: "Pulsa un módulo y luego su toma. El color te guía.",
          pairs: [
            { left: "Batería", right: "Bus de energía", color: "#84cc16" },
            { left: "Antena", right: "Transmisor", color: "#3b82f6" },
            { left: "Bomba", right: "Achique", color: "#06b6d4" },
            { left: "GPS", right: "Procesador", color: "#f59e0b" },
          ],
        },
        hints: [
          "La batería alimenta el bus de energía.",
          "La antena va al transmisor; la bomba, al achique.",
          "El GPS se conecta al procesador.",
        ],
        success:
          "Los conectores encajan y el panel se ilumina con un parpadeo esperanzador. Hay corriente.",
        icon: "🔌",
      },
      {
        id: "ca3",
        title: "La clave del sistema",
        scene:
          "El sistema operativo pide una clave de desbloqueo. El manual de a bordo la oculta tras una adivinanza, por seguridad.",
        riddle:
          "«Viajo por todo el mundo y, sin embargo, siempre me quedo en una esquina. ¿Qué soy?»",
        kind: "text",
        answers: ["un sello", "sello", "el sello", "un sello de correos"],
        hints: [
          "Va pegado a las cartas.",
          "Se queda en la esquina del sobre.",
          "Es un sello (de correos).",
        ],
        success:
          "«UN SELLO». El sistema acepta la clave y arranca el módulo de comunicaciones.",
        icon: "🧩",
      },
      {
        id: "ca-memory",
        title: "La secuencia de arranque",
        scene:
          "Antes de transmitir, la cápsula ejecuta una secuencia de encendido: una cadena de pulsos que debes confirmar repitiéndola en el panel táctil.",
        riddle: "Memoriza la secuencia de arranque y repítela.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "memory",
          length: 5,
          clue: "Observa el orden en que parpadean los módulos y reprodúcelo.",
          pads: [
            { symbol: "◉", color: "#22d3ee" },
            { symbol: "◉", color: "#a3e635" },
            { symbol: "◉", color: "#f472b6" },
            { symbol: "◉", color: "#fbbf24" },
          ],
        },
        hints: [
          "Mira la secuencia completa antes de tocar.",
          "Puedes volver a verla si fallas.",
          "Repite los colores en el mismo orden.",
        ],
        success:
          "La secuencia se valida y la cápsula entra en modo de transmisión.",
        icon: "🧠",
      },
      {
        id: "ca5",
        title: "El intervalo de la baliza",
        scene:
          "La baliza no transmite en continuo para ahorrar energía: lanza pulsos espaciados. El satélite necesita varios para fijar tu posición.",
        riddle:
          "La baliza emite una señal cada 30 segundos. ¿Cuántas señales lanza en 5 minutos?",
        kind: "text",
        answers: ["10", "diez", "10 señales"],
        hints: [
          "Pasa los 5 minutos a segundos: 5 × 60 = 300.",
          "Divide 300 entre 30.",
          "300 ÷ 30 = …",
        ],
        success:
          "10 señales en cinco minutos: de sobra para que el satélite te localice. Solo falta apuntar la antena.",
        icon: "📶",
      },
      {
        id: "ca-tune",
        title: "Enlace con el satélite",
        scene:
          "El satélite meteorológico que hará de puente pasa ahora mismo sobre ti. Debes sintonizar la antena en su frecuencia exacta antes de que se aleje.",
        riddle:
          "Sintoniza la antena en la frecuencia del satélite: 137.5 MHz.",
        kind: "minigame",
        answers: [],
        minigame: {
          type: "tune",
          min: 130,
          max: 145,
          target: 137.5,
          tolerance: 0.3,
          step: 0.1,
          unit: "MHz",
          clue: "Desliza con cuidado hasta 137.5 MHz y mantén el enlace fijado.",
        },
        hints: [
          "Los satélites meteorológicos emiten cerca de 137 MHz.",
          "Acércate a 137 y afina al medio.",
          "El valor exacto es 137.5 MHz.",
        ],
        success:
          "La señal engancha el satélite con un pitido limpio.",
        icon: "🛰️",
      },
    ],
  },
];

export function pickRandomScenario(excludeId?: string): Scenario {
  const pool = excludeId
    ? SCENARIOS.filter((s) => s.id !== excludeId)
    : SCENARIOS;
  const list = pool.length ? pool : SCENARIOS;
  return list[Math.floor(Math.random() * list.length)];
}
