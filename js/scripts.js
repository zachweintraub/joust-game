
//Setting the variables to become images
var jouster1Left = new Image();
var jouster1LeftFlap = new Image();
var jouster1Right = new Image();
var jouster1RightFlap = new Image();

var jouster2Left = new Image();
var jouster2LeftFlap = new Image();
var jouster2Right = new Image();
var jouster2RightFlap = new Image();

var cloud = new Image();
var cloudPos = 45;
var logo1 = new Image();
var logo2 = new Image();
var logo3 = new Image();
var logo4 = new Image();
var background = new Image();

//Grabbing the source for the images.
jouster1Left.src = "img/sprite1_left.png";
jouster1LeftFlap.src = "img/sprite1_leftflap.png";
jouster1Right.src = "img/sprite1_right.png";
jouster1RightFlap.src = "img/sprite1_rightflap.png";
jouster2Left.src = "img/sprite2_left.png";
jouster2LeftFlap.src = "img/sprite2_leftflap.png";
jouster2Right.src = "img/sprite2_right.png";
jouster2RightFlap.src = "img/sprite2_rightflap.png";
cloud.src = "img/cloud0.png";
logo1.src = "img/JoustLogo0.png";
logo2.src = "img/JoustLogo1.png";
logo3.src = "img/JoustLogo2.png";
logo4.src = "img/JoustLogo3.png";
background.src = "img/background.png";
var blink = true;

var logos = [logo1, logo2, logo3, logo4, logo3, logo2];


//Set the jouster as a variable
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
  {x: 850, y: 450, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: true, spawnX: 850, spawnY: 450, score: 0},
  //player 2
  {x: 0, y: 450, velX: 0, velY: 0, width: 35, height: 35, isJumping: false, facingLeft: false, spawnX: 0, spawnY: 450, score: 0}
]

//Platforms
var platforms = [
  {x: -100, y: 0, width: 1100, height: 5},
  {x: 0, y: 188, width: 125, height: 25},
  {x: 388, y: 130, width: 125, height: 25},
  {x: 775, y: 188, width: 125, height: 25},
  {x: 0, y: 356, width: 62, height: 25},
  {x: 290, y: 332, width: 315, height: 25},
  {x: 838, y: 356, width: 62, height: 25},
  {x: -100, y: 475, width: 1100, height: 25}
]

// This is where we are setting some initial variables
friction = .98;
gravity = .098;
moveSpeed = 1.5;
jumpSpeed = 1.5;
jumpForce = 2;

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
      clearInterval(logoLoop);
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
    // context.drawImage(joustLogo, canvas.width/2-joustLogo.width/2, canvas.height/2-joustLogo.height);
    blinkInterval = setInterval(blinkText, 500);
    logoInterval = setInterval(logoLoop, 250);
  }

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

    //draw cloud
    for (var i = 0; i < clouds.length; i++) {
      context.drawImage(cloud, clouds[i].x+=clouds[i].vel, clouds[i].y, clouds[i].height, clouds[i].width);
      if (clouds[i].x > canvas.width && clouds[i].vel > 0){
        clouds[i].x = -100;
      }
      if (clouds[i].x < 0 && clouds[i].vel < 0){
        clouds[i].x = canvas.width + 100;
      }
    }

    //draw platforms
    context.drawImage(background,0, 0, canvas.width, canvas.height);

    //draw score
    context.font = "30px Fantasy";
    context.fillStyle = "white";
    context.fillText(players[1].score, 388, 30);
    context.fillText(players[0].score, 493, 30);

    //draw players
    context.drawImage(jouster, players[0].x+=players[0].velX, players[0].y+=players[0].velY, 35, 35);
    context.drawImage(jouster2, players[1].x+=players[1].velX, players[1].y+=players[1].velY, 35, 35);
  }

  // This is the function to get the user input


  function getInput(){
    //Player 1 Controls
    //left
    if(keys[37]){
      if(players[0].velX > -moveSpeed){
        players[0].velX--;
      }
      jouster = jouster1Left;
      players[0].facingLeft = true;
    //right
    }
    if (keys[39]){
      if(players[0].velX < moveSpeed){
        players[0].velX++;
      }
      jouster= jouster1Right;
      players[0].facingLeft = false;
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
      if (players[0].velY > -jumpSpeed) {
        players[0].velY-=jumpForce;
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
      if(players[1].velX > -moveSpeed){
        players[1].velX--;
      }
      jouster2 = jouster2Left;
      players[1].facingLeft = true;
    //right
    }
    if (keys[68]){
      if(players[1].velX < moveSpeed){
        players[1].velX++;
      }
      jouster2 = jouster2Right;
      players[1].facingLeft = false;
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
      if (players[1].velY > -jumpSpeed) {
        players[1].velY-=jumpForce;
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

  function physics(){

    //gravity and friction
    for(var i = 0; i < players.length; i++){
      players[i].velX*=friction;
      players[i].velY+=gravity;
    }

    //player-player collision
    if(players[0].x + players[0].width > players[1].x &&
       players[0].x < players[1].x + players[1].width &&
       players[0].y + players[0].height > players[1].y &&
       players[0].y < players[1].y + players[1].height){

       players[0].velX *= -1;
       players[1].velX *= -1;

       //determine winner
       if ( players[0].facingLeft != players[1].facingLeft){
         if(players[0].y < players[1].y){
           killPlayer(players[1]);
           players[0].score++;
         }
         else if (players[0].y > players[1].y){
           killPlayer(players[0]);
           players[1].score++;
         }
       }
       else if(players[0].facingLeft && players[1].facingLeft){
         if(players[0].x > players[1].x){
           killPlayer(players[1]);
           players[0].score++;
         }
         else if(players[0].x < players[1].x){
           killPlayer(players[0]);
           players[1].score++;
         }
       }
       else if(!players[0].facingLeft && !players[1].facingLeft){
         if(players[0].x < players[1].x){
           killPlayer(players[1]);
           players[0].score++;
         }
         else if(players[0].x > players[1].x){
           killPlayer(players[0]);
           players[1].score++;
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
  }

  function killPlayer(player) {
    player.y = 1000;
    setTimeout(function(){
      player.velX = 0;
      player.y = player.spawnY;
      player.x = player.spawnX;
    }, 1000);
  }
