
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
      }
};
var levelTileMaps = [];

function Level( lvlNumber )
{
    createTile(0,20,100,200,'collider', '#cc8539');
    createTile(0,canvas.height-50,canvas.width/2,100,'collider','#498f4b');//ground
    createTile(canvas.width-100,0,100,canvas.height-100,'collider','#8f6335');//trunc
    createTile(canvas.width/3-100,canvas.height-75,300,100,'collider','#8f6335');//bloc
    createTile(canvas.width/3*2-300,canvas.height-150,100,100,'collider','#8f6335');//bloc
    createTile(canvas.width/3*2-200,canvas.height-150,100,20,'collider','#8f6335');//bloc

    this.draw = function(){
        for (let index = 0; index < levelTileMaps.length; index++) {
            const tile = levelTileMaps[index];
            ctx.beginPath();
            ctx.fillStyle = tile.color;
            ctx.lineWidth = 2;
            ctx.fillRect(tile.x,tile.y, tile.width, tile.height);  
            }
    
    }
    console.log('start setup level');
    
    
}
///creating tiles
function createTile (x,y,w,h,type,col) {
    //
    //let tempLevelMap = [levelTileMaps.length+1];
    
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

