
$(document).ready(() => {

    // Clamp number between two values with the following line:
    const keyDict = {};
    const limits = {Ymin:50,Ymax:400}
    

    const Player = {
      el: document.querySelector("#player"),
      x: 200,
      y: 100,
      prevx: 200,
      prevy: 200,
      prevState: 'idle', //idle,running,death
      speed: 2,
      state(){
        //if player has moved
        if (this.prevx!=this.x || this.prevy!=this.y || (this.prevx!=this.x && this.prevy!=this.y))
        {
          //console.log('prevState='+this.prevState+' this.prevx '+this.prevx+' this.x='+this.x);
          //if prevState was different
          if (this.prevState!='moving') 
          {
            this.animate(1); // running animationClip
            this.prevState = 'moving';
          }
        }
        else{
          if (this.prevState != 'idle')
          {
            this.animate(0); // running animationClip
            this.prevState = 'idle';
          }
        }
        
      },
      collision(){},
      forces(){

      },
      move() {
        if (this.y<limits.Ymin){this.y = limits.Ymin}
        if (this.y>limits.Ymax){this.y = limits.Ymax}
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        
      },
      animate(clip){
        if (clip == 0)
        {
          $.getScript("js/animManager.js", function() {
            animateScript(0,3,true);
         });
        }
        if (clip == 1)
        {
          $.getScript("js/animManager.js", function() {
            animateScript(1,5,true);
         });
        }
        if (clip == 2)
        {
          $.getScript("js/animManager.js", function() {
            animateScript(2,5,false);
         });
        }
      }
    };
    
    const updateKeyDict = (ev) => {
        const k = ev.code;
        
        if (/^Arrow\w+/.test(k)) { // If is arrow
          ev.preventDefault();
          keyDict[k] = ev.type === "keydown"; // set boolean true / false
        }
    };
    
    const update = () => {
      // Determine move distance to account diagonal move: 1/Math.sqrt(2) = ~0.707
      let dist =
        keyDict.ArrowUp   && (keyDict.ArrowLeft || keyDict.ArrowRight) ||
        keyDict.ArrowDown && (keyDict.ArrowLeft || keyDict.ArrowRight) ? 0.707 : 1;
        
      dist *= Player.speed;
      //store the last player position
      Player.prevx = Player.x;
      Player.prevy = Player.y;
      //update player Position
      if (keyDict.ArrowLeft)  Player.x -= dist;
      if (keyDict.ArrowUp)    Player.y -= dist;
      if (keyDict.ArrowRight) Player.x += dist;
      if (keyDict.ArrowDown)  Player.y += dist;

      Player.move();
      Player.state();

      //Player.animate(1);
      //console.log(Player.x);
    }

    document.addEventListener('keydown', updateKeyDict);
    document.addEventListener('keyup', updateKeyDict);
    
    (function engine() {
      update();
      window.requestAnimationFrame(engine);
    }());
    });
    
    
    