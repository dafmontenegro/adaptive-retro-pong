//Just Initialize some var that we are gonna use later in the code
let minAccuracy, maxAccuracy, minHeight, maxHeight, ball, player1, player2, scoreP1, scoreP2;

// Initialize the canvas and set up for the game
function setup() {
  
  createCanvas(windowWidth, windowHeight);//Set canvas size to match with user's window
  
  //Initialize vars for player's score, the accuracy of the paddles and also the range of height of the paddles
  scoreP1 = 0;
  scoreP2 = 0;
  minAccuracy = 0.05;
  maxAccuracy = minAccuracy * 10;
  minHeight = windowWidth * 0.02;
  maxHeight = minHeight * 10;
  
  //Here, we initialize the players and the ball when the game runs for the first time

  player1 = new Player();
  player2 = new Player(true);
  ball = new Ball();
  
  //Set the properties of the paddles and the ball

  strokeWeight(windowHeight * 0.002);
  stroke(255);
  fill(255);
}

//Now we use the function draw() to animate the game 'cause it will run in an endless loop
function draw() {
  setBackground(); //Draw the background with a function that we wrote
  player1.show(); //Draw the paddles and the ball (The Second Player is the computer)
  player2.show(ball);
  ball.move(player1, player2); // Move the ball and update positions of the paddles
  showScore(); //Display the newest scores on screen
}

// This function set the properties of the background ( The lines of the game field )
function setBackground() {
  background(0);
  line(minHeight, 0, minHeight, windowHeight);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  line(windowWidth - minHeight, 0, windowWidth - minHeight, windowHeight);
}

// This function displays the score and information about the players on the screen
function showScore() {
  //This sets the text of the score
  textAlign(CENTER, CENTER);
  textSize(windowHeight * 0.05);
  text(scoreP1, windowWidth * 0.25, windowHeight * 0.075);
  text(scoreP2, windowWidth * 0.75, windowHeight * 0.075);
  textAlign(RIGHT, BASELINE);
  textSize(windowHeight * 0.025);
  //Initialize and display the information about the players and the speed of the ball
  sText = "Speed: " + Math.trunc(ball.speed%10 + 1);
  lText = "  Level: " + Math.trunc(player2.maxAccuracy/minAccuracy);
  p1Text = "  Player1: " + Math.round(player1.height/minHeight*10) + "%";
  p2Text = "  Player2: " + Math.round(player2.height/minHeight*10) + "%";
  text(sText + lText + p1Text + p2Text, windowWidth - minHeight * 2, windowHeight * 0.98);
}

//Now, this function allows the movement and define the behavior of the ball
class Ball {
  
  constructor() { //Contructs the ball with its properties depending on the size of the window
    this.size = minHeight/2;
    this.startPosition();
    this.speed = 10;
  }
  
  startPosition() { //Sets the position of the ball for the beginning of a round (in the middle of the window)
    this.dirX = random([-1, 1]);
    this.dirY = random([-1, 1]);
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }
  
  //Controls the movement of the ball and the collision with the paddles and the walls
  move(player1, player2) {
    square((this.x - this.size/2), (this.y - this.size/2), this.size);
    if ((this.y < 0 + this.size/2) || (this.y > windowHeight - this.size/2)){
      this.dirY *= -1;
    }
    if (this.x < windowWidth*0.02) { //Collision with player 1
        if ((player1.y - player1.height/2 < this.y) && (this.y < player1.y + player1.height/2)){ 
            this.dirX = 1;
        }
    }
    if (this.x > windowWidth*0.98) { //Collision with player 2
        if ((player2.y - player2.height/2 < this.y) && (this.y < player2.y + player2.height/2)){ 
            this.dirX = -1;
        }
    }
    //Check if the player 2 scores
    if (this.x < 0) {
      this.startPosition();
      this.speed = max(10, this.speed-1);
      player1.height = min(maxHeight, player1.height + minHeight);
      player2.height = max(minHeight, player2.height - minHeight);
      player2.maxAccuracy = max(minAccuracy, player2.maxAccuracy - 0.05);
      scoreP2 ++;
    }
    //Check if the player 1 scores
    if (this.x > windowWidth) {
      this.startPosition();
      this.speed = min(20, this.speed+1);
      player1.height = max(minHeight, player1.height - minHeight);
      player2.height = min(maxHeight, player2.height + minHeight);
      player2.maxAccuracy = min(maxAccuracy, player2.maxAccuracy + 0.05);
      scoreP1 ++;
    }
    //Move the ball to its new position based on the speed and the direction
    this.x = this.x + (this.speed * this.dirX);
    this.y = this.y + (this.speed * this.dirY);
  }
  
}

//This function allows the movement and behavior of the paddles (Also known as the player)
class Player {
  constructor(auto=false) { //Contructs the paddle with its properties depending on the size of the window
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
  
  //This allows the movement of the paddles and control the behavior of the Player 2 (bot) who tries to follow the ball
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