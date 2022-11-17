
function logMessage(){

    console.log('AnimManager is loaded');
}
var thisFrameTime = new Date();
var oldFrameTime  = new Date(); 
var delayTimer    = 0;


var targetFps = 12;
var framRate      = 1/targetFps;
var tID; //we will use this variable to clear the setInterval()
var spritSize = {width:64,height:40};
var animSpeed = 2;
var FrameIndex = 0;
var clips = {
    'idle':{'clipRow':0,'clipLenght':4,'loop':true},
    'run':{'clipRow':1,'clipLenght':6,'loop':true},
    'jump':{'clipRow':2,'clipLenght':3,'loop':true},
    'fall':{'clipRow':3,'clipLenght':0,'loop':true},
    'grounded':{'clipRow':4,'clipLenght':1,'loop':false},
    'hit':{'clipRow':5,'clipLenght':4,'loop':false},
    'dead':{'clipRow':6,'clipLenght':4,'loop':false}
};

function animator (clipName)
{
    
    if(clipName == "idle"){return animateScript(clips.idle.clipRow,clips.idle.clipLenght,clips.idle.loop);}
    if(clipName == "run"){return animateScript(clips.run.clipRow,clips.run.clipLenght,clips.run.loop);}
    if(clipName == "jump"){return animateScript(clips.jump.clipRow,clips.jump.clipLenght,clips.jump.loop);}
    if(clipName == "fall"){return animateScript(clips.fall.clipRow,clips.fall.clipLenght,clips.fall.loop);}
    if(clipName == "grounded"){return animateScript(clips.grounded.clipRow,clips.grounded.clipLenght,clips.grounded.loop);}
    if(clipName == "hit"){return animateScript(clips.hit.clipRow,clips.hit.clipLenght,clips.hit.loop);}
    if(clipName == "dead"){return animateScript(clips.dead.clipRow,clips.dead.clipLenght,clips.dead.loop);}
}


function animateScript(clipRow,clipLenght,loop){

    let srcX = FrameIndex*spritSize.width;
    let srcY = clipRow*spritSize.height;

    // Calculate the number of seconds passed since the last frame
    this.oldFrameTime  = this.thisFrameTime ;
    this.thisFrameTime = new Date();
    this.delayTimer += (this.thisFrameTime-this.oldFrameTime)/1000;
   // console.log("FPS = "+this.delayTimer);
    
    //if FPS reached display next frame
    if (this.delayTimer>this.framRate)
    {
        this.delayTimer =0;
        this.FrameIndex =this.FrameIndex+1;
    }

 
   // console.log('AnimManager FrameIdex '+this.FrameIndex+"  secondsPassed="+this.oldTimeStamp);

    let atlasCoord = {'srcX':srcX,'srcY':srcY}
    if (loop){
        if ((this.FrameIndex)>=clipLenght){this.FrameIndex =0;}
    }else{
        if ((this.FrameIndex)<clipLenght){}else{this.FrameIndex = clipLenght-1;}
    }
    
    
    return {atlasCoord};
}

 //end of animateScript()