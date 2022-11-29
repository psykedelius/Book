
class tileSprite{
    constructor(tileName,x,y,w,h,id){
        this.tileName = tileName;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.id = id;
    }

}

var tileBank = {};



function createSprite (id, spriteName,x,y,w,h)
{
    
    let newSprite =  new tileSprite (spriteName,x,y,w,h,id);
    tileBank[id] = newSprite;
    console.log('createSprite '+tileBank[id])
    
}

function getUVCoords (id){
   // console.log('id  '+id)
   
    if (tileBank[id]!=null)
    {
       // console.log('good '+tileBank[id].id)
        return tileBank[id];
    }else{
        console.log('bad '+id)
        return tileBank['54'];
    }
    

}
createSprite(55,'--',96,96,32,32);
createSprite(54,'--',96,96,32,32);
createSprite(0,'tl',0,0,32,32);
createSprite(1,'tm',32,0,32,32);
createSprite(2,'tr',64,0,32,32);
createSprite(17,'ml',0,32,32,32);
createSprite(18,'mm',32,32,32,32);
createSprite(19,'mr',64,32,32,32);
createSprite(34,'dl',0,64,32,32);
createSprite(35,'dm',32,64,32,32);
createSprite(36,'dr',64,64,32,32);
createSprite(7,'ctr',224,0,32,32);
createSprite(6,'ctl',192,0,32,32);
createSprite(24,'cbr',224,32,32,32);
createSprite(23,'cbl',192,32,32,32);
createSprite(78,'tgr',320,128,32,32);
createSprite(77,'tgl',288,128,32,32);

createSprite(70,'pr',64,128,32,32);
createSprite(69,'pm',32,128,32,32);
createSprite(68,'pl',0,128,32,32);

