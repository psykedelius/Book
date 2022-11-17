
//create drawing variables
var canvas;
var ctx;

//game variables
var gameLoop;
var player;
var level;

window.onload = function(e) {

  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  //layer2 = document.getElementById("layer2");
  //ctx2 = layer2.getContext("2d");
  //Setup key Listeners

  //Create Player
  player = new Player (200,100);

  document.addEventListener('keydown', player.updateKeyDict);
  document.addEventListener('keyup', player.updateKeyDict);
  //start Game Loop
  gameLoop = setInterval(step,1000/30);

  //draw on the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  level = new Level( 1 );
}

function step () {
  //Step Player
 // player.step();
 // player.draw();
  //Draw everything
  draw();
}

function draw() {
  //clear the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  level.draw();
  player.draw();
  

}

    function checkIntersection(r1,r2){
      if (r1.x >= r2.x + r2.width){ return false;}
      else if (r1.x + r1.width <= r2.x){ return false;}
      else if (r1.y >= r2.y + r2.height){ return false;}
      else if (r1.y + r1.height <= r2.y){ return false;}
      else { return true;}
    }