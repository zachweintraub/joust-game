
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

//Player 1
player1 = {x: 850, y: 450, velX: 0, velY: 0, width: 35, height: 35}

//Player 2
player2 = {x: 0, y: 450, velX: 0, velY: 0, width: 35, height: 35}


//Collision Offset
// colOffset = 35;


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
  }

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

  // The blink Enter word on the start screen
  function blinkText(){
    if(!blink){
      context.font ="30px Fantasy";
      context.fillStyle = "white";
      context.fillText("Press Enter", canvas.width/2-80, canvas.height/2+60);
      blink = true;
    }
    else if(blink){
      context.fillStyle = "black";
      context.fillRect(canvas.width/2-100, canvas.height/2+30, 200, 35);
      blink = false;
    }
  }

  // This will draw the game after the start screen is passed
  function drawGame(){
    //wrap
    if(player1.x > canvas.width){
      player1.x = -40;
    }
    if(player2.x > canvas.width){
      player2.x = -40;
    }
    if(player1.x< -40) {
      player1.x = canvas.width;
    }
    if(player2.x< -40) {
      player2.x = canvas.width;
    }

    context.clearRect(0,0, canvas.width, canvas.height);
    //draw background
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    context.drawImage(background,0, 0, canvas.width, canvas.height);
    //draw players
    context.drawImage(jouster, player1.x+=player1.velX, player1.y+=player1.velY, 35, 35);
    context.drawImage(jouster2, player2.x+=player2.velX, player2.y+=player2.velY, 35, 35);
  }

  // This is the function to get the user input
  function getInput(){
    //HANDLE CONTROL INPUT
    //left
    if(keys[37]){
      if(player1.velX > -moveSpeed){
        player1.velX--;
      }
      jouster = jouster1Left;
    //right
    }
    if (keys[39]){
      if(player1.velX < moveSpeed){
        player1.velX++;
      }
      jouster= jouster1Right;
    //up
    }
    if (keys[38]){
      if (player1.velY > -jumpSpeed) {
        player1.velY--;
      }
    // Player 2 controls
    }
    if(keys[65]){
      if(player2.velX > -moveSpeed){
        player2.velX--;
      }
      jouster2 = jouster2Left;
    //right
    }
    if (keys[68]){
      if(player2.velX < moveSpeed){
        player2.velX++;
      }
      jouster2 = jouster2Right;
    //up
    }
    if (keys[87]){
      if (player2.velY > -jumpSpeed) {
        player2.velY--;
      }

    }
  }

  //This is the physics functionality
  //colliders
  var floor = 555;
  var ceiling = 0;

 // This is the physics function
  function physics(){


    player1.velX*=friction; //friction
    player2.velX*=friction; //friction


    //Colliders

    if(player1.x + player1.width > player2.x &&
       player1.x < player2.x + player2.width &&
       player1.y + player1.height > player2.y &&
       player1.y < player2.y + player2.height){

       player1.velX *= -1;
       player2.velX *= -1;


    }


    if(player1.y <= floor){
      player1.velY+=.098; //gravity
    }
    else{
      player1.y = floor;
      player1.velY = 0;
    }
    if(player2.y <= floor){
      player2.velY+=.098; //gravity
    }
    else{
      player2.y = floor;
      player2.velY = 0
    }
    if(player1.y <= ceiling){
      player1.y = 0
    }
    if(player2.y <= ceiling){
      player2.y = 0
    }

  }
