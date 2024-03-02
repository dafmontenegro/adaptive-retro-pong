let ball, player1, player2, info, pause, infoMessage, font;

function preload() {
  font = loadFont("assets/PublicPixel-z84yD.ttf");
}

// Initialize the canvas and set up for the game
function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight); // Set canvas size to match with user's window

  info = true;
  pause = false;
  infoMessage = "i: show info\n1: auto player 1\n2: auto player 2"

  let ballSize = windowHeight * 0.02;
  let ballSpeed = 3; // seconds

  player1 = new Player(ballSize * 1.5, ballSize, true);
  player2 = new Player(windowWidth - ballSize * 2, ballSize, true);
  ball = new Ball(ballSize, ballSpeed);

  strokeWeight(windowHeight * 0.002);
  textAlign(CENTER, CENTER);
  textFont(font);
  stroke(255);
  fill(255);
}

//Now we use the function draw() to animate the game 'cause it will run in an endless loop
function draw() {
  if (windowHeight < windowWidth) {
    setBackground(ball.size);
    player1.show();
    player2.show();
    ball.show();
    if (!pause) {
      player1.update();
      player2.update();
      ball.update();
    } else {
      background(0, 210);
      showMessage("PAUSE", windowWidth / 2, windowHeight / 2, windowHeight * 0.15);
      showMessage("Press ENTER to continue...", windowWidth / 2, windowHeight * 0.75, windowHeight * 0.025);
      showMessage(infoMessage, windowWidth / 2, windowHeight * 0.25, windowHeight * 0.025);
    }
  } else {
    background(0);
    showMessage("Use the game in\na landscape format", windowWidth / 2, windowHeight / 2, windowHeight * 0.025);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    pause = !pause;
  } else if (key === "i") {
    info = !info;
  } else if (key === "1") {
    player1.auto = !player1.auto;
  } else if (key === "2") {
    player2.auto = !player2.auto;
  }
}

// This function set the properties of the background ( The lines of the game field )
function setBackground() {
  background(0);
  for (let i = 0; i < windowHeight; i += ball.size * 2) {
    line(windowWidth / 2, i, windowWidth / 2, i + ball.size);
  }
  showMessage(player1.score, windowWidth * 0.25, windowHeight * 0.1, windowHeight * 0.05);
  showMessage(player2.score, windowWidth * 0.75, windowHeight * 0.1, windowHeight * 0.05);
  if (info) {
    showMessage("Speed: " + ball.getSpeedSecs() + " seconds", windowWidth * 0.25, windowHeight * 0.95, windowHeight * 0.025);
    showMessage("Accuracy: " + player2.accuracy, windowWidth * 0.75, windowHeight * 0.95, windowHeight * 0.025);
  }
}

function showMessage(message, x, y, size) {
  textSize(size);
  text(message, x, y);
}

//Now, this function allows the movement and define the behavior of the ball
class Ball {

  constructor(size, secs) { //Contructs the ball with its properties depending on the size of the window
    this.startPosition();
    this.setSpeed(secs);
    this.size = size;
  }

  startPosition() { //Sets the position of the ball for the beginning of a round (in the middle of the window)
    this.dirX = random([-1, 1]);
    this.dirY = random([-1, 1]);
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }

  setSpeed(secs) {
    this.speed = (windowWidth / getTargetFrameRate()) * (1 / secs);
  }

  getSpeedSecs() {
    return windowWidth / (getTargetFrameRate() * this.speed);
  }

  update() {
    this.x = this.x + (this.speed * this.dirX);
    this.y = this.y + (this.speed * this.dirY);
    if ((this.y <= 0 + this.size / 2) || (this.y >= windowHeight - this.size / 2)) {
      this.dirY *= -1;
    }
    if ((this.x <= ball.size * 2) && (this.x >= ball.size)) { // Collision with player 1
      if ((player1.y - player1.height / 2 < this.y) && (this.y < player1.y + player1.height / 2)) {
        this.dirX = 1;
        this.x = this.x + (this.speed * this.dirX);
      }
    }
    if ((this.x >= windowWidth - ball.size * 2) && (this.x <= windowWidth - ball.size * 1)) { // Collision with player 2
      if ((player2.y - player2.height / 2 < this.y) && (this.y < player2.y + player2.height / 2)) {
        this.dirX = -1;
        this.x = this.x + (this.speed * this.dirX);
      }
    }
    //Check if the player 1 scores
    if (this.x > windowWidth) {
      this.startPosition();
      // ball.setSpeed(max(1, ball.getSpeedSecs()-0.1));
      // player1.height = max(ball.size*4, player1.height-ball.size);
      // player2.height = min(ball.size*10, player1.height+ball.size);
      // player2.accuracy = min(0.5, player2.accuracy - 0.05);
      player1.score++;
    }
    //Check if the player 2 scores
    if (this.x < 0) {
      this.startPosition();
      // ball.setSpeed(min(4, ball.getSpeedSecs()+0.1));
      // player1.height = min(ball.size*10, player1.height+ball.size);
      // player2.height = max(ball.size*4, player1.height-ball.size);
      // player2.accuracy = max(0.1, player2.accuracy + 0.05);
      player2.score++;
    }
  }

  show() {
    square((this.x - this.size / 2), (this.y - this.size / 2), this.size);
  }

}

//This function allows the movement and behavior of the paddles (Also known as the player)
class Player {

  constructor(x, width, auto = false, accuracy = 0.3) {
    this.width = width;
    this.height = this.width * 8;
    this.x = x;
    this.y = windowHeight / 2;
    this.accuracy = accuracy;
    this.auto = auto;
    this.score = 0;
  }

  update() {
    if (this.auto) {
      this.y += (ball.y - this.y) * random(0, this.accuracy);
    } else {
      this.y = mouseY;
    }
    if (this.y < this.height / 2) {
      this.y = this.height / 2;
    }
    if (this.y > windowHeight - this.height / 2) {
      this.y = windowHeight - this.height / 2;
    }
  }

  show() {
    rect(this.x, this.y - this.height / 2, this.width, this.height);
  }

}