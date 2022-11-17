

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

function checkIsGrounded(object1,object2){
  if (object1.y+ object1.height >= object2.y  )
  {
    return -1;
  }
  else   if (object1.y >= object2.y+object2.height  )
  {
    return 1;
  }

  else{
    return 0;
  }
}
function checkIsHorizontalCollision(object1,object2){
  //si il touche la droite de l'objet
  if (object1.y+object1.height>object2.y && object1.y<object2.y+object2.height)
  {
    if (object1.x + object1.width >= object2.x &&
      object1.x <= object2.x)
    {
      return -1;
      //console.log("checkIsHorizontal Left")
    }
    if (object1.x + object1.width >= object2.x+object2.width &&
      object1.x <= object2.x+object2.width)
    {
      return 1;
      //console.log("checkIsHorizontal right")
    } 
    
  }else{ return 0;}
}  
/*
  else if (object1.x <= object2.x + object2.width  && object1.x + object1.width >= object2.x + object2.width )
  {
    return -1;
  }
  else if (object1.y + object1.height <= object2.x + object2.width )
  {
    return 2;
  }
  else if (object1.x <= object2.x + object2.width )
  {
    return 3;*/
 // }

