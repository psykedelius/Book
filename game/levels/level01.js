(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level01",
{ "compressionlevel":-1,
 "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[19, 19, 19, 19, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 27,
            19, 19, 19, 7, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58,
            19, 19, 19, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 70, 71, 0, 0, 0, 58,
            19, 19, 7, 78, 70, 71, 0, 0, 69, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58,
            36, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 0, 58,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 55, 0, 0, 0, 0, 0, 0, 58,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 34,
            2, 2, 2, 2, 3, 0, 0, 1, 2, 2, 2, 82, 0, 0, 0, 0, 0, 0, 0, 58,
            19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 20, 0, 0, 0, 73, 0, 0, 67, 65,
            19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 20, 0, 0, 0, 0, 0, 0, 84, 27],
         "height":10,
         "id":1,
         "name":"Calque de Tuiles 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"left-up",
 "tiledversion":"1.9.2",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/Game\/tiled\/terrain.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.9",
 "width":20
});