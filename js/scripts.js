var gameStarted = false;

//Setting the variables to become images
var jouster1Left = new Image();
var jouster1LeftFlap = new Image();
var jouster1Right = new Image();
var jouster1RightFlap = new Image();

var jouster2Left = new Image();
var jouster2LeftFlap = new Image();
var jouster2Right = new Image();
var jouster2RightFlap = new Image();

var badGuyLeft = new Image();
var badGuyLeftFlap = new Image();
var badGuyRight = new Image();
var badGuyRightFlap = new Image();
var badGuy = badGuyLeft;

var cloud = new Image();
var cloudPos = 45;
var logo1 = new Image();
var logo2 = new Image();
var logo3 = new Image();
var logo4 = new Image();
var platformsImg = new Image();
var background = new Image();

var energy1 = new Image();
var energy2 = new Image();
var energy3 = new Image();
var energy4 = new Image();

var speed1 = new Image();
var speed2 = new Image();
var speed3 = new Image();
var speed4 = new Image();

var soundtrack = new Audio();
var enemyDeathSFX = new Audio();
var playerDeathSFX = new Audio();
var pointSoundSFX = new Audio();
var speedBoostSFX = new Audio();

//Grabbing the source for the images.
jouster1Left.src = "img/sprite1_left.png";
jouster1LeftFlap.src = "img/sprite1_leftflap.png";
jouster1Right.src = "img/sprite1_right.png";
jouster1RightFlap.src = "img/sprite1_rightflap.png";
jouster2Left.src = "img/sprite2_left.png";
jouster2LeftFlap.src = "img/sprite2_leftflap.png";
jouster2Right.src = "img/sprite2_right.png";
jouster2RightFlap.src = "img/sprite2_rightflap.png";

badGuyLeft.src = "img/BadGuy_Left.png";
badGuyLeftFlap.src = "img/BadGuy_LeftFlap.png";
badGuyRight.src = "img/BadGuy_Right.png";
badGuyRightFlap.src = "img/BadGuy_RightFlap.png";

cloud.src = "img/cloud0.png";
logo1.src = "img/JoustLogo0.png";
logo2.src = "img/JoustLogo1.png";
logo3.src = "img/JoustLogo2.png";
logo4.src = "img/JoustLogo3.png";
platformsImg.src = "img/platformsImg.png";
background.src = "img/newBack.png";

energy1.src = "img/Orbs/Energy1.png";
energy2.src = "img/Orbs/Energy2.png";
energy3.src = "img/Orbs/Energy3.png";
energy4.src = "img/Orbs/Energy4.png";
speed1.src = "img/Orbs/Speed0.png";
speed2.src = "img/Orbs/Speed1.png";
speed3.src = "img/Orbs/Speed2.png";
speed4.src = "img/Orbs/Speed3.png";

soundtrack.src = "GameMusic.wav";
enemyDeathSFX.src = "EnemyDeath.wav";
playerDeathSFX.src = "PlayerDeath.wav";
pointSoundSFX.src = "Point.wav";
speedBoostSFX.src = "Speed.wav";

// This is where we are setting some initial variables
const friction = 0.98;
const gravity = 0.098;
const moveSpeed = 1.5;
const jumpSpeed = 1.5;
const jumpForce = 2;
const winScore = 10;

//press enter blink text and logo array
var blink = true;
var logos = [logo1, logo2, logo3, logo4, logo3, logo2];

//frame arrays for energy Orbs
var pointsOrb = [energy1, energy1, energy1, energy1, energy2, energy2, energy2, energy2, energy3, energy3, energy3, energy3, energy4, energy4, energy4, energy4];
var speedOrb = [speed1, speed1, speed1, speed1, speed2, speed2, speed2, speed2, speed3, speed3, speed3, speed3, speed4, speed4, speed4, speed4];

//The usage of => refers to the object. these prototypes control the speed powerup
Object.prototype.speedReset = function() {
    this.moveSpeed = moveSpeed;
    this.jumpSpeed = jumpSpeed;
    this.jumpForce = jumpForce;
}

Object.prototype.speedBoost = function(){
  this.moveSpeed = 4.5;
  this.jumpSpeed = 4.5;
  this.jumpForce = 3;
  setTimeout(() => {
    this.speedReset();
  }, 10000);
}

//constructor for orb objects
function Energy(x, y, boolean) {
  this.x = x + 10;
  this.y = y + 10;
  this.vel = 3;
  this.width = 20;
  this.height = 20;
  this.isPoint = boolean;
  if(boolean) {
    this.frames = pointsOrb;
  } else {
    this.frames = speedOrb;
    setTimeout(() => {
      deleteOrb(this);
    }, 3000);}
  this.frameCounter = 0;
}

//this array contains all of the powerups on screen
var energy = [];

//Set the jouster images as a variable
var jouster = jouster1Left;
var jouster2 = jouster2Right;

//clouds
var clouds = [
  {x: 0, y: 30, height: 100, width: 150, vel: 0.2},
  {x: 50, y: 100, height: 150, width: 200, vel: 0.3},
  {x: 900, y: 75, height: 80, width: 120, vel: -0.2},
  {x: 700, y: 30, height: 200, width: 260, vel: 0.25},
  {x: 453, y: 30, height: 160, width: 210, vel: -0.2}
]

var players = [
  //player 1
  {x: 850, y: 450, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: true, spawnX: 850, spawnY: 450, score: 0, moveSpeed: moveSpeed, jumpSpeed: jumpSpeed, jumpForce: jumpForce},
  //player 2
  {x: 0, y: 450, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: false, spawnX: 0, spawnY: 450, score: 0, moveSpeed: moveSpeed, jumpSpeed: jumpSpeed, jumpForce: jumpForce}
]

var enemies = [
{x: 30, y: 155, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: false, spawnX: 60, spawnY: 155, targetX: 30, targetY: 155, image: badGuyRight, flapCounter: 0},
{x: 432, y: 95, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: false, spawnX: 450, spawnY: 95, targetX: 432, targetY: 95, image: badGuyRight, flapCounter: 0},
{x: 835, y: 155, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: true, spawnX: 835, spawnY: 155, targetX: 835, targetY: 155, image: badGuyLeft, flapCounter: 0},
{x: 5, y: 321, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: false, spawnX: 5, spawnY: 321, targetX: 5, targetY: 321, image: badGuyRight, flapCounter: 0},
{x: 860, y: 321, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: true, spawnX: 960, spawnY: 321, targetX: 860, targetY: 321, image: badGuyLeft, flapCounter: 0}

]

//Platforms
var platforms = [
  {x: -100, y: -105, width: 1100, height: 105},
  {x: 0, y: 188, width: 125, height: 25},
  {x: 388, y: 130, width: 125, height: 25},
  {x: 775, y: 188, width: 125, height: 25},
  {x: 0, y: 356, width: 62, height: 25},
  {x: 290, y: 332, width: 315, height: 25},
  {x: 838, y: 356, width: 62, height: 25},
  {x: -100, y: 475, width: 1100, height: 25}
]

//Empty array for key functionality
keys=[];

// Document ready point
$().ready(function() {

  //Getting the canvas to work on and allow us to write
  canvas = $("#canvas").get(0);
  context = canvas.getContext("2d");
  //update();
  drawMain();
});

// This functions allows for the update function to run on repeat
function update(){


  soundtrack.play();
  gameLoop = requestAnimationFrame(update);
  getInput();
  enemyMovement();
  physics();
  drawGame();
}

// These are the event listeners that allow for the user to experience no lag time on movement
document.addEventListener('keydown', function(e){
  keys[e.keyCode] = true;
  if(e.keyCode == 40){
    e.preventDefault();
  }
  //Enter Key to kick off update loop
  if(e.keyCode == 13 && !gameStarted){
    keys[13] = false;
    update();
    clearInterval(blinkInterval);
    clearInterval(logoLoop);
    gameStarted=true;
  }
});
document.addEventListener('keyup', function(e){
  keys[e.keyCode] = false;
});


// This is the function to draw the game
function drawMain() {
  context.fillStyle = "black";
  context.fillRect(0,0, canvas.width, canvas.height);
  // context.drawImage(joustLogo, canvas.width/2-joustLogo.width/2, canvas.height/2-joustLogo.height);
  blinkInterval = setInterval(blinkText, 500);
  logoInterval = setInterval(logoLoop, 250);
}

var theWinner;
function drawCredits() {

  requestAnimationFrame(drawCredits);
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width, canvas.height);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  if(theWinner == players[0]){
    context.drawImage(jouster, canvas.width/2, canvas.height/2, 50, 50);
  }
  else if(theWinner == players[1]){
    context.drawImage(jouster2, canvas.width/2, canvas.height/2, 50, 50);
  }
}

//logo 'gif'
loopCount = 0;
function logoLoop(){
  if(loopCount > logos.length-1) {
    loopCount = 0;
  }
  context.clearRect(canvas.width/2-144, canvas.height/2-110, 288, 110)
  context.fillStyle = "black"
  context.fillRect(canvas.width/2-144, canvas.height/2-110, 288, 110)
  context.drawImage(logos[loopCount], canvas.width/2-144, canvas.height/2-110, 288, 110);
  loopCount++;
}

// The blink Enter word on the start screen
function blinkText(){
  if(!blink){
    context.font ="30px menuFont";
    context.fillStyle = "white";
    context.fillText("Press Enter", canvas.width/2-80, canvas.height/2+60);
    blink = true;
  }
  else if(blink){
    context.fillStyle = "black";
    context.fillRect(canvas.width/2-100, canvas.height/2+33, 200, 35);
    blink = false;
  }
}

// This will draw the game after the start screen is passed
function drawGame(){
  //wrap
  if(players[0].x > canvas.width){
    players[0].x = -40;
  }
  if(players[1].x > canvas.width){
    players[1].x = -40;
  }

  // players[1].x

  if(players[0].x< -40) {
    players[0].x = canvas.width;
  }
  if(players[1].x< -40) {
    players[1].x = canvas.width;
  }

  //clear last frame
  context.clearRect(0,0, canvas.width, canvas.height);

  //fill canvas black
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width, canvas.height);

  context.drawImage(background,0,0, canvas.width, canvas.height);

  //draw cloud
  for (var i = 0; i < clouds.length; i++) {
    context.drawImage(cloud, clouds[i].x+=clouds[i].vel, clouds[i].y, clouds[i].height, clouds[i].width);
    if (clouds[i].x > canvas.width && clouds[i].vel > 0){
      clouds[i].x = -clouds[i].width;
    }
    if (clouds[i].x < 0 && clouds[i].vel < 0){
      clouds[i].x = canvas.width + clouds[i].width;
    }
  }

  //draw platforms
  context.drawImage(platformsImg,0, 0, canvas.width, canvas.height);

  //draw score
  context.font = "30px menuFont";
  context.fillStyle = "white";
  context.fillText(players[1].score, 388, 30);
  context.fillText(players[0].score, 493, 30);

  //Draw Orbs
  for (var i = 0; i < energy.length; i++){
    context.drawImage(energy[i].frames[energy[i].frameCounter], energy[i].x,energy[i].y+=energy[i].vel, energy[i].height, energy[i].width);
    if(energy[i].frameCounter < energy[i].frames.length - 1) {
      energy[i].frameCounter++;
    } else energy[i].frameCounter = 0;
  }

  //draw baddies
  for(var i = 0; i < enemies.length; i++){
    if(enemies[i].facingLeft) {
      if(enemies[i].flapCounter < 5) {
      enemies[i].image = badGuyLeft;
    } else enemies[i].image = badGuyLeftFlap;
    }
    else {
      if(enemies[i].flapCounter < 5) {
        enemies[i].image = badGuyRight;
      } else enemies[i].image = badGuyRightFlap;
    }
    context.drawImage(enemies[i].image, enemies[i].x+=enemies[i].velX, enemies[i].y+=enemies[i].velY, enemies[i].width, enemies[i].height);
    if(enemies[i].flapCounter > 9) {
      enemies[i].flapCounter = 0;
    }
    else enemies[i].flapCounter++;
  }

  //draw players
  context.drawImage(jouster, players[0].x+=players[0].velX, players[0].y+=players[0].velY, players[0].width, players[0].height);
  context.drawImage(jouster2, players[1].x+=players[1].velX, players[1].y+=players[1].velY, players[1].width, players[1].height);
}

// This is the function to get the user input and assign images
//TODO FIX FLAP WHILE MOVING
function getInput(){
  //Player 1 Controls
  //left
  if(keys[37]){
    if(players[0].velX > -players[0].moveSpeed){
      players[0].velX--;
    }
    if(!players[0].facingLeft){
      jouster = jouster1Left;
      players[0].facingLeft = true;
    }
  //right
  }
  if (keys[39]){
    if(players[0].velX < players[0].moveSpeed){
      players[0].velX++;
    }
    if(players[0].facingLeft){
      jouster= jouster1Right;
      players[0].facingLeft = false;
    }
  }

  //up
  if(!keys[191] && players[0].isJumping){
    if(players[0].facingLeft){
      jouster = jouster1Left;
    }
    else if(!players[0].facingLeft){
      jouster = jouster1Right;
    }
    players[0].isJumping = false;

  }
  if (keys[191] && !players[0].isJumping){
    if (players[0].velY > -players[0].jumpSpeed) {
      players[0].velY-=players[0].jumpForce;
    }
    players[0].isJumping = true;
    if(players[0].facingLeft){
        jouster = jouster1LeftFlap;
    }
    else{
      jouster = jouster1RightFlap;
    }
  // Player 2 controls
  }
  if(keys[65]){
    if(players[1].velX > -players[1].moveSpeed){
      players[1].velX--;
    }
    if(!players[1].facingLeft){
      jouster2 = jouster2Left;
      players[1].facingLeft = true;
    }
  //right
  }
  if (keys[68]){
    if(players[1].velX < players[1].moveSpeed){
      players[1].velX++;
    }
    if(players[1].facingLeft){
      jouster2 = jouster2Right;
      players[1].facingLeft = false;
    }
  }
  //up
  if(!keys[32] && players[1].isJumping){
    if(players[1].facingLeft){
      jouster2 = jouster2Left;
    }
    else if(!players[1].facingLeft){
      jouster2 = jouster2Right;
    }
    players[1].isJumping = false;
  }
  if (keys[32] && !players[1].isJumping){
    if (players[1].velY > -players[1].jumpSpeed) {
      players[1].velY-=players[1].jumpForce;
    }
    if(players[1].facingLeft){
        jouster2 = jouster2LeftFlap;
    }
    else{
      jouster2 = jouster2RightFlap;
    }
    players[1].isJumping = true;
  }
}

function enemyMovement() {

  //x vel
  for(var i = 0; i < enemies.length; i++){
    if(enemies[i].targetX > enemies[i].x)
    {
      enemies[i].velX = 1;
      enemies[i].facingLeft = false;
      // enemies[i].image = badGuyRight;
    }
    else if (enemies[i].targetX < enemies[i].x){
      enemies[i].velX = -1;
      enemies[i].facingLeft = true;
      // enemies[i].image = badGuyLeft;
    }
    else {
      enemies[i].targetX = Math.floor(Math.random() * canvas.width);
    }
  }

  //y velX

  for(var i = 0; i < enemies.length; i++) {
    if(enemies[i].targetY < enemies[i].y)
    {
      // setTimeout(function(i) {
        enemies[i].velY = -jumpForce;

      // }, 200);

    }
    else if (enemies[i].targetY > enemies[i].y) {
      enemies[i].velY = 0;
    }
    if (enemies[i].y > enemies[i].targetY - 10 && enemies[i].y < enemies[i].targetY + 10) {
      enemies[i].targetY = Math.floor(Math.random() * 440);
    }
  }
}
function physics(){

  //gravity and friction
  for(var i = 0; i < players.length; i++){
    players[i].velX*=friction;
    players[i].velY+=gravity;
  }

  for(var i = 0; i < enemies.length; i++){
    enemies[i].velY+=gravity * 10;
  }

  //player-player collision
  if(players[0].x + players[0].width > players[1].x &&
     players[0].x < players[1].x + players[1].width &&
     players[0].y + players[0].height > players[1].y &&
     players[0].y < players[1].y + players[1].height){

     players[0].velX *= -1;
     players[1].velX *= -1;

     //determine winner  TODO: REFACTOR DETERMINE WINNER
     if ( players[0].facingLeft != players[1].facingLeft){
       if(players[0].y < players[1].y){
         killPlayer(players[1]);
       }
       else if (players[0].y > players[1].y){
         killPlayer(players[0]);
       }
     }
     else if(players[0].facingLeft && players[1].facingLeft){
       if(players[0].x > players[1].x){
         killPlayer(players[1]);
       }
       else if(players[0].x < players[1].x){
         killPlayer(players[0]);
       }
     }
     else if(!players[0].facingLeft && !players[1].facingLeft){
       if(players[0].x < players[1].x){
         killPlayer(players[1]);
       }
       else if(players[0].x > players[1].x){
         killPlayer(players[0]);
       }
     }
  }


  //player-environment collision
  for(var j = 0; j < players.length; j++) {
    for(var i = 0; i < platforms.length; i++){
      if(players[j].x + players[j].width > platforms[i].x &&
        players[j].x < platforms[i].x + platforms[i].width &&
        players[j].y + players[j].height > platforms[i].y &&
        players[j].y < platforms[i].y + platforms[i].height) {
          //above
          if(players[j].y < platforms[i].y) {
            players[j].y = platforms[i].y - players[j].height;
            players[j].velY = 0;
          }
          //below
          if(players[j].y > platforms[i].y){
            players[j].velY = 0;
            players[j].y += 0.3;
          }
          //left


          //right

      }
    }
  }

  //enemy-player collision
  for(var i = 0; i < enemies.length; i++){
    for(var j = 0; j < players.length; j++){

      if(players[j].x + players[j].width > enemies[i].x &&
         players[j].x < enemies[i].x + enemies[i].width &&
         players[j].y + players[j].height > enemies[i].y &&
         players[j].y < enemies[i].y + enemies[i].height) {

       players[j].velX *= -1;
       enemies[i].velX *= -1;

       if ( players[j].facingLeft != enemies[i].facingLeft){
         if(players[j].y < enemies[i].y){
           killEnemy(enemies[i]);
         }
         else if (players[j].y > enemies[i].y){
           killPlayer(players[j]);
         }
       }
       else if(players[j].facingLeft && enemies[i].facingLeft){
         if(players[j].x > enemies[i].x){
           killEnemy(enemies[i]);
         }
         else if(players[j].x < enemies[i].x){
           killPlayer(players[j]);
         }
       }
       else if(!players[j].facingLeft && !enemies[i].facingLeft){
         if(players[j].x < enemies[i].x){
           killEnemy(enemies[i]);
         }
         else if(players[j].x > enemies[i].x){
           killPlayer(players[j]);
         }
       }
     }
    }
  }


  //enemy-environment collision
  for(var i = 0; i < enemies.length; i++) {
    for(var j = 0; j < platforms.length; j++){
      if(enemies[i].x + enemies[i].width > platforms[j].x &&
         enemies[i].x < platforms[j].x + platforms[j].width &&
         enemies[i].y + platforms[j].height > platforms[j].y &&
         enemies[i].y < platforms[j].y + platforms[j].height) {

           if(enemies[i].y < platforms[j].y) {
             enemies[i].y = platforms[j].y - enemies[i].height;
             enemies[i].velY = 0;
           }
           if(enemies[i].y > platforms[j].y){
             enemies[i].velY = 0;
             enemies[i].y += 0.3;
           }
         }
    }
  }
  // Energy orb platform collision
  for(var j = 0; j < energy.length; j++) {
    for(var i = 0; i < platforms.length; i++){
      if(energy[j].x + energy[j].width > platforms[i].x &&
        energy[j].x < platforms[i].x + platforms[i].width &&
        energy[j].y + energy[j].height > platforms[i].y - 3 &&
        energy[j].y < platforms[i].y + platforms[i].height) {
          //above
          if(energy[j].y < platforms[i].y) {
            energy[j].y = platforms[i].y - energy[j].height - 3;
            energy[j].velY = 0;
          }
      }
    }
  }
  // Player energy orb collisons
  for(var i = 0; i < players.length; i++){
    for(var j = 0; j < energy.length; j++) {
      if(energy[j].x + energy[j].width > players[i].x &&
        energy[j].x < players[i].x + players[i].width &&
        energy[j].y + energy[j].height > players[i].y &&
        energy[j].y < players[i].y + players[i].height) {
          //For point
          if(energy[j].isPoint) {
            pointSoundSFX.play();
            players[i].score++
            if(players[i].score >= winScore){
              winner(players[i]);
            }
          } else {
            speedBoostSFX.play();
            players[i].speedBoost();
          }
          energy.splice(j,1);
      }
    }
  }
}

function deleteOrb(orb) {
  energy.splice(energy.indexOf(orb), 1);
}

function killEnemy(enemy) {
  enemyDeathSFX.play();
  energy.push(new Energy(enemy.x, enemy.y, true));
  enemy.y = 1000;
  setTimeout(function(){
    enemy.velX = 0;
    enemy.y = enemy.spawnY;
    enemy.x = enemy.spawnX;
  }, 1000);
}

function killPlayer(player) {
  playerDeathSFX.play();
  energy.push(new Energy(player.x, player.y, false));
  player.y = 1000;
  player.speedReset();
  setTimeout(function(){
    player.velX = 0;
    player.y = player.spawnY;
    player.x = player.spawnX;
  }, 1000);

}

function winner(player) {

  theWinner=player;
  gameStarted = false;
  cancelAnimationFrame(gameLoop);

  if(player == players[0]) console.log("player1 wins");
  else if (player== players[1]) console.log("player2 wins");
  resetGame();
  drawCredits();
}

function resetGame(){

  for(var i = 0; i < players.length; i++){
    players[i].x = players[i].spawnX;
    players[i].y = players[i].spawnY;
    players[i].velX = 0;
    players[i].score = 0;
  }

  for(var i = 0; i < enemies.length; i++){
    enemies[i].x = enemies[i].spawnX;
    enemies[i].y = enemies[i].spawnY;
  }

  energy = [];
}
