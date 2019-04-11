//https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

//

var jouster1Left = new Image();
var jouster1Right = new Image();
var jouster2Left = new Image();
var jouster2Right = new Image();

jouster1Left.src = "img/Jouster1Left.png";
jouster1Right.src = "img/Jouster1Right.png";
jouster2Left.src = "img/Jouster2Left.png";
jouster2Right.src = "img/Jouster2Right.png";
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
friction = .98;
moveSpeed = 1.5;
jumpSpeed = 1.5;

keys=[];


$().ready(function() {

  canvas = $("#canvas").get(0);
  context = canvas.getContext("2d");


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

  update();
  document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;

  });
  document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
  });

  function drawGame(){

    context.clearRect(0,0, canvas.width, canvas.height);
    //draw background
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    //draw players
    context.drawImage(jouster, player1PosX+=player1VelX, player1PosY+=player1VelY, 50, 50);
    context.drawImage(jouster2, player2PosX+=player2VelX, player2PosY+=player2VelY, 50, 50);
  }

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
  function physics(){

    if(player1PosY <= 450){
      player1VelY+=.098; //gravity
    }
    else{
      player1PosY = 450;
      player1VelY = 0
    }
    if(player2PosY <= 450){
      player2VelY+=.098; //gravity
    }
    else{
      player2PosY = 450;
      player2VelY = 0
    }
    if(player1PosY <= 0){
      player1PosY = 0
    }
    if(player2PosY <= 0){
      player2PosY = 0
    }
    player1VelX*=friction; //friction
    player2VelX*=friction; //friction

  }
});
