
    // Clamp number between two values with the following line:
    const keyDict = {};
    const limits = {Xmin:10,Xmax:600,Ymin:10,Ymax:1000}
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
      this.friction = 0.2;
      this.groundFriction = 0.5;
      this.jumping = false;
      this.jumpForce = 6;
      this.gravity = 0.1;
      this.playerRect;
      this.tileRect;

      this.speed = 4;
      this.x_velocity = 0;
      this.x_velocityMax = 4;
      this.y_velocity = 0;
      this.y_velocityMax = 8;

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
     
      setInterval(step,1000/8);
      let atlasSrcCoord = animator('idle').atlasCoord;
      setupPlayer();

      function setupPlayer (){
        console.log("Setup Player ");
        this.collision= new hitbox(this.x,this.y,this.width,this.height);
      }
      //update Function
        this.step = function() {
        
        
        this.state();
        this.gravity();
        this.collision();
        

        this.move();
        this.update();
      }

      this.collision = function(){
      let collisionDirection = {'x':0,'y':0};
       let playerRect ={'x':this.ScreenPosx,
       'y':this.ScreenPosy,
       'width':this.width,
       'height':this.height}

       console.log('Start collision Loop '+collisionDirection.x+'/'+collisionDirection.y);
//for each collider in the map
        for (let index = 0; index < levelTileMaps.length; index++) {
          let curTile = levelTileMaps[index];
          //console.log('boxCollision = '+ collider.hitbox.rect );//"+this.curTile.hitbox );
         // console.log('boxCollision = '+ boxCollision(this.collider,this.curTile.hitbox) );
          let deltaX = 0;
          let deltaY = 0;
          let tileRect ={'x':curTile.x,
                            'y':curTile.y,
                            'width':curTile.width,
                            'height':curTile.height}

          //let tileRect    = new rect(curTile.x,curTile.y,curTile.width,curTile.height);
          if (checkIntersection( playerRect,tileRect))
          {
            let groundCheck = checkIsGrounded(playerRect,tileRect);
            if (Math.abs(groundCheck) >0){
              collisionDirection.y = groundCheck;
              curTile.color = '#cc8539';
            } 
            
            let isHorizontalCollision = checkIsHorizontalCollision(playerRect,tileRect);
            if (Math.abs(isHorizontalCollision)  != 0) {collisionDirection.x =isHorizontalCollision; }


            console.log('collision collisionDirection  '+collisionDirection.x+" / "+collisionDirection.y);



            //si l'objet est plus bas et que sla position de player est compris dans la largeur
            //if player is above the tile
            if (tileRect.y<playerRect.y+playerRect.height)
            {
              //if player is in the range of the tile width
              if (playerRect.x+playerRect.width>tileRect.x && playerRect.x<tileRect.x+tileRect.width){
               // console.log('collision Ground touch '+(playerRect.y+playerRect.height-tileRect.y));
              }else{
               // console.log('collision wall touch');
              }
            }
            else{
              //if not above the tile is it a wall?
              //
            }
            console.log(playerRect.x+playerRect.width-tileRect.x);
            console.log("this.collision="+checkIntersection( playerRect,tileRect));
          }
          //if player bounds collide with a listed collider
          if (//checkIntersection(this.collision,curTile))/*
            this.ScreenPosx <= curTile.x + curTile.width &&
            this.ScreenPosx + this.width >= curTile.x &&
            this.ScreenPosy <= curTile.y + this.height &&
            this.ScreenPosy + this.height >= curTile.y
          ) {
            deltaX =  this.ScreenPosx-curTile.x + curTile.width;
            deltaY =  this.ScreenPosy - curTile.y + this.height;
            
            //if touch collider but not grounded yet
            if (this.ScreenPosy+this.height>curTile.y )
            {
              if(this.jumping && this.y_velocity<0){
                this.grounded   = false;
               // this.jumping = false;
                }else{
                this.grounded   = true;
                this.jumping = false;
              }
              //console.log('init jump ungrounded !'+ this.grounded );
              
             // this.ScreenPosy =  curTile.y-this.height;
              break;
              
            }
          }
          //else Check Last ground status
          else
          {
            this.grounded = false;
          }
        }
      }

      this.gravity = function()
      {
        
        if (this.grounded){
          //this.y_velocity =0;
          if (this.jumping)
          {
            this.y_velocity += this.friction;
            this.ScreenPosy += this.y_velocity;
            this.y_velocity = (this.y_velocity>this.y_velocityMax) ? this.y_velocity = this.y_velocityMax : this.y_velocity+=this.friction ;
          }
          else
          {
            this.y_velocity = 0;
          }
          this.ScreenPosy += this.y_velocity;
        }
        else
        {
          this.y_velocity += this.friction;
          this.ScreenPosy += this.y_velocity;
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
          keyDict.ArrowDown && (keyDict.ArrowLeft || keyDict.ArrowRight) ? 1 : 1;
          
        dist *= this.x_velocity;
        //store the last player position
        this.prevx = this.ScreenPosx;
        this.prevy = this.ScreenPosy;

        //update player Position
        if (keyDict.ArrowLeft)  
          {this.ScreenPosx -= dist; this.isFacingRight=false;this.x_velocity+=0.5;}
        if (keyDict.ArrowUp )
        {
          if (this.grounded && !this.jumping)
          {
            //this.grounded = false;
            this.y_velocity -= this.jumpForce;
            this.jumping = true;
          }
        }     
        if (keyDict.ArrowRight)  {this.ScreenPosx += dist; this.isFacingRight=true;this.x_velocity+=0.5;}
        if (keyDict.ArrowDown)   this.ScreenPosy += dist;
        if (!keyDict.ArrowLeft && !keyDict.ArrowRight){
          this.x_velocity =this.x_velocity>0?this.x_velocity-=this.groundFriction:this.x_velocity=0;
          //dist*= this.x_velocity;
          if (this.isFacingRight)
          this.ScreenPosx += dist;
          else{
            this.ScreenPosx -= dist;
          } 
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
        //ctx.fillRect(this.ScreenPosx, this.ScreenPosy, this.width, this.height);
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
    

  
    /*
    function engine() {
      update();
      window.requestAnimationFrame(engine);*/
    
    
    
    