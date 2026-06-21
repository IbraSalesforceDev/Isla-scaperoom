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
];

export function pickRandomScenario(excludeId?: string): Scenario {
  const pool = excludeId
    ? SCENARIOS.filter((s) => s.id !== excludeId)
    : SCENARIOS;
  const list = pool.length ? pool : SCENARIOS;
  return list[Math.floor(Math.random() * list.length)];
}
