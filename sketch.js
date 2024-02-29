
let minAccuracy, maxAccuracy, minHeight, maxHeight, ball, player1, player2, scoreP1, scoreP2;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  scoreP1 = 0;
  scoreP2 = 0;
  minAccuracy = 0.05;
  maxAccuracy = minAccuracy * 10;
  minHeight = windowWidth * 0.02;
  maxHeight = minHeight * 10;
  
  player1 = new Player();
  player2 = new Player(true);
  ball = new Ball();
  
  strokeWeight(windowHeight * 0.002);
  stroke(255);
  fill(255);
}

function draw() {
  setBackground();
  player1.show();
  player2.show(ball);
  ball.move(player1, player2);
  showScore();
}

function setBackground() {
  background(0);
  line(minHeight, 0, minHeight, windowHeight);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  line(windowWidth - minHeight, 0, windowWidth - minHeight, windowHeight);
}

function showScore() {
  textAlign(CENTER, CENTER);
  textSize(windowHeight * 0.05);
  text(scoreP1, windowWidth * 0.25, windowHeight * 0.075);
  text(scoreP2, windowWidth * 0.75, windowHeight * 0.075);
  textAlign(RIGHT, BASELINE);
  textSize(windowHeight * 0.025);
  sText = "Speed: " + Math.trunc(ball.speed%10 + 1);
  lText = "  Level: " + Math.trunc(player2.maxAccuracy/minAccuracy);
  p1Text = "  Player1: " + Math.round(player1.height/minHeight*10) + "%";
  p2Text = "  Player2: " + Math.round(player2.height/minHeight*10) + "%";
  text(sText + lText + p1Text + p2Text, windowWidth - minHeight * 2, windowHeight * 0.98);
}

class Ball {
  
  constructor() {
    this.size = minHeight/2;
    this.startPosition();
    this.speed = 10;
  }
  
  startPosition() {
    this.dirX = random([-1, 1]);
    this.dirY = random([-1, 1]);
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }
  
  move(player1, player2) {
    square((this.x - this.size/2), (this.y - this.size/2), this.size);
    if ((this.y < 0 + this.size/2) || (this.y > windowHeight - this.size/2)){
      this.dirY *= -1;
    }
    if (this.x < windowWidth*0.02) {
        if ((player1.y - player1.height/2 < this.y) && (this.y < player1.y + player1.height/2)){ 
            this.dirX = 1;
        }
    }
    if (this.x > windowWidth*0.98) {
        if ((player2.y - player2.height/2 < this.y) && (this.y < player2.y + player2.height/2)){ 
            this.dirX = -1;
        }
    }
    if (this.x < 0) {
      this.startPosition();
      this.speed = max(10, this.speed-1);
      player1.height = min(maxHeight, player1.height + minHeight);
      player2.height = max(minHeight, player2.height - minHeight);
      player2.maxAccuracy = max(minAccuracy, player2.maxAccuracy - 0.05);
      scoreP2 ++;
    }
    if (this.x > windowWidth) {
      this.startPosition();
      this.speed = min(20, this.speed+1);
      player1.height = max(minHeight, player1.height - minHeight);
      player2.height = min(maxHeight, player2.height + minHeight);
      player2.maxAccuracy = min(maxAccuracy, player2.maxAccuracy + 0.05);
      scoreP1 ++;
    }
    this.x = this.x + (this.speed * this.dirX);
    this.y = this.y + (this.speed * this.dirY);
  }
  
}


class Player {
  constructor(auto=false) {
    this.width = minHeight/2;
    this.height = maxHeight;
    this.y = windowHeight / 2;
    this.maxAccuracy = 0.10;
    this.auto = auto;
    if (this.auto) {
      this.x = windowWidth * 0.98;
    } else {
      this.x = minHeight/2;
    }
  }
  
  show(ball) {
    if (this.auto) {
      this.y += (ball.y - this.y) * random(0, this.maxAccuracy);
    } else {
      this.y = mouseY;
    }
    if (this.y < this.height/2) {
      this.y = this.height/2;
    }
    if (this.y > windowHeight - this.height/2) {
      this.y = windowHeight - this.height/2;
    }
    rect(this.x, this.y - this.height/2, this.width, this.height);
  }
}