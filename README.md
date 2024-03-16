# adaptive-retro-pong

El proyecto consiste en una nueva versión del clásico juego PONG lanzado por Atari en 1972. Esta reinterpretación del juego hace uso de p5.js (una biblioteca de JavaScript para la programación creativa[1]), y tiene como propuesta la implementación de una dificultad adaptativa que busca suponer siempre un desafio para el jugador, esto se logra ajustando la velocidad del juego, ancho de las barras y precision del modo automático, todo de acuerdo al rendimiento del jugador durante la partida.

## Proyecto Juego Retro - Computación Visual UN 2024-1
- Daniel Felipe Montenegro
- Anderson Barrera

## ¿Cómo Jugar?

 [**Demo p5.js:**](https://editor.p5js.org/dafmontenegro/full/Cnx7DpEdd) Juega y edita el codigo en tiempo real desde un proyecto en p5.js

 [**Demo:**](https://dafmontenegro.com/adaptive-retro-pong/) Juega pantalla completa sin interrupciones

## Controles
Al iniciar el juego apareceras en el menú de pausa y tendrás las siguientes opciones para configurar tu partida:

- **Mouse:**
  - **Movimiento del cursor:** Controla la o las barras de forma vertical que estén en modo manual (el modo manual se indica con un punto en el centro de la barra y con la informacion en pantalla `player#Auto: deactivated`)

- **Teclas:**
  - **ENTER:** Pausar/Reanudar el juego.
  - **i:** Activa/Desactiva la informacion del juego (`player1Auto`, `player2Auto`, `Speed`, `barHeight`)
  - **1 (Barra Izquierda):** Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - **2 (Barra derecha):** Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - **a:** Activa/Desactiva el audio del juego.


 **Nota:** La aplicacion esta creada para funcionar en formato paisaje(landscape) de manera responsiva y requiere de un teclado (o un ingreso de caracteres), para que el juego pueda ser configurado y funcione de manera correcta.


## Interfaz

- **Marcador**: Contadores en la mitad superior de cada jugador, los cuales indican el puntaje de cada uno de los jugadores. Cada vez que un jugador pierde una pelota, se le suma un punto al otro jugador.

## Interfaz + información

- **player#Auto**: Indica el modo actual de juego para el player#, el cual puede ser automático o manual y se explican a continuacion:
    - **`0.0# - #.##` (modo automatico):** Define el rango de precision con el que se movera automaticamente el jugador en cada fotograma para interceptar la pelota con respecto al centro de la barra.<br>**Ejemplo:** Hipotéticamente el jugador tiene que moverse 100 pixeles para alinear el centro de la barra con el centro de la pelota durante un fotograma. Si el rango definido es 0.03 - 0.30, entonces se generara un número aleatorio entre estos dos valores y lo que sucederá es que para ese fotograma la barra se moverá entre 3 y 30 pixeles.
    - **`deactivated` (modo manual):** Implica que el jugador se controla con el mouse.

- **Speed**: Se refiere a cuanto tarda la pelota en segundos de ir de lado a lado de la pantalla (recorrer el ancho de la pantalla o `windowWidth`).

- **barHeight**: Es el número que determina el tamaño de la barra en relación con la ventana del juego. `(player#.height / windowHeight)` calcula la proporción de la altura de la barra del jugador en relación con la altura de la ventana del juego. <br>**Ejemplo:** La proporcion 0.16 implica que la barra tiene una altura del 16% de la altura de la ventana.

**Nota:** La altura de las barras, la velocidad de la pelota y los rangos de precision automaticos, pueden variar durante el transcurso de la partida en función de varios factores como lo son, la anotación de puntos, el tipo de jugador (automático o no) y las funciones adaptativas de dificultad implementadas (entre mejor se juegue mas dificil el juego sera y viceversa).


## Detalles de la implementación

### Nuestro TargetFrameRate

Se ha establecido explícitamente el objetivo de FPS en 60 cuadros por segundo usando la función `frameRate(60)` en la función `setup()`. Esto significa que la animación debería apuntar a ejecutarse a una velocidad de 60 FPS.

### ¿Cómo se logra que la aplicación sea responsiva?

Se logra al crear el Lienzo(**Canvas**) con los parámetros de ancho de ventana, alto de ventana(**windowWidth, windowHeight**) para que el tamaño se adapte al tamaño de la ventana del jugador.

### ¿Qué clases se usaron y se crearon en el juego?

1. **Ball (`class Ball`):** Esta clase define el comportamiento y las propiedades de la pelota en el juego. Contiene métodos para inicializar la posición y la velocidad de la pelota, así como para actualizar su posición en cada fotograma (`update`). También incluye un método para mostrar la pelota en el lienzo del juego (`show`). Además, tiene un método `applyScore` para manejar el puntaje y ajustar la velocidad y otras propiedades del juego cuando se marca un punto.

2. **Player (`class Player`):** Esta clase define el comportamiento y las propiedades de los jugadores en el juego, es decir, las barras que los usuarios pueden controlar o que pueden ser controladas automáticamente (`auto = true`). Contiene métodos para inicializar la posición, la altura y la precisión del jugador, así como para actualizar su posición en cada fotograma (`update`). También incluye un método `show` para mostrar al jugador en el lienzo del juego. La precisión (`accuracy`) y la altura (`height`) del jugador pueden ajustarse dinámicamente durante el juego.


### ¿Cómo se logra que el modo automático capture la pelota?

En el método **update()**, el jugador calcula su nueva posición basándose en la posición y dirección actual de la pelota. Verifica si la dirección de la pelota coincide con la dirección del jugador y ajusta la posición vertical del jugador en consecuencia, y del parámetro que depende principalmente es del **accuracy**, que se explica a continuación con otros parámetros menos relevantes pero que igual afectan:

- **`accuracy`**: En la función `applyScore()`, se ajusta la precisión de los jugadores automáticos. Se define un rango mínimo y máximo para la precisión (`minAccuracy` y `maxAcurracy`), y se modifica dinámicamente durante el juego.

- **`height`**: La altura de las barras de los jugadores se inicializa con un valor relativo basado en el tamaño de la ventana (`windowHeight`). En la función `applyScore()`, se ajusta dinámicamente la altura de las paletas, lo que podría modificar los límites mínimo y máximo de la altura durante el juego.

- **`speed`**: Se inicializa la velocidad de la pelota (`ballSpeed`) con un valor constante de 3 segundos. En la función `applyScore()`, se ajusta la velocidad de la pelota.


**Nota:** Se modifican los valores de `height`, `accuracy` y `speed` dependiendo de las condiciones del juego. Por ejemplo, cuando un jugador anota un gol, se ajusta la velocidad de la pelota (`speed`), la precisión del jugador automático (`accuracy`) y la altura de las barras de los jugadores (`height`). Estos ajustes pueden incrementar o decrementar los valores de estos parámetros, afectando así su rango mínimo y máximo.


### ¿En qué momento se hace el ajuste de la dificultad?


El ajuste de la dificultad se realiza en el método `applyScore()` de la clase Ball. Este método se llama cuando un jugador anota un punto, es responsable de actualizar varios aspectos del juego para ajustar la dificultad. 
Dependiendo de si el jugador contrario es controlado automáticamente o por un jugador humano, se ajustan diversos parámetros de juego para aumentar o disminuir la dificultad.


- **Altura de las Barras (height):** Se ajusta dinámicamente en respuesta al rendimiento de los jugadores, manteniendo un equilibrio relativo entre ambos.

- **Precisión de los Jugadores Automáticos (accuracy):** Se ajusta en función del rendimiento de los jugadores automáticos, haciéndolos más o menos efectivos en la interceptación de la pelota.

- **Velocidad de la Pelota (speed):** Se ajusta en respuesta al rendimiento de los jugadores, afectando la rapidez con la que se mueve la pelota por la pantalla.

## Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún error en nuestro codigo, no dudes en ponerte en contacto y compartirnos tu retroalimentacion.

## Referencias
[1] p5.js. Tomado de: [https://p5js.org/](https://p5js.org/)
