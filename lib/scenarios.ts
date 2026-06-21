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
        id: "n3",
        title: "La cerradura del faro",
        scene:
          "La puerta del faro está cerrada con un viejo candado de ruedas numéricas. Alguien grabó una secuencia en el marco de madera, con el último número borrado.",
        riddle:
          "La secuencia grabada es: 2 · 4 · 8 · 16 · 32 · ? . ¿Qué número abre el candado?",
        kind: "text",
        answers: ["64", "sesenta y cuatro"],
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
          "El bote tiene una vía de agua que tapas con brea y trapos. Funciona. Pero sin brújula, de noche, solo te queda guiarte por el cielo para encontrar el norte.",
        riddle:
          "¿Qué estrella permanece casi fija en el cielo del hemisferio norte y señala siempre el Norte verdadero?",
        kind: "text",
        answers: [
          "estrella polar",
          "la estrella polar",
          "polar",
          "polaris",
          "la polar",
        ],
        hints: [
          "Los navegantes la han usado durante milenios.",
          "Se encuentra prolongando el borde de la Osa Mayor.",
          "Comparte nombre con el punto cardinal que indica.",
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
        title: "Señales en la arena",
        scene:
          "El piloto, antes de desaparecer, dejó marcas de pedernal grabadas en una placa metálica: puntos y rayas. Reconoces el patrón al instante.",
        riddle:
          "La placa dice: «· · ·   — — —   · · ·». ¿Qué palabra de auxilio internacional representa este código Morse?",
        kind: "text",
        answers: ["sos", "s.o.s", "s o s"],
        hints: [
          "Tres símbolos cortos, tres largos, tres cortos.",
          "Es la señal de socorro más famosa del mundo.",
          "Son tres letras: S — O — S.",
        ],
        success:
          "«SOS». Ahora sabes qué mensaje emitir. Solo falta saber dónde emitirlo.",
        icon: "📡",
      },
      {
        id: "a3",
        title: "La frecuencia de emergencia",
        scene:
          "El manual de a bordo, chamuscado, explica cómo sintonizar la radio. La frecuencia de socorro aeronáutico aparece pero con un dígito ilegible: «1 2 _ . 5».",
        riddle:
          "El manual añade una pista: «el dígito que falta es el único número primo par». ¿Cuál es la frecuencia completa? (formato 0.0)",
        kind: "text",
        answers: ["121.5", "121,5", "1215"],
        hints: [
          "Un número primo solo es divisible por 1 y por sí mismo.",
          "Casi todos los pares no son primos… excepto uno.",
          "El único primo par es el 2. Frecuencia: 12_.5 → 121.5",
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
        title: "Emitiendo socorro",
        scene:
          "Todo está listo: radio encendida, frecuencia correcta, batería conectada. Tomas el micrófono. Hay una última palabra clave que los pilotos repiten tres veces para declarar una emergencia con peligro de muerte.",
        riddle:
          "¿Qué palabra (de origen francés) se pronuncia tres veces por radio para señalar una emergencia grave en aviación y náutica?",
        kind: "text",
        answers: ["mayday", "may day", "mayday mayday mayday"],
        hints: [
          "Viene del francés «m’aidez» (ayúdenme).",
          "La has oído mil veces en las películas de aviones.",
          "Empieza por ‘May’… y se dice tres veces.",
        ],
        success:
          "«MAYDAY, MAYDAY, MAYDAY», repites al micrófono.",
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
        id: "g3",
        title: "La válvula del quemador",
        scene:
          "El quemador tiene un dial de seguridad con números. El manual de mimbre, mordido por la humedad, da una secuencia para abrir el paso del gas.",
        riddle:
          "La secuencia de apertura es: 1 · 1 · 2 · 3 · 5 · 8 · ? . ¿Qué número continúa la serie?",
        kind: "text",
        answers: ["13", "trece"],
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
          "Lastre soltado, rumbo fijado, gas fluyendo, lona asegurada. Antes de prender el quemador recuerdas la regla básica de física que hará que el globo suba.",
        riddle:
          "Para que el globo se eleve, el aire de dentro debe estar… ¿más caliente o más frío que el aire de fuera? (responde con una palabra)",
        kind: "text",
        answers: ["caliente", "mas caliente", "más caliente", "calido", "cálido"],
        hints: [
          "El aire al calentarse pesa menos y tiende a subir.",
          "Por eso el quemador lanza una llama hacia arriba.",
          "Debe estar más… caliente.",
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
          "La placa dice: «La profundidad a la que dormimos, en metros». El diario del barco menciona que se hundió a ‘dos veintenas y diez metros’. ¿Qué número tecleas?",
        kind: "text",
        answers: ["50", "cincuenta"],
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
          "El batiscafo arranca a medias: pide un código de sincronización que el sónar emite como una serie de pulsos repetidos en la pantalla.",
        riddle:
          "El sónar repite el patrón: 3 · 6 · 9 · 12 · ? . ¿Qué número sincroniza el motor?",
        kind: "text",
        answers: ["15", "quince"],
        hints: [
          "La diferencia entre cada número es siempre la misma.",
          "Van de 3 en 3.",
          "12 + 3 = …",
        ],
        success:
          "15. El sónar deja de parpadear y el batiscafo entra en modo de navegación.",
        icon: "📈",
      },
      {
        id: "b5",
        title: "Ascenso seguro",
        scene:
          "El batiscafo está listo, pero recuerdas por qué casi mueres: subiste demasiado deprisa. Para volver sano y salvo a la superficie debes respetar una norma de oro del buceo.",
        riddle:
          "Para evitar la enfermedad descompresiva al subir, el buceador debe ascender de forma… ¿rápida o lenta? (una palabra)",
        kind: "text",
        answers: ["lenta", "lento", "despacio", "lentamente"],
        hints: [
          "Lo contrario de lo que hiciste por pánico.",
          "El nitrógeno necesita tiempo para liberarse de la sangre.",
          "Hay que subir… despacio / lento.",
        ],
        success:
          "Lento y con calma. Programas un ascenso pausado y dejas que el batiscafo te suba sin prisas.",
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
        title: "El orden de los elementos",
        scene:
          "Cuatro runas representan los elementos y deben pulsarse en el orden que indica el poema tallado en el dintel del arco.",
        riddle:
          "El poema dice: «Primero el que respiras, luego el que bebes, después el que te calienta y al final el que pisas». ¿Qué elemento se pulsa EN PRIMER lugar?",
        kind: "choice",
        options: ["Tierra", "Agua", "Fuego", "Aire"],
        answers: ["aire", "el aire"],
        hints: [
          "Lee la primera línea: «el que respiras».",
          "No bebes ni pisas lo que respiras.",
          "Respiras… aire.",
        ],
        success:
          "Aire, agua, fuego y tierra. Las cuatro runas se encienden en cascada y el arco vibra con fuerza renovada.",
        icon: "🜁",
      },
      {
        id: "p5",
        title: "La palabra que abre",
        scene:
          "Todo está alineado. En el centro del arco falta una sola runa: la palabra de cierre que aparece, repetida, en cada inscripción que has descifrado. Una palabra que significa ‘regresar a casa’.",
        riddle:
          "Reúne las iniciales reveladas por el guardián: V-O-L-V-E-R. ¿Cuál es la palabra final que pronuncias para activar el portal?",
        kind: "text",
        answers: ["volver", "volver a casa", "regresar", "casa"],
        hints: [
          "Las iniciales ya forman la palabra completa.",
          "Es lo único que has deseado desde que despertaste.",
          "V-O-L-V-E-R deletrea…",
        ],
        success:
          "«VOLVER», pronuncias, y la runa central prende como una estrella.",
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
