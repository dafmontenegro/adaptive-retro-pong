# adaptive-retro-pong

El proyecto consiste en una nueva versión del clásico juego PONG lanzado por Atari en 1972. Esta reinterpretación del juego hace uso de p5.js (una biblioteca de JavaScript para la programación creativa [1]), y tiene como propuesta la implementación de una dificultad adaptativa que busca desafiar al jugador, ajustando la velocidad y precisión del juego de acuerdo a sus habilidades durante la partida.

**DEMO P5.js:** [https://editor.p5js.org/dafmontenegro/full/Cnx7DpEdd](https://editor.p5js.org/dafmontenegro/full/Cnx7DpEdd)

**DEMO:** [https://dafmontenegro.com/adaptive-retro-pong/](https://dafmontenegro.com/adaptive-retro-pong/)

## Proyecto Juego Retro - Computación Visual UN 2024-1
- Daniel Felipe Montenegro
- Camilo Andres Fierro
- Anderson Barrera

## Referencias
[1] p5.js. Tomado de: [https://p5js.org/](https://p5js.org/)

---

## Dificultad Adaptativa

El juego adapta dinámicamente su dificultad para proporcionar una experiencia desafiante pero accesible. Esto se logra ajustando la velocidad y precisión de la pelota y las barras de los jugadores de acuerdo al rendimiento del jugador durante la partida.

## ¿Cómo Jugar?

El juego se controla de las siguientes maneras:

- **Para Jugar:**
  - Tecla 1: Juega con el jugador 1 (izquierda).
  - Tecla 2: Juega con el jugador 2 (derecha).
  - Movimiento del Mouse: Controla la barra de forma vertical.

- **Otros Controles:**
  - Tecla Enter: Pausa el juego.
  - Tecla I: Activa/Desactiva la visualización de la velocidad (Speed) y precisión (Accuracy).
  - Tecla A: Activa/Desactiva el audio del juego.

El objetivo del juego es golpear la pelota con las barras y evitar que la pelota pase al lado opuesto de la pantalla.

## ¿Cómo lo Logramos?

El juego se implementó utilizando el framework p5.js, aprovechando sus capacidades para la creación de gráficos y animaciones interactivas en el navegador web. Para lograr la adaptabilidad del juego, se desarrolló un algoritmo que ajusta dinámicamente la velocidad y precisión de la pelota y las barras de los jugadores en función del rendimiento del jugador durante la partida.

## Funcionamiento

El juego detecta las colisiones entre la pelota y las barras de los jugadores. Cuando la pelota colisiona con una barra, cambia de dirección y puede ajustar su velocidad y precisión según el algoritmo de adaptabilidad. La puntuación se incrementa cada vez que la pelota pasa al lado opuesto de la pantalla sin ser golpeada por una barra.

## Mejoras Futuras

Para futuras iteraciones del juego, se pueden considerar las siguientes mejoras:

- Implementación de efectos visuales y sonoros para una experiencia de juego más inmersiva.
- Integración de funciones de juego en red para permitir partidas multijugador en línea.
- Optimización del código para mejorar el rendimiento en dispositivos móviles y de baja potencia.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego o encuentras algún error, no dudes en abrir un problema o enviar una solicitud de extracción en nuestro repositorio de GitHub.

---

¡Esperamos que disfrutes jugando al Pong Adaptativo! [¡Juega ahora en línea!](https://dafmontenegro.com/adaptive-retro-pong/)
