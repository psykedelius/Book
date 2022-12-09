/*
var url = "js/level1.json";         
$.getJSON(url, function (data) {
    $.each(data, function (key, model) {
        if (model.key == "layers") {
            console.log('level1 '+model.value)
        }
    })
});
*/
var debugMode = false;
var cameraOffset = {x:0,y:0};;
var levelBounds = {'x':0,'y':0,'width':0,'height':0};


class Rectangle{
    constructor(l,t,w,h){
        this.l = this.ol = l; 
        this.r = this.or = l+w;
        this.t = this.ot = t;
        this.b = this.ob = l+h;

        this.w = this.ow = w;
        this.h = this.oh = h;
        this.vx = this.vy = 0;
    }
    setBottom(b){this.b = b; this.t = b - this.h;}
    setLeft(l){  this.l = l; this.r = l + this.w;}
    setRight(r){ this.r = r; this.l = r - this.w;}
    setTop(t){   this.t = t; this.b = t + this.h;}
}
class levelTile  {    
    constructor() {
        this.id = '';
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
        this.type = 'collider';
        this.color = '#cc8539';
        this.hitbox = new Rectangle(this.x,this.y,this.width,this.height);
       
        this.draw = function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y, this.width, this.height);
        }
      }
};
var isLevelReady = false;
var levelMap = [];
var colliderMap = [];
var tileSize = {x:50,y:50};
var worldSize = {x:18,y:6};
//atlas coords
var spriteSheet = new Image();
spriteSheet.src = 'ressources/Terrain.png';
this.srcX = 0;
this.srcY = 0;
this.width  = 64;
this.height = 40;

var tileSet = null;
var lvl = null; 
function loadLevelData(){
    console.log( new Date());
    let url = 'levels/level1.json';
    let tilesetUrl = 'levels/terrainTileSet.json';
    
        ///////////
    //Loading JSON files
    //////////
    $(document).ready(function(){
        $.getJSON(tilesetUrl, function(data){
            tileSet = data;
            console.log("tileSet Loaded !  "+data.tiles.length); // Prints: Harry
           // console.log(data.height); // Prints: 14
            
            //BuildTheLevel(data);
        }).fail(function(){
            console.log("An error has occurred.");
        });
    
        $.getJSON(url, function(data){
            lvl = data;
            console.log(data.layers); // Prints: Harry
            console.log(data.height); // Prints: 14
            console.log('level Loaded ! '+data.layers[0].data.length);
            level = new levelManager(lvl);
            
            
        }).fail(function(){
            console.log("An error has occurred.");
        });
    });
}
function levelManager(lvl){
    BuildTheLevel();
    //setInterval(step,100);
    ///////////
    //Building the level
    //////////
    function BuildTheLevel(){
        console.log('BuildTheLevel !'+lvl.layers[0].data);
        let map = lvl.layers[0].data;
        let curTilePos = {x:0,y:0};
        let tileWidth  = lvl.tilewidth;
        let tileHeight = lvl.tileheight;
        let lvlWidth   = lvl.layers[0].width;
        let lvlHeight  = lvl.layers[0].height;
        
        let index = 0;
        //console.log('lvlWidth =  '+lvlWidth+" lvlHeight = "+lvlHeight);
        for (let i = 0; i <= lvlHeight; i++) {
            //curTilePos.x = 0;
            console.log('ligne : '+i);
           // curTilePos.y +=1;
            for (let j = 0; j < lvlWidth; j++) {
                if (index<map.length)
                {
                    let id = map[index]; 
                   // console.log('bloc '+j+"/"+i+"  index="+index+" id= "+tileSet.tiles[id][0]);//tileSet.tiles[id]);
                    curTilePos.x = j*tileWidth; 
                    curTilePos.y = i*tileHeight;
                                        
                    let name = "bloc"+j+"/"+i;
                    let x = j*tileWidth;
                    let y = i*tileHeight;
                    let w = tileWidth;
                    let h = tileHeight;
                    //console.log('id =  '+id+" class = "+tileSet.tiles[id]['class']);
                    if (tileSet.tiles[id].class === undefined)
                    {
                        
                        createTile (x,y,w,h,"void",id);
                    }else{
                       console.log('tileSet.tiles['+id+']["class"] '+(x/32)+"/"+(y/32))
                        createTile (x,y,w,h,tileSet.tiles[id-1]["class"],id);
                        if (tileSet.tiles[id]["class"] == "spawn")
                        {
                            console.log('Spawn Player !');
                        }
                    }

                    index+=1
                }
            }
            
           
        }
        console.log('levelMap =  '+levelMap.length);
        isLevelReady = true;
        //this.draw();
        //step();
    } 
    

 

      this.draw = function (){
        ctx.clearRect(0,0, canvas.width,canvas.height);
       // if (levelMap.length>0)
        //tileSet[Image]
        cameraOffset =  getCameraOffset();
        for (let i = 0; i < levelMap.length; i++) { 
            let tile = levelMap[i];
            //console.log('tileSet.tiles['+tile.id+'] =  '+ tileSet.tiles[tile.id].class);
            if (tileSet.tiles[tile.id]!=null && tileSet.tiles[tile.id]!=undefined){
               // if (tileSet.tiles[tile.id].class == 'collider')
              //  {
                    let uvCoord =  getUVCoords(tile.id-1);
                    //console.log("getCameraOffset "+(cameraOffset.x));
                    ctx.drawImage(spriteSheet, uvCoord.x,uvCoord.y, tile.width, tile.height, tile.x, tile.y,tile.width, tile.height, this.width, this.height);
                    if (debugMode == true)
                    {
                        if (tileSet.tiles[tile.id-1].class == 'collider')
                        {
                            ctx.fillStyle = 'red';
                            ctx.fillRect(tile.x, tile.y,tile.width, tile.height);
                            
                           // console.log('Match !'+tile.id);
                        }
                    }
               // }
            }
        } 
    }
}

var cameraDamping = 1;
var cameraOffsetTemp = {x:0,y:0};
function getCameraOffset()
{
    let cameraOffsetTemp = cameraOffset;
   // ctx.translate(-player.x_velocity, -player.y_velocity);
   //if (player.ScreenPosx<(canvas.width/3) || player.ScreenPosx>(canvas.width/3)*2)
  //  {
        cameraOffsetTemp.x = player.ScreenPosx-420/2+player.x_velocity ;
 ///   }
 //   if (player.ScreenPosy<(canvas.height/4) )
  //  {
        //cameraOffset.y = -player.ScreenPosy+canvas.height/4+player.y_velocity ;
 //   }
    cameraOffset.x = lerp(cameraOffset.x,cameraOffsetTemp.x,0.001)
  /*  else if (player.ScreenPosy>(canvas.height/4)*3)
    {
        cameraOffset.y = -player.ScreenPosy+canvas.height/4+player.y_velocity ;
    }*/

    //
    //console.log("getCameraOffset.x = "+cameraOffset.x)
    return  cameraOffset;
}


function lerp(min,max,value){
    return (max-min)*value+min;
}


  function getTileAttributs(id){
    //level[]

  }

//parse CSV
//var levelData = JSON.parse(level1);
 //alert(levelData['layers']['data'].name);
 /*alert(mydata[0].age);
 alert(mydata[1].name);
 alert(mydata[1].age);*/
    //


