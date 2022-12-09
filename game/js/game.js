
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

  canvas.width = 480;//parent.offsetWidth;
  canvas.height = 200;//parent.offsetHeight;
  ctx = canvas.getContext('2d');
  
  //layer2 = document.getElementById("layer2");
  //ctx2 = layer2.getContext("2d");
  //Setup key Listeners
  loadLevelData();
  //start Game Loop
 // gameLoop = setInterval(step,1000/30);
  //requestAnimationFrame(step);
  //draw on the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  //new levelManager(  );
    //Create Player
   // player = new Player (200,100);
  //draw on the canvas
  ctx.fillStyle = "white";
  lastFrameTime();
  var tester  = test();
  
}

function*test() {
  
  yield;
  console.log('First I got: ' + x);
  yield;
  lastFrameTime();
};

function step (timestamp) {


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

function loadingComplete()
{


}
function draw() {
  //clear the canvas
  ctx.clearRect(0,0, canvas.width,canvas.height);
  ctx.save();



 // ctx.fillStyle = "white";
  //ctx.fillRect(0,0,canvas.width,canvas.height);
 
  //if (isLevelReady) { level.draw();}

  if (typeof( player)!="undefined")
  {   
    cameraOffset = getCameraOffset();
    ctx.translate(-cameraOffset.x, cameraOffset.y);
    if (isLevelReady) { level.draw();}

    
  
    
    player.draw();
  }

  ctx.restore();
}


