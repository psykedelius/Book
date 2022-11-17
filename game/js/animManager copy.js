
function logMessage(){

    console.log('AnimManager is loaded');
}

var tID; //we will use this variable to clear the setInterval()
var spritSize = {width:64,height:40};
var animSpeed = 100;
function animateScript(clipRow,clipLenght,loop) {
    var    position = 0; //start position for the image slicer
    var    rowPosition = clipRow*spritSize.height;
    console.log('rowPosition = '+rowPosition);
    var    endPosition = clipLenght*spritSize.width;
    clearInterval(tID);
    const  interval = animSpeed; //100 ms of interval for the setInterval()
    tID = setInterval ( () => {
        document.getElementById("player").style.backgroundPosition = 
        `-${position}px -${rowPosition}px`; 
        //we use the ES6 template literal to insert the variable "position"
        if (position < endPosition)
        { position = position + spritSize.width;}
        //we increment the position by 256 each time
        else
        { position = 0; }
        //reset the position to 256px, once position exceeds 1536px
    }
    , interval ); //end of setInterval
} //end of animateScript()