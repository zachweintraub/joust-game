//https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

//Setting the variables to become images
var jouster1Left = new Image();
var jouster1Right = new Image();
var jouster2Left = new Image();
var jouster2Right = new Image();
var joustLogo = new Image();
var background = new Image();
//Grabbing the source for the images.
jouster1Left.src = "img/Jouster1Left.png";
jouster1Right.src = "img/Jouster1Right.png";
jouster2Left.src = "img/Jouster2Left.png";
jouster2Right.src = "img/Jouster2Right.png";
joustLogo.src = "img/Logo.gif";
background.src = "img/background.png";
var blink = true;
//Set the jouster as a variable
var jouster = jouster1Left;
var jouster2 = jouster2Right;

//Player 1 positioning and velocity
player1PosX = 850;
player1PosY = 450;
player1VelX = 0;
player1VelY = 0;

//Player 2 positioning and velocity
player2PosX = 0;
player2PosY = 450;
player2VelX = 0;
player2VelY = 0;

// This is where we are setting some initial variables
friction = .98;
moveSpeed = 1.5;
jumpSpeed = 1.5;

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
    requestAnimationFrame(update);
    getInput();
    physics();
    drawGame();
    //wrap
    if(player1PosX > canvas.width){
      player1PosX = -40;
    }
    if(player2PosX > canvas.width){
      player2PosX = -40;
    }
    if(player1PosX< -40) {
      player1PosX = canvas.width;
    }
    if(player2PosX< -40) {
      player2PosX = canvas.width;
    }

  }

  //We call the update function

  // These are the event listeners that allow for the user to experience no lag time on movement
  document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    if(e.keyCode == 40){
      e.preventDefault();
    }
    //Enter Key to kick off update loop
    if(e.keyCode == 13){
      update();
      clearInterval(blinkInterval);
      keys[13] = false;

    }
  });
  document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
  });

  // This is the function to draw the game
  function drawMain() {
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.drawImage(joustLogo, canvas.width/2-joustLogo.width/2, canvas.height/2-joustLogo.height);
    blinkInterval = setInterval(blinkText, 500);
  }


  function blinkText(){

    if(!blink){
      context.font ="30px Fantasy";
      context.fillStyle = "white";
      context.fillText("Press Enter", canvas.width/2-80, canvas.height/2+60);
      console.log("fill text");
      blink = true;
    }
    else if(blink){

      console.log("fill black")
      context.fillStyle = "black";
      context.fillRect(canvas.width/2-100, canvas.height/2+30, 200, 35);
      blink = false;
    }
  }

  function drawGame(){

    context.clearRect(0,0, canvas.width, canvas.height);
    //draw background
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    context.drawImage(background,0, 0, canvas.width, canvas.height);
    //draw players
    context.drawImage(jouster, player1PosX+=player1VelX, player1PosY+=player1VelY, 50, 50);
    context.drawImage(jouster2, player2PosX+=player2VelX, player2PosY+=player2VelY, 50, 50);
  }

  // This is the function to get the user input
  function getInput(){
    //HANDLE CONTROL INPUT
    //left
    if(keys[37]){
      if(player1VelX > -moveSpeed){
        player1VelX--;
      }
      jouster = jouster1Left;
    //right
    }
    if (keys[39]){
      if(player1VelX < moveSpeed){
        player1VelX++;
      }
      jouster= jouster1Right;
    //up
    }
    if (keys[38]){
      if (player1VelY > -jumpSpeed) {
        player1VelY--;
      }
    // Player 2 controls
    }
    if(keys[65]){
      if(player2VelX > -moveSpeed){
        player2VelX--;
      }
      jouster2 = jouster2Left;
    //right
    }
    if (keys[68]){
      if(player2VelX < moveSpeed){
        player2VelX++;
      }
      jouster2 = jouster2Right;
    //up
    }
    if (keys[87]){
      if (player2VelY > -jumpSpeed) {
        player2VelY--;
      }

    }
  }

  // This is the physics functionality


  var floor = 425;
  var ceiling = 0;

  function physics(){

    if(player1PosY <= floor){
      player1VelY+=.098; //gravity
    }
    else{
      player1PosY = floor;
      player1VelY = 0
    }
    if(player2PosY <= floor){
      player2VelY+=.098; //gravity
    }
    else{
      player2PosY = floor;
      player2VelY = 0
    }
    if(player1PosY <= ceiling){
      player1PosY = 0
    }
    if(player2PosY <= ceiling){
      player2PosY = 0
    }
    player1VelX*=friction; //friction
    player2VelX*=friction; //friction

  }
