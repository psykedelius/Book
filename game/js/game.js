
//create drawing variables
var canvas;
var ctx;

//game variables
var gameLoop;
var player;
var level;

//Time variables
let start, previousTimeStamp;
var basetime = Date.now();
var fps = 1000/60;
var deltaTime = 0;

window.onload = function(e) {

  canvas = document.getElementById('game-canvas');
  var parent = document.getElementById("parent");
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  ctx = canvas.getContext('2d');
  
  //layer2 = document.getElementById("layer2");
  //ctx2 = layer2.getContext("2d");
  //Setup key Listeners

  //Create Player
  player = new Player (200,100);

  document.addEventListener('keydown', player.updateKeyDict);
  document.addEventListener('keyup', player.updateKeyDict);
  //start Game Loop
 // gameLoop = setInterval(step,1000/30);
  //requestAnimationFrame(step);
  //draw on the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  level = new Level( 1 );
  lastFrameTime();
}


function step (timestamp) {

  
  //deltaTime = 
  
  //Draw everything
  //draw();
  lastFrameTime();
}

function lastFrameTime(){

  var now   = Date.now();
  var check = now - basetime;
  if( check / fps >= 1 ) {
      basetime = now;
      deltaTime = check;
      draw();
  }

  requestAnimationFrame( lastFrameTime, fps );
}

function draw() {
  //clear the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  level.draw();
  
  player.draw();
  

}


