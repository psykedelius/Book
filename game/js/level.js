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

function levelManager(){

    console.log( new Date());
    let url = 'js/level1.json';
    let tilesetUrl = 'js/terrainTileSet.json';
    let lvl = null;
    
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
            BuildTheLevel();
        }).fail(function(){
            console.log("An error has occurred.");
        });
    });
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
                    console.log('i =  '+i+" j = "+j +" index="+index+" id= "+id);//tileSet.tiles[id]);
                    let tileAttributs = tileSet.tiles[id];
                    //tileSet.tiles[id]);
                    //console.log('colliderMap size =  '+colliderMap.length);
                    curTilePos.x = j*tileWidth;
                    curTilePos.y = i*tileHeight;
                    //createTile (j*tileWidth,i*tileHeight,tileWidth,tileHeight,'collider',tileSet.tiles[id]);
                                        
                        createTile (j*tileWidth,i*tileHeight,tileWidth,tileHeight,tileSet.tiles[id].class,id);
                    
                    curTilePos.x += 1; 
                    index+=1
                }
            }
        }
    } 
    

    function createTile (x,y,w,h,type,id) {
        //
        console.log('createTile =  '+id+" type = "+type);
        newTile = new levelTile();
        newTile.id = id;
        newTile.x = x;
        newTile.y = y;
        newTile.width = w;
        newTile.height = h;
        newTile.type = type;
        newTile.color = 'blue';
        newTile.hitbox = new Rectangle(this.x,this.y,this.width,this.height);
        if (newTile.type == "collider" ) 
        {colliderMap.push(newTile);newTile.color = 'red'; }
        levelMap.push(newTile);
        //else{colliderMap.push(newTile);}
        
    }
    




    this.draw = function(){
        //tileSet[Image]
        for (let i = 0; i < levelMap.length; i++) {
            let tile = levelMap[i];
            //console.log('uvCoord =  '+tile.id);
            if (tileSet.tiles[tile.id]!=null && tileSet.tiles[tile.id]!=undefined){
                if (tileSet.tiles[tile.id].class == 'collider')
                {
                    let uvCoord =  getUVCoords(tile.id);
                    //tileSet.tiles[tile.id].
                    
                    ctx.beginPath();
                    ctx.fillStyle = tile.color;
                    ctx.lineWidth = 2;
                    //ctx.fillRect(tile.x,tile.y, tile.width, tile.height);  
                    ctx.drawImage(spriteSheet, uvCoord.x,uvCoord.y, tile.width, tile.height, tile.x, tile.y,tile.width, tile.height, this.width, this.height);
                }
            }
        } 
    }
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


