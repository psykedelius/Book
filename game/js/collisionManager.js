

function checkIntersection(object1,object2){
    if (
        object1.x <= object2.x + object2.width &&
        object1.x + object1.width >= object2.x &&
        object1.y <= object2.y + object1.height &&
        object1.y + object1.height >= object2.y
      ) 
      {return true;}
      else{return false;}

}

function checkIsHorizontalCollision(object1,object2){
  //si il touche la droite de l'objet
  if ((object1.y<object2.y+object2.height && object1.y+object1.height>object2.y ))
  {
    
    if (object1.x  <= object2.x+object1.width && 
        object1.x + object1.width >= object2.x )
    {
      return "right";
    }
    else if (object1.x + object1.width >= object2.x+object2.width &&
      object1.x <= object2.x+object2.width)
    {
      return "left";
    } 
    else{return "none";}
  }else{ return "none";}
}  

function checkIsVerticalCollision(object1,object2){
  //if object1 is in object2.width range
  if (object1.x+object1.width >=object2.x && object1.x<=object2.x+object2.width)
  {
    //if object1 is over
    if (object1.y <= object2.y && object1.y+object1.height >= object2.y)
    {return -1;}
    //if object1 is under
    else if (object1.y <= object2.y+object2.height && 
             object1.y+object1.height/2 >= object2.y+object2.height)
    {return 1;}
    else
    {return 0;}
  }
  else
  { return 0;}
}  


