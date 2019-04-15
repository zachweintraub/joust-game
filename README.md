# Jousting

#### This project is for recreating the arcade classic of Joust, 4/14/19


#### By _**Brendan Hellar**_

## Description


#### The goal of this project is to recreate the arcade classic of Joust.  This project will display what we have learned up until week 5 of Epicodus.

###### This portion establishes variables to become images that will be utilzed in the program.
```
var jouster1Left = new Image();
var jouster1Right = new Image();
var jouster2Left = new Image();
var jouster2Right = new Image();
var joustLogo = new Image();
var background = new Image();
```
###### This portion will link the images to their sources so we can have them appear in the game. In addition to this we have a blink variable which will be explained later.
```
jouster1Left.src = "img/Jouster1Left.png";
jouster1Right.src = "img/Jouster1Right.png";
jouster2Left.src = "img/Jouster2Left.png";
jouster2Right.src = "img/Jouster2Right.png";
joustLogo.src = "img/Logo.gif";
background.src = "img/background.png";
var blink = true;
```
######  This sets the jouster as a variable that can be used later.
```
var jouster = jouster1Left;
var jouster2 = jouster2Right;
```
###### This sets the starting positioning of Player 1.
```
player1PosX = 850;
player1PosY = 450;
player1VelX = 0;
player1VelY = 0;
```
###### This sets the starting positioning of Player 2.
```
player2PosX = 0;
player2PosY = 450;
player2VelX = 0;
player2VelY = 0;
```
###### Initial variable settings and empty key for keystrokes which allow for our character movements to be smoother.
```
friction = .98;
moveSpeed = 1.5;
jumpSpeed = 1.5;
keys=[];
```
###### This is our ready function and sets up the canvas and allows us to draw on it.  This also activates the function drawMain.
```
$().ready(function() {
  canvas = $("#canvas").get(0);
  context = canvas.getContext("2d");
  drawMain();
});
```
###### This is the powerhouse of our work and is the update function which calls on 4 functions to run.
```
function update(){
    requestAnimationFrame(update);
    getInput();
    physics();
    drawGame();
  }
```
###### This is our event listener that allows the user to experience little lag time in button responses. 
```
document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    if(e.keyCode == 40){
      e.preventDefault();
    }
    if(e.keyCode == 13){
      update();
      clearInterval(blinkInterval);
      keys[13] = false;

    }
  });
  document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
  });
```
###### This function allows for the initial draw on the canvas.  It sets our width to the canvas and same with height.  It also draws our logo and blinks the starting text.
```
function drawMain() {
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.drawImage(joustLogo, canvas.width/2-joustLogo.width/2, canvas.height/2-joustLogo.height);
    blinkInterval = setInterval(blinkText, 500);
  }
```
###### This is the function we use to blink the intro text telling the users to press Enter.
```
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
```
###### Once the Enter button is pressed this function draws the Jousters and the new background that the players can play on.
```
function drawGame(){
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

    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
    context.drawImage(background,0, 0, canvas.width, canvas.height);
    context.drawImage(jouster, player1PosX+=player1VelX, player1PosY+=player1VelY, 35, 35);
    context.drawImage(jouster2, player2PosX+=player2VelX, player2PosY+=player2VelY, 35, 35);
  }
```
###### These are the controls for both Jouster 1 and Jouster 2
```
function getInput(){
    if(keys[37]){
      if(player1VelX > -moveSpeed){
        player1VelX--;
      }
      jouster = jouster1Left;
    }
    if (keys[39]){
      if(player1VelX < moveSpeed){
        player1VelX++;
      }
      jouster= jouster1Right;
    }
    if (keys[38]){
      if (player1VelY > -jumpSpeed) {
        player1VelY--;
      }
    }
    if(keys[65]){
      if(player2VelX > -moveSpeed){
        player2VelX--;
      }
      jouster2 = jouster2Left;
    }
    if (keys[68]){
      if(player2VelX < moveSpeed){
        player2VelX++;
      }
      jouster2 = jouster2Right;
    }
    if (keys[87]){
      if (player2VelY > -jumpSpeed) {
        player2VelY--;
      }

    }
  }
```
###### Physics and collider mechanics
```
  var floor = 555;
  var ceiling = 0;
```
###### Physics function that actives the gravity variable and helps with player positioning.
```
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
```

=======

## Setup/Installation Requirements

-   Please clone from the Github repo https://bwhellar.github.io/Jousting/
-   By pressing Enter the player is allowed to play Joust.

This app requires the internet as it uses HTMl and CSS and Javascript.

## Known Bugs

No known bugs

## Support and contact details

If you have any issues please contact Brendan Hellar at bwhellar@gmail.com

## Technologies Used

HTML and CSS and Javascript

### License

MIT

Copyright (c) 2019 **Brendan Hellar**
