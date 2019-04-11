//https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls


var jouster = new Image();
jouster.src = "img/Jouster.png";
player1PosX = 0;
player1PosY = 0;
player1VelX = 0;
player1VelY = 0;
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
    physics();
    context.clearRect(0,0, canvas.width, canvas.height);
    //draw background
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    //draw players
    context.drawImage(jouster, player1PosX+=player1VelX, player1PosY+=player1VelY, 50, 50);

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
    player1VelX*=friction; //friction

  }
});
