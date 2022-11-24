
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
        this.name = 'Tile';
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
var levelTileMaps = [];
var tileSize = {x:50,y:50};
var worldSize = {x:18,y:6};

                



function Level( lvlNumber )
{
    levelBounds = {'x':0,'y':0,'width':canvas.width,'height':canvas.height};
    this.bisInit = false;
    this.xOffset = 0;
    this.yOffset = 0;
    this.worldMap = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
                     1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
                     1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,
                     1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,
                     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
   // createTile(0,300,100,300,'collider', '#cc8539');
    //createTile(0,canvas.height-75,canvas.width/2,100,'collider','#498f4b');//ground
  /*  createTile(canvas.width-100,0,100,canvas.height-100,'collider','#8f6335');//trunc
    createTile(canvas.width/3-50,canvas.height-100,300,50,'collider','#8f6335');//bloc
    createTile(canvas.width/3+150,canvas.height-150,50,50,'collider','#8f6335');//bloc
    createTile(canvas.width/3+150,canvas.height-300,50,50,'collider','#8f6335');//bloc*/
    
    this.buildLevel = function(map){
        xOffset = 0;
        yOffset = 0;
        for (let i = 0; i < map.length; i++) 
        {
            if (map[i] == 0)
            {
    
            } else if (map[i] == 1)
            {
                //console.log('buildLevel i '+i+' worldSize.x ='+tileSize.y);

                createTile(xOffset,yOffset,tileSize.x,tileSize.y,'collider','#33323d');
            } 
        
            if (xOffset<=worldSize.x*tileSize.x)
            {
                xOffset += tileSize.x; 
            }
            else{
                xOffset  = 0;
                yOffset  += tileSize.y;
            }
        }
        this.bisInit = true;
        //createTile(350,canvas.height-150,200,100,'collider','#498f4b');
        //levelTileMaps = [];
    }
    
   // createTile(canvas.width/3*2-200,canvas.height-150,100,20,'collider','#8f6335');//bloc
  //  createTile(100,canvas.height-150,200,100,'collider','#498f4b');//ground
   // createTile(350,canvas.height-150,200,100,'collider','#498f4b');//ground
    this.draw = function(){
        if (!this.bisInit)
        {
            console.log('this.bisInit! '+this.bisInit );
            this.buildLevel(this.worldMap);
            this.bisInit=true;
    
        }
        for (let index = 0; index < levelTileMaps.length; index++) {
            const tile = levelTileMaps[index];
            ctx.beginPath();
            ctx.fillStyle = tile.color;
            ctx.lineWidth = 2;
            ctx.fillRect(tile.x,tile.y, tile.width, tile.height);  
            }

    }
    console.log('start setup level '+levelTileMaps.length);
    
    
}
///creating tiles
function createTile (x,y,w,h,type,col) {
    //
    newTile = new levelTile();
    newTile.x = x;
    newTile.y = y;
    newTile.width = w;
    newTile.height = h;
    newTile.type = type;
    newTile.color = col;
    newTile.hitbox = new Rectangle(this.x,this.y,this.width,this.height);
    levelTileMaps.push(newTile);
    console.log('levelTileMaps size =  '+levelTileMaps.length);
}


