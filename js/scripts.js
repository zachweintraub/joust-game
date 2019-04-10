//https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls


var jouster = new Image();
jouster.src = "img/Jouster.png";
playerPosX = 0;
playerPosY = 0;

$().ready(function() {

  canvas = $("#canvas").get(0);
  context = canvas.getContext("2d");
  setInterval(update, 1000/144)


  function update(){

    gravity();

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);

    context.drawImage(jouster,playerPosX,playerPosY, 50, 50);

  }

  document.addEventListener('keydown', move);

  function gravity(){
    playerPosY++;
    if(playerPosY>=450){
      playerPosY = 450;
    }
  }


  function move(event){
    let key = event.keyCode;
    if(key == 37){
      playerPosX-=20;
    }else if (key == 39){
      playerPosX+=20;
    }
  }
});
