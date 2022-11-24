
    // Clamp number between two values with the following line:
    const keyDict = {};
    const limits = {Xmin:0,Xmax:2000,Ymin:0,Ymax:2000}
    var frameRate = 1000/8;
    var debug = true;

    function Player (x,y) {

      this.prevState= 'idle', //idle,running,death
      this.curState= 'idle', //idle,running,death
      this.ScreenPosx = x;
      this.ScreenPosy = y;
     
      this.prevx = x;
      this.prevy = y;
      this.wasFacingRight=true;
      this.isFacingRight=true;

      //Player Vars
      this.grounded = false;
      this.friction = 0.4;
      this.groundFriction = 0.5;
      this.jumping = false;
      this.airBorn = false
      this.jumpForce = 15;
      const gravity = 0.2;
      this.playerRect;
      this.tileRect;

      this.speed = 1;
      this.x_velocity = 0;
      this.x_velocityMax = 2;
      this.y_velocity = 0;
      this.y_velocityMax = 10;

      //atlas coords
      var spriteSheet = new Image();
      spriteSheet.src = 'ressources/pirate.png';
      this.srcX = 0;
      this.srcY = 0;
      this.width  = 64;
      this.height = 40;
      //hitbox
      class hitbox {
        constructor(x,y,w,h) {
          this.name = 'playerHitBox';
          this.x = x+22;
          this.y = y+10;
          this.width = w/2-11;
          this.height = h-18;
          this.type = 'collider';
          this.rect = new Rectangle(this.x,this.y,this.width,this.height);
        
        } 
      }
      this.collider = new Rectangle(this.x,this.y,this.width,this.height);
     
      //playerCollider = new Rectangle(hitbox.x,hitbox.y,hitbox.width,hitbox.height);

      //console.log("Start : this.ScreenPosx ="+this.ScreenPosx+"  this.ScreenPosy="+this.ScreenPosy);
      requestAnimationFrame(step);
      //setInterval(step,frameRate);
      let atlasSrcCoord = animator('idle').atlasCoord;
      setupPlayer();

      function setupPlayer (){
        console.log("Setup Player ");
        this.collision= new hitbox(this.x,this.y,this.width,this.height);
      }


      //update Function
      this.step = function() {
        this.state();
        // this.gravity();
        this.collision();
        this.move();
        this.update();
        requestAnimationFrame(step);
      }
      let hitBoxRect;
      let verticalRect;
      let horizontalRect;
      this.collision = function(){

      let collisionDirection = {'l':0,'r':0,'t':0,'d':0};
      let correctedPos = {'x':0,'y':0};
      let collidingBlocks = [] ;
        let offsetX = 25;
        let playerRect ={ x:this.ScreenPosx+this.x_velocity,
                          y:this.ScreenPosy,
                          width:this.width,
                          height:this.height}

        hitBoxRect ={     x:playerRect.x+offsetX,
                          y:playerRect.y+20,
                          width:playerRect.width-offsetX*2,
                          height:playerRect.height-26}
       // ctx.fillStyle = 'orange';
       // ctx.fillRect(hitBoxRect.x,hitBoxRect.y,hitBoxRect.width,hitBoxRect.height);
  
        verticalRect        = hitBoxRect;
        verticalRect.y      = hitBoxRect.y-5;
        verticalRect.height = hitBoxRect.height+10;
       // ctx.fillStyle = 'blue';
        //ctx.fillRect(verticalRect.x,verticalRect.y,verticalRect.width,verticalRect.height);
        //horizontalRect        = hitBoxRect;
        horizontalRect ={     x:hitBoxRect.x-4,
                              y:hitBoxRect.y+5,
                              width:hitBoxRect.width+8,
                              height:hitBoxRect.height-15}
       // ctx.fillStyle = 'blue';
       // ctx.fillRect(horizontalRect.x,horizontalRect.y,horizontalRect.width,horizontalRect.height);

        //ctx.fillStyle = 'red';
       // ctx.fillRect(horizontalRect.x,horizontalRect.y,horizontalRect.width,horizontalRect.height);
        //console.log(playerRect.width);
        let curColliders = [];
        let collisionDatas= {'left':false,
                          'right':false,
                          'top':false,
                          'down':false}
        //for each collider in the map //
        for (let index = 0; index < levelTileMaps.length; index++) 
        {
          let curTile  = levelTileMaps[index];
          let tileRect ={ x:curTile.x,
                          y:curTile.y,
                          width:curTile.width,
                          height:curTile.height}
          
            
         // console.log("checking tile "+index+" at x= "+tileRect.y+" H= "+checkIsHorizontalCollision(horizontalRect,tileRect)+"  V= "+checkIsVerticalCollision(verticalRect,tileRect))
          //check if any collision with tileRect
          //if (checkIntersection())
          let nHorizontalCol = checkIsHorizontalCollision(horizontalRect,tileRect)
            //check if horizontal collision with tileRect
            if (nHorizontalCol=="right")
            {
              curColliders.push(curTile);
              hitBoxRect.x = tileRect.x-hitBoxRect.width-5+this.x_velocity*2;
              //hitBoxRect.x -= this.x_velocity;
              this.x_velocity = 0;
              collisionDatas.right=true;
              ctx.fillStyle = 'blue';
              ctx.fillRect(tileRect.x,tileRect.y,tileRect.width,tileRect.height);

            } 
            //if collide from the left
            else if (nHorizontalCol=="left")
            {
              if (nHorizontalCol=="left")
              {
                curColliders.push(curTile);
                hitBoxRect.x = tileRect.x+tileRect.width+5+this.x_velocity*2;
               // hitBoxRect.x -= this.x_velocity;
                this.x_velocity = 0;
                collisionDatas.left=true;
                ctx.fillStyle = 'pink';
                ctx.fillRect(tileRect.x,tileRect.y,tileRect.width,tileRect.height);
              }
            }
          //check if vertical collision with tileRect
            else if (checkIsVerticalCollision(verticalRect,tileRect)!=0)
            {
              //console.log('checkIsVerticalCollision down this.y_velocity '+checkIsVerticalCollision(verticalRect,tileRect));
                if (checkIsVerticalCollision(verticalRect,tileRect)==-1)
                {
                  collisionDatas.down=true;
                  hitBoxRect.y = tileRect.y-this.height;
                  ctx.fillStyle = 'red';
                  ctx.fillRect(tileRect.x,tileRect.y,tileRect.width,tileRect.height);
                }
                if (checkIsVerticalCollision(verticalRect,tileRect)==1)
                {
                  collisionDatas.up=true;
                  hitBoxRect.y = tileRect.y + tileRect.height;
                 // this.ScreenPosy = tileRect.y-this.height;
                  ctx.fillStyle = 'yellow';
                  ctx.fillRect(tileRect.x,tileRect.y,tileRect.width,tileRect.height);
                }
            }
          //  console.log("checking tile "+index+" at x= "+tileRect.y+" H= "+checkIsHorizontalCollision(horizontalRect,tileRect)+"  V= "+checkIsVerticalCollision(verticalRect,tileRect))
        }


        //End For Loop
        if (collisionDatas.up==true){
          this.y_velocity = 0;
        }
        if (collisionDatas.down==true){
          this.grounded =  true;
          this.airBorn = false; 
          this.y_velocity = 0;
          this.jumping = false;
        }else{
          this.grounded =  false;
          this.airBorn = true;
          this.y_velocity += this.friction;
          this.y_velocity += gravity;
          this.y_velocity = (this.y_velocity>this.y_velocityMax) ? this.y_velocity = this.y_velocityMax : this.y_velocity+=this.friction ;
        }

          hitBoxRect.x-= offsetX;
          this.ScreenPosx = Math.round( hitBoxRect.x) ;
        
        let i= 1;
        displayText('playerPos = '+this.ScreenPosx+'/'+this.ScreenPosy,20,25*i);i+=1;
        displayText( 'grounded = '+collisionDatas.down,20,25*i);i+=1;
        displayText('collisionDatas left = '+collisionDatas.left+'  right = '+collisionDatas.right,20,25*i);i+=1;
        //displayText(('under! = '+ (levelTileMaps[0].y-hitBoxRect.y+hitBoxRect.height)),20,25*i);i+=1;
        //displayText(('range! = '+ (hitBoxRect.x + hitBoxRect.width)+' >= '+levelTileMaps[0].x +' && '+ hitBoxRect.x+' <= '+(levelTileMaps[0].x+levelTileMaps[0].width)),20,25*i);i+=1;
        displayText(('fps! = '+ deltaTime),20,25*i);i+=1;
        //this.ScreenPosy = hitBoxRect.y-13;
        //console.log('collision collisionDirection  '+collisionDirection.x+" / "+collisionDirection.y);
      }

      this.gravity = function()
      {
        
        if (this.grounded){
          //this.y_velocity =0;
          if (this.jumping)
          {
            this.y_velocity += this.friction;
           // this.ScreenPosy += this.y_velocity;
            this.y_velocity = (this.y_velocity>this.y_velocityMax) ? this.y_velocity = this.y_velocityMax : this.y_velocity+=this.friction ;
          }
          else
          {
            this.y_velocity = 0;
          }
          
        }
        else
        {
          this.y_velocity += this.friction;
          //this.ScreenPosy += this.y_velocity;
          this.y_velocity = (this.y_velocity>this.y_velocityMax) ? this.y_velocity = this.y_velocityMax : this.y_velocity+=this.friction ;
        }
        
      }
      
    this.state = function(){
        
       // this.prevState = this.curState;
      if (!this.grounded )
      {
        if (this.prevState != 'fall')
            this.curState = 'fall';
      }
      else{
        if ( (this.prevx-this.ScreenPosx)!=0 || (this.prevy-this.ScreenPosy)!=0 )//|| (this.prevy-this.ScreenPosy)!=0)
        {
          if (this.prevState != 'run')
          {
            this.curState = 'run';
          }
        }else{
          if (this.prevState!='idle') 
          {
            this.curState = 'idle';
          }
        }
      }
        this.prevState = this.curState;
    }

      //Update Keys
      this.updateKeyDict = (ev) => {
        const k = ev.code;
        if (/^Arrow\w+/.test(k)) { // If is arrow
          ev.preventDefault();
          keyDict[k] = ev.type === "keydown"; // set boolean true / false
        }
      }

      this.update = () => {
        // Determine move distance to account diagonal move: 1/Math.sqrt(2) = ~0.707
        let dist =
          keyDict.ArrowUp   && (keyDict.ArrowLeft || keyDict.ArrowRight) ||
          keyDict.ArrowDown && (keyDict.ArrowLeft || keyDict.ArrowRight) ? 1.5 : 1;
          
        
        //store the last player position
        this.prevx = this.ScreenPosx;
        this.prevy = this.ScreenPosy;

        //update player Position
        if (keyDict.ArrowLeft)  
          { this.isFacingRight=false;this.x_velocity-=0.5;}
          if (keyDict.ArrowRight)  
          { this.isFacingRight=true;this.x_velocity+=0.5;}
  
        if (keyDict.ArrowUp )
        {
          if (this.grounded && !this.jumping)
          {
            this.y_velocity -= this.jumpForce;
            this.jumping = true;
          }
        }     
        //if (keyDict.ArrowDown)   this.ScreenPosy += dist;
        if (!keyDict.ArrowLeft && !keyDict.ArrowRight || (keyDict.ArrowLeft && keyDict.ArrowRight))
        {
          this.x_velocity = Math.abs( this.x_velocity ) < 0.2 ? this.x_velocity*=this.groundFriction : this.x_velocity=0;
        }
        

        //limit x speed to max value
        if (this.x_velocity>this.x_velocityMax)
        {this.x_velocity = this.x_velocityMax; }
        else if (this.x_velocity<(-this.x_velocityMax))
        {this.x_velocity = -this.x_velocityMax; }
        else{
         // console.log('this.x_velocity='+this.x_velocity+'  this.jumping='+this.jumping);
         // this.x_velocity+=this.friction;
        }
        dist *= this.x_velocity;
        this.ScreenPosx += dist;

        this.ScreenPosy +=  this.y_velocity;
        this.ScreenPosy = Math.round(this.ScreenPosy);
        //dist*= this.x_velocity;
       /* if (this.isFacingRight)
        this.ScreenPosx += dist;
        else{
          this.ScreenPosx -= dist;
        } */

        //console.log('this.isFacingRight '+this.isFacingRight+' x_velocity = '+this.x_velocity);
       // if (this.y_velocity>this.y_velocityMax){this.y_velocity = this.y_velocityMax; }
       // if (this.y_velocity<(-this.y_velocityMax)){this.y_velocity = -this.y_velocityMax; }
        //console.log(" this.x_velocity="+this.x_velocity);
      }

      this.move = function() {
        //console.log("move");
        
        if (this.ScreenPosx<limits.Xmin){this.ScreenPosx = limits.Xmin}
        if (this.ScreenPosx>limits.Xmax){this.ScreenPosx = limits.Xmax}
        if (this.ScreenPosy<limits.Ymin){this.ScreenPosy = limits.Ymin}
        if (this.ScreenPosy>limits.Ymax){this.ScreenPosy = limits.Ymax}
       // console.log(this.ScreenPosy);
        //this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
      }  

      this.draw = function() {
        this.step();
        
        //ctx.fillStyle = "green";
       // ctx.fillRect(this.ScreenPosx, this.ScreenPosy, this.width, this.height);
       //isFacingRight
        let atlasSrcCoord = animator(this.curState).atlasCoord;
        this.srcX = atlasSrcCoord.srcX;
        this.srcY = atlasSrcCoord.srcY;
        
        ctx.save();

      if (this.isFacingRight){
        //console.log(" this.isFacingRight="+this.isFacingRight);
        ctx.drawImage(spriteSheet, this.srcX, this.srcY, this.width, this.height, this.ScreenPosx, this.ScreenPosy, this.width, this.height);

      }else{
        ctx.scale(-1,1);
       // console.log(" this.isFacingRight="+this.isFacingRight);
        ctx.drawImage(spriteSheet, this.srcX+64, this.srcY, -64, this.height, -this.ScreenPosx, this.ScreenPosy,-64, this.height);
        }
        ctx.restore();
        //DEBUG
        if (this.debug)
        {
          //hitBox
          
          ctx.beginPath();
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(this.collider.x, this.collider.y, this.collider.width, this.collider.height);   
          
        }
      }

    }
      
    function boxCollision(r1,r2){
      if (r1.x >= r2.x + r2.width){ return false;}
      else if (r1.x + r1.width <= r2.x){ return false;}
      else if (r1.y >= r2.y + r2.height){ return false;}
      else if (r1.y + r1.height <= r2.y){ return false;}
      else { return true;}
    }
    
    function displayText(textToDisplay,x,y){
      //debugContent += textToDisplay;
      ctx.font = '28px serif';
      ctx.fillStyle = "black";
      ctx.fillText(textToDisplay, x, y);
    }