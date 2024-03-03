# adaptive-retro-pong

El proyecto consiste en una nueva versión del clásico juego PONG lanzado por Atari en 1972. Esta reinterpretación del juego hace uso de p5.js (una biblioteca de JavaScript para la programación creativa [1]), y tiene como propuesta la implementación de una dificultad adaptativa que busca suponer siempre un desafio para el jugador, esto se logra ajustando la velocidad del juego, ancho de las barras y precision del modo automatico, todo de acuerdo al rendimiento del jugador durante la partida.

## Proyecto Juego Retro - Computación Visual UN 2024-1
- Daniel Felipe Montenegro
- Camilo Andres Fierro
- Anderson Barrera

## ¿Cómo Jugar?

 [**Demo p5.js:**](https://editor.p5js.org/dafmontenegro/full/Cnx7DpEdd) Juega y edita el codigo en tiempo real desde un proyecto en p5.js

 [**Demo:**](https://dafmontenegro.com/adaptive-retro-pong/) Juega pantalla completa sin interrupciones

## Controles
Al iniciar el juego apareceras en el menu de pausa y tendras las siguientes opciones para configurar tu partida:

- **Mouse:**
  - Movimiento del cursor: Controla la o las barras que esten en modo manual de forma vertical

- **Teclas:**
  - ENTER: Pausar/¿_? el juego.
  - - i: Activa/Desactiva la informacion del juego(¿_?, ¿_?, ¿_?, ¿_?)
  - 1: Activa/Desactiva el modo automatico, cuando no esta en automatico pasa a manual
  - 2: ¿_?
  - a: Activa/Desactiva el audio del juego.

**Nota:** La aplicacion esta creada para funcionar en formato ¿_? de manera responsiva y requiere de un teclado (o un ingreso de caracteres), para que el juego pueda ser configurado y funcione de manera correcta.

## ¿Que informacion que se muestra en pantalla?
El nombre de esta seccion es una simple sugerencia...
- ¿_? -> CLAVE: Explicar los cuatro texto en pantalla y su significado... Por ejemplo la velocidad se refiere a cuanto tarda la pelota en segundos de ir de lado a lado de la pantalla.

## ¿Cómo se logro la implementacion?
El nombre "¿Cómo se logro la implementacion?" es una simple sugerencia, pero parece que se pueden o se deben crear mas de una seccion para responder estas preguntas. Sigue tu criterio y lo que consideres mas conveniente.
- ¿_? -> ¿Cual es el TargetFrameRate?
- ¿_? -> ¿Como se logra que la aplicacion sea responsiva? y tal vez responder porque no funciona en formato portrait
- ¿_? -> ¿Que clases se usaron y se crearon en el juego?
- ¿_? -> ¿En que momento se hace el ajuste de la dificultad? Pista: Ball.applyScore()
- ¿_? -> CLAVE: ¿Como se logra que el modo automatico capture la pelota? Pista: Bar.update() -> this.y += (ball.y - this.y) * random(this.accuracy/10, this.accuracy);

## Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún error en nuestro codigo, no dudes en ponerte en contacto y compartirnos tu retroalimentacion.

## Referencias
[1] p5.js. Tomado de: [https://p5js.org/](https://p5js.org/)
