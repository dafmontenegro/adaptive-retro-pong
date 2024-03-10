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

¿__? -> Ponle por favor negrilla a todas las demas opciones tal y como esta ENTER

- **Teclas:**
  - **ENTER:** Pausar/Reanudar el juego.
  - i: Activa/Desactiva la informacion del juego (`player1Auto`, `player2Auto`, `Speed`, `barHeight`)
  - 1 (Barra Izquierda): Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - 2 (Barra derecha): Activa/Desactiva el modo automático, cuando no está en automático pasa a manual, lo cual implica moverlo con el mouse
  - a: Activa/Desactiva el audio del juego.

¿__? -> La respuesta que pusiste es incorrecta (pista: solo es una palabra), revisa esto: https://www.fotor.com/blog/portrait-vs-landscape/ y prueba abrir el juego en el celular en formato portrait... ¿Que te parece?
> **Nota:** La aplicacion esta creada para funcionar en formato ¿_? de manera responsiva y requiere de un teclado (o un ingreso de caracteres), para que el juego pueda ser configurado y funcione de manera correcta.

¿__? -> Me parece interesante el nombre de esta seccion, mi sugerencia es dividirlo en dos, la interfaz por defecto y por decirlo asi la extendida (interfaz + informacion) que es la completa... la que aparece con i
## Interfaz

- **player#Auto**: Indica el modo actual de juego para el player#, el cual puede ser automatico o manual y se explican a continuacion:
    - **`0.0# - #.##` (modo automatico):** Define el rango de precision con el que se movera automaticamente el jugador  en cada fotograma para interceptar la pelota con respecto al centro de la barra.<br>**Ejemplo:** Hipoteticamente el jugador tiene que moverse 100 pixeles para alinear el centro de la barra con el centro de la pelota durante un fotograma. Si el rango definido es 0.03 - 0.30, entonces se generara un numero aleatorio entre estos dos valores y lo que sucedera es que para ese fotograma la barra se movera entre 3 y 30 pixeles.
    - **`deactivated` (modo manual):** Implica que el jugador se controla con el mouse.

¿__? -> "Números debajo del playerAuto" no me parece una referencia precisa, porque cuando la informacion esta desactivada esa referencia es inexistente
- **Marcador**: Números debajo del playerAuto, los cuales indican el puntaje de cada uno de los jugadores. Cada vez que un jugador se le pasa una pelota, se le suma un punto al otro jugador.

- **Speed**: Se refiere a cuanto tarda la pelota en segundos de ir de lado a lado de la pantalla (recorrer el ancho de la pantalla o `windowWidth`).

- **barHeight**: Es el número que determina el tamaño de la barra en relación con la ventana del juego. `(player#.height / windowHeight)` calcula la proporción de la altura de la barra del jugador en relación con la altura de la ventana del juego.<br>**Ejemplo:** La proporcion 0.16 implica que la barra tiene una altura del 16% de la altura de la ventana.

>La altura de las barras, la velocidad de la pelota y los rangos de precision automaticos, pueden variar durante el transcurso de la partida en función de varios factores como lo son, la anotación de puntos, el tipo de jugador (automático o no) y las funciones adaptativas de dificultad implementadas (entre mejor se juegue mas dificil el juego sera y viceversa).


¿__? -> ¿Que es lo de abajo? ¿Usaste chatgpt y lo copiaste sin darte cuenta? Ten cuidado con estos pequeños detallitos, llevas un muy buen trabajo.<br>
Aquí está el texto organizado de manera clara y ordenada para incluir en un README de GitHub:

## Detalles de la implementación

### Nuestro TargetFrameRate
¿__? -> ¡PERFECTO!<br>
Se ha establecido explícitamente el objetivo de FPS en 60 cuadros por segundo usando la función `frameRate(60)` en la función `setup()`. Esto significa que la animación debería apuntar a ejecutarse a una velocidad de 60 FPS.

### ¿Cómo se logra que la aplicación sea responsiva?

1. **Tamaño del lienzo dinámico:** Al crear el lienzo con `createCanvas(windowWidth, windowHeight)`, el lienzo se ajusta automáticamente al tamaño de la ventana del navegador. Esto garantiza que el juego se adapte a diferentes tamaños de pantalla.

2. **Dimensiones y posiciones relativas:** Las dimensiones y posiciones de los elementos del juego se definen en función del tamaño de la ventana, utilizando valores como `windowWidth`, `windowHeight` y proporciones de estos valores. Por ejemplo, el tamaño de la pelota (`ballSize`) se define como un porcentaje (`windowHeight * 0.02`) del alto de la ventana, y las posiciones de los jugadores (`player1` y `player2`) también se definen en función del tamaño de la ventana.

3. **Manejo de orientación de pantalla:** El código verifica la orientación de la pantalla con la condición `if (windowHeight < windowWidth)`. Si la altura de la ventana es menor que su anchura, se asume que la pantalla está en modo horizontal (landscape) y se ejecuta el juego. Si la altura es mayor que la anchura, se muestra un mensaje indicando al usuario que use el juego en modo horizontal.

¿__? -> Esto parece puro comentario de chatgpt :v ... mejor quitarlo c: Posdata: No se uso windowResized() porque al recargar la pagina se reconfigura al nuevo tamaño. <br>
4. **Actualización de la interfaz de usuario:** La función `windowResized()` no está explícitamente definida en este código, pero sería útil para manejar eventos de redimensionamiento de la ventana del navegador. Dentro de esta función, podrías ajustar el tamaño y la posición de los elementos del juego según sea necesario para mantener una apariencia adecuada cuando cambia el tamaño de la ventana.

### ¿Qué clases se usaron y se crearon en el juego?

1. **Ball (`class Ball`):** Esta clase define el comportamiento y las propiedades de la pelota en el juego. Contiene métodos para inicializar la posición y la velocidad de la pelota, así como para actualizar su posición en cada fotograma (`update`). También incluye un método para mostrar la pelota en el lienzo del juego (`show`). Además, tiene un método `applyScore` para manejar el puntaje y ajustar la velocidad y otras propiedades del juego cuando se marca un punto.

2. **Player (`class Player`):** Esta clase define el comportamiento y las propiedades de los jugadores en el juego, es decir, las barras que los usuarios pueden controlar o que pueden ser controladas automáticamente (`auto = true`). Contiene métodos para inicializar la posición, la altura y la precisión del jugador, así como para actualizar su posición en cada fotograma (`update`). También incluye un método `show` para mostrar al jugador en el lienzo del juego. La precisión (`accuracy`) y la altura (`height`) del jugador pueden ajustarse dinámicamente durante el juego.

¿__? -> showMessage no es una clase. ¿Que hace que este aqui? <br>
3. **showMessage (`function showMessage`):** Esta función se utiliza para mostrar mensajes en la interfaz de usuario del juego. Recibe como parámetros el mensaje a mostrar, así como la posición y el tamaño del texto.

### ¿Cómo se logra que el modo automático capture la pelota?

```javascript
this.y += (ball.y - this.y) * random(this.accuracy/10, this.accuracy);
```
¿__? -> Este texto de mas abajo podria ser mas claro, te recomiendo tomar como referencia lo que esta arriba escrito en player#Auto donde se explica el modo automatico y complementarlo para explicarlo con profundidad. <br>
En esta línea, se calcula la distancia vertical entre la posición actual de la paleta y la posición vertical de la pelota (`ball.y - this.y`), luego se multiplica esta distancia por un valor aleatorio dentro del rango de precisión del jugador (`random(this.accuracy/10, this.accuracy)`). Este valor aleatorio determina qué tan rápido la paleta se moverá hacia la posición vertical de la pelota. Cuanto mayor sea la precisión (`this.accuracy`), más cerca estará la paleta de la posición vertical de la pelota, lo que hace que sea más probable que capture la pelota.

¿__? -> #TODO: Falta explicar los valores minimos y maximos que puede tener height, accuracy y speed como se relacion entre ellos. Pista: Una parte esta en applyScore() y otra en setup()

### ¿En qué momento se hace el ajuste de la dificultad?

El ajuste de la dificultad se realiza en el método `applyScore()` de la clase Ball. Este método se llama cuando un jugador anota un punto. Dependiendo de si el jugador contrario es controlado automáticamente o por un jugador humano, se ajustan diversos parámetros de juego para aumentar o disminuir la dificultad.

¿__? -> Esto de abajo no es claro y tampoco del todo cierto, considero que se relaciona con el #TODO de arriba y tiene que ser modificado para explicar esa relacion que existe entre los ajustes que hace el juego en la dificultad.
Este método ajusta la velocidad de la pelota (`ball.setSpeed`), la precisión del jugador automático (`playerA.accuracy`), y la altura de las paletas de los jugadores (`playerA.height` y `playerB.height`). Dependiendo de si el jugador contrario es controlado automáticamente o por un jugador humano, los parámetros se ajustan para aumentar o disminuir la dificultad del juego.

¿__? -> En general un excelente trabajo, gracias por tus contribuciones y por tu tiempo, ya casi lo terminamos y si estas usando herramientas externas se cuidadoso en lo que copias y en lo que pegas c: 

## Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún error en nuestro codigo, no dudes en ponerte en contacto y compartirnos tu retroalimentacion.

## Referencias
[1] p5.js. Tomado de: [https://p5js.org/](https://p5js.org/)
