# adaptive-retro-pong

El proyecto consiste en una nueva versión del clásico juego PONG lanzado por Atari en 1972. Esta reinterpretación del juego hace uso de p5.js (una biblioteca de JavaScript para la programación creativa[1]), y tiene como propuesta la implementación de una dificultad adaptativa que busca suponer siempre un desafio para el jugador, esto se logra ajustando la velocidad del juego, ancho de las barras y precision del modo automático, todo de acuerdo al rendimiento del jugador durante la partida.

## Proyecto Juego Retro - Computación Visual UN 2024-1
- Daniel Felipe Montenegro
- Anderson Barrera

## ¿Cómo Jugar?

 [**Demo p5.js:**](https://editor.p5js.org/dafmontenegro/full/Cnx7DpEdd) Juega y edita el codigo en tiempo real desde un proyecto en p5.js

 [**Demo:**](https://montenegrodanielfelipe.com/adaptive-retro-pong/) Juega pantalla completa sin interrupciones

## Controles
Al iniciar el juego apareceras en el menú de pausa y tendrás las siguientes opciones para configurar tu partida:

- **Mouse:**
  - **Movimiento del cursor:** Controla la o las barras de forma vertical que estén en modo manual (el modo manual se indica con un punto en el centro de la barra y con la informacion en pantalla `player#Auto: deactivated`)

- **Teclas:**
  - **ENTER:** Pausar/Reanudar el juego.
  - **i :** Activa/Desactiva la informacion del juego (`player1Auto`, `player2Auto`, `Speed`, `barHeight`)
  - **1 (Barra Izquierda):** Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - **2 (Barra derecha):** Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - **a :** Activa/Desactiva el audio del juego.


 > **Nota:** La aplicacion esta creada para funcionar en formato paisaje (landscape) de manera responsiva y requiere de un teclado (o un ingreso de caracteres), para que el juego pueda ser configurado y funcione de manera correcta.

## Interfaz

- **Marcador**: Contadores en la mitad superior de cada jugador, los cuales indican el puntaje de cada uno de los jugadores. Cada vez que un jugador pierde una pelota, se le suma un punto al otro jugador.

## Interfaz + información

- **player#Auto**: Indica el modo actual de juego para el player#, el cual puede ser automático o manual y se explican a continuacion:
    - **`0.0# - #.##` (modo automatico):** Define el rango de precision con el que se movera automaticamente el jugador en cada fotograma para interceptar la pelota con respecto al centro de la barra.<br>**Ejemplo:** Hipotéticamente el jugador tiene que moverse 100 pixeles para alinear el centro de la barra con el centro de la pelota durante un fotograma. Si el rango definido es 0.03 - 0.30, entonces se generara un número aleatorio entre estos dos valores y lo que sucederá es que para ese fotograma la barra se moverá entre 3 y 30 pixeles.
    - **`deactivated` (modo manual):** Implica que el jugador se controla con el mouse.

- **Speed**: Se refiere a cuanto tarda la pelota en segundos de ir de lado a lado de la pantalla (recorrer el ancho de la pantalla o `windowWidth`).

- **barHeight**: Es el número que determina el tamaño de la barra en relación con la ventana del juego. `(player#.height / windowHeight)` calcula la proporción de la altura de la barra del jugador en relación con la altura de la ventana del juego. <br>**Ejemplo:** La proporcion 0.16 implica que la barra tiene una altura del 16% de la altura de la ventana.

> La altura de las barras, la velocidad de la pelota y los rangos de precision automaticos, pueden variar durante el transcurso de la partida en función de varios factores como lo son, la anotación de puntos, el tipo de jugador (automático o no) y las funciones adaptativas de dificultad implementadas (entre mejor se juegue mas dificil el juego sera y viceversa).

## Detalles de la implementación

### Nuestro TargetFrameRate

Se ha establecido explícitamente el objetivo de FPS en 60 cuadros por segundo usando la función `frameRate(60)` en la función `setup()`. Esto significa que la animación debería apuntar a ejecutarse a una velocidad de 60 FPS.

### ¿Cómo se logra que la aplicación sea responsiva?

1. **Tamaño del lienzo dinámico:** Al crear el lienzo con `createCanvas(windowWidth, windowHeight)`, el lienzo se ajusta automáticamente al tamaño de la ventana del navegador. Esto garantiza que el juego se adapte a diferentes tamaños de pantalla.

2. **Dimensiones y posiciones relativas:** Las dimensiones y posiciones de los elementos del juego se definen en función del tamaño de la ventana, utilizando valores como `windowWidth`, `windowHeight` y proporciones de estos valores. Por ejemplo, el tamaño de la pelota (`ballSize`) se define como un porcentaje (`windowHeight * 0.02`) del alto de la ventana, y las posiciones de los jugadores (`player1` y `player2`) también se definen en función del tamaño de la ventana.

3. **Manejo de orientación de pantalla:** El código verifica la orientación de la pantalla con la condición `if (windowHeight < windowWidth)`. Si la altura de la ventana es menor que su anchura, se asume que la pantalla está en modo horizontal (landscape) y se ejecuta el juego. Si la altura es mayor que la anchura, se muestra un mensaje indicando al usuario que use el juego en modo horizontal.

### ¿Qué clases se usaron y se crearon en el juego?

1. **Ball (`class Ball`):** Esta clase define el comportamiento y las propiedades de la pelota en el juego. Contiene métodos para inicializar la posición y la velocidad de la pelota, así como para actualizar su posición en cada fotograma (`update`). También incluye un método para mostrar la pelota en el lienzo del juego (`show`). Además, tiene un método `applyScore` para manejar el puntaje y ajustar la velocidad y otras propiedades del juego cuando se marca un punto.

2. **Player (`class Player`):** Esta clase define el comportamiento y las propiedades de los jugadores en el juego, es decir, las barras que los usuarios pueden controlar o que pueden ser controladas automáticamente (`auto = true`). Contiene métodos para inicializar la posición, la altura y la precisión del jugador, así como para actualizar su posición en cada fotograma (`update`). También incluye un método `show` para mostrar al jugador en el lienzo del juego. La precisión (`accuracy`) y la altura (`height`) del jugador pueden ajustarse dinámicamente durante el juego.

### ¿Cómo se logra que el modo automático capture la pelota?

En el método **Player.update()** el jugador automático calcula su nueva posición basándose en la `coordenada y` de la pelota como dirección de la misma, lo que hace durante un fotograma es verificar si la trayectoria actual va a impactar su lado de la pantalla, en caso de que sí, ajustará su posición de acuerdo a `accuracy` como se explicara a continuación y de lo contrario se quedara quieto.<br><br>
Esta es la linea de codigo responsable de hacer el ajuste mencionado:
```javascript
this.y += (ball.y - this.y) * random(this.accuracy/10, this.accuracy);
```
La idea consiste en calcular la distancia a la que se encuentra la pelota (`ball.y`) con respecto al centro de la barra (`this.y`), esto se hace por medio de `(ball.y - this.y)` que puede dar como resultado un valor tanto positivo como negativo, es por eso que se usa `+=` en la formula. Una vez que se sabe cual es la distancia que tendria que moverse en `y` la barra para quedar perfectamente alineada con la pelota, lo que se hace es generar un numero aleatorio que vaya en rango definido de acuerdo a `this.accuracy`, y que es de la forma `0.0# - #.##` donde `0.0#` es una decima parte de this.accuracy y corresponde al **limite inferior;** de manera viceversa this.accuracy hace las veces de **limite superior.**

### ¿En qué momento se hace el ajuste de la dificultad?

El ajuste de la dificultad se realiza en el método `Ball.applyScore()`. Este método se llama cuando un jugador anota un punto y es responsable de actualizar varios aspectos del juego que son responsables de la dificultad. Los ajustes de dificultad son los siguientes:

- **Precisión de los Jugadores Automáticos (`accuracy`):** En la función `Ball.applyScore()`, se ajusta la precisión de los jugadores automáticos de acuerdo al rendimiento del otro jugador y si es automatico o no. Se define un rango mínimo y máximo para la precisión (`minAccuracy` y `maxAcurracy`), y se modifica dinámicamente durante el juego, haciéndolos más o menos efectivos en la interceptación de la pelota.

- **Velocidad de la Pelota (`speed`):** Se inicializa la velocidad de la pelota (`ballSpeed`) con un valor de 3 segundos, estos segundos hacen referencia al tiempo que tarda la pelota de ir de lado a lado de la pantalla y se ajustan de acuerdo al rendimiento de los jugadores, afectando la rapidez percibida con la que se mueve la pelota por la pantalla.

- **Altura de las Barras (`height`):** La altura de las barras de los jugadores se inicializa con un valor relativo basado en la altura de la ventana (`windowHeight`). En la función `Ball.applyScore()`, se ajusta dinámicamente en respuesta al rendimiento de los jugadores, manteniendo un equilibrio relativo entre ambos.

> Dependiendo de si el jugador contrario es controlado automáticamente o por un jugador humano, se ajustan diversos parámetros de juego para aumentar o disminuir la dificultad.

## Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún error en nuestro codigo, no dudes en ponerte en contacto y compartirnos tu retroalimentacion.

## Referencias
[1] p5.js. Tomado de: [https://p5js.org/](https://p5js.org/)
