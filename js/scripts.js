//https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls


var jouster = new Image();
var jouster2 = new Image();
jouster.src = "img/Jouster.png";
jouster2.src = "img/Jouster2.png";
player1PosX = 350;
player1PosY = 450;
player1VelX = 0;
player1VelY = 0;
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


    //HANDLE CONTROL INPUT
    //left
    if(keys[37]){
      if(player1VelX > -moveSpeed){
        player1VelX--;
      }
    //right
    }
    if (keys[39]){
      if(player1VelX < moveSpeed){
        player1VelX++;
      }
    //up
    }
    if (keys[38]){
      if (player1VelY > -jumpSpeed) {
        player1VelY--;      }

    }
    if(keys[65]){
      if(player2VelX > -moveSpeed){
        player2VelX--;
      }
    //right
    }
    if (keys[68]){
      if(player2VelX < moveSpeed){
        player2VelX++;
      }
    //up
    }
    if (keys[87]){
      if (player2VelY > -jumpSpeed) {
        player2VelY--;      }

    }
    physics();
    context.clearRect(0,0, canvas.width, canvas.height);
    //draw background
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    //draw players
    context.drawImage(jouster, player1PosX+=player1VelX, player1PosY+=player1VelY, 50, 50);
    context.drawImage(jouster2, player2PosX+=player2VelX, player2PosY+=player2VelY, 50, 50);
  }

  update();
  document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;

  });
  document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
  });

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
    player1VelX*=friction; //friction
    player2VelX*=friction; //friction

  }
});
