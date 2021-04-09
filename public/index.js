
function convertCords(oldVector){
  return oldVector.x +' ' + oldVector.z +' '+ -oldVector.y;
}

function getDotProducts(vectorA, vectorB){
  return  (vectorA[0] * vectorB[0]) + (vectorA[1] * vectorB[1]) + (vectorA[2] * vectorB[2]);
}

function distanceFromPoint(pointA, pointB){
  return  Math.sqrt((pointB[0] - pointA[0])**2 +  (pointB[1] - pointA[1])**2);
}

function SpawnObject(value){
  var newObj;
  switch(value){
    case 0:
      //rock
      newObj = document.createElement('a-entity');
      newObj.setAttribute('obj-model', {obj: 'assets/designRock_1.obj'})
      document.querySelector('a-scene').appendChild(newObj);
      console.log('test');
      break;
    case 1:
      //rock2
      newObj = document.createElement('a-entity');
      newObj.setAttribute('obj-model', {obj: 'assets/designRock_2.obj'})
      document.querySelector('a-scene').appendChild(newObj);
      break;
    case 2:
      //pineTree
      newObj = document.createElement('a-entity');
      newObj.setAttribute('obj-model', {obj: 'assets/pineTreeFinal.obj'})
      document.querySelector('a-scene').appendChild(newObj);
      break;
    case 3:
      //more trees
      newObj = document.createElement('a-entity');
      newObj.setAttribute('obj-model', {obj: 'assets/pineTreeFinal.obj'})
      newObj.setAttribute('scale', {property:'scale', to: '10 10 10'})
      document.querySelector('a-scene').appendChild(newObj);
      break;
    default:
      //empty space
      newObj = 'null'
      break;
  }
  return newObj
}

function getHeightData(img,scale) {

  if (scale == undefined) scale=1;
  
      var canvas = document.createElement( 'canvas' );
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext( '2d' );

      var size = img.width * img.height;
      var data = new Float32Array( size );

      context.drawImage(img,0,0);

      for ( var i = 0; i < size; i ++ ) {
          data[i] = 0
      }

      var imgd = context.getImageData(0, 0, img.width, img.height);
      var pix = imgd.data;

      var j=0;
      for (var i = 0; i<pix.length; i +=4) {
          var all = pix[i]+pix[i+1]+pix[i+2];
          data[j++] = all/(12*scale);
      }
      
      return data;
}
AFRAME.registerComponent('start-experience', {
    init: function () {
    //we can't play sound on some browsers until we have some user interaction
    //this means we should only start playing ambient music after this button is clicked
    
    
    
    console.log('scene loaded');

    document.querySelector('#height-map');

    
    }
});
AFRAME.registerComponent('ground-plane', {
  init: function () {
    //get height data from img
    var img = new Image();
    img.src='assets/Heightmap_100.jpg';
    var data = getHeightData(img);

    var envObj;
    //console.log('confirm');
    // plane
    var geometry = new THREE.PlaneGeometry(100,100,99,99);
    var material = new THREE.MeshStandardMaterial({
      color: 0x573B0C,
      roughness: 0.1,
      metalness:0.5,
      flatShading: true
      //wireframe: true
    });
    plane = new THREE.Mesh( geometry, material );

    //var minTest = 50;
    //set height of vertices
    for ( var i = 0; i<plane.geometry.vertices.length; i++ ) {
      plane.geometry.vertices[i].z = (data[i]*0.3);
      plane.geometry.vertices[i].y*=10;
      plane.geometry.vertices[i].x*=10;
      
      //this spawns objects
      envObj = SpawnObject(parseInt(Math.random()*70));
      if(!(envObj=='null')){
        envObj.setAttribute('position', convertCords(plane.geometry.vertices[i]));
        
      }
    }
    //var testBox1 = document.querySelector('#testBox1');
    //var testBox2 = document.querySelector('#testBox2');
    //var testBox3 = document.querySelector('#testBox3');
    //var testObj = document.querySelector('#testObj');



    this.el.setObject3D('mesh', plane);
    this.el.setAttribute('static-body');
    //testBox1.setAttribute('position', convertCords(plane.geometry.vertices[500]));
    //testObj.setAttribute('position', convertCords(plane.geometry.vertices[505]));
    //testBox2.setAttribute('position', convertCords(plane.geometry.vertices[5000]));
    //testBox3.setAttribute('position', convertCords(plane.geometry.vertices[8000]));
    
    //console.log(plane.geometry.vertices[500].x +' '+ plane.geometry.vertices[500].z  +' '+ plane.geometry.vertices[500].y);
    //console.log(testBox1.getAttribute('position'));
  },
});
//function called from user-gesture click
const startExperience = function() {
    //hide user-gesture overlay
            
    //start all ambient music
    const ambientSounds = document.querySelectorAll('.ambient-music');
    ambientSounds.forEach(function(soundEntity) {
    soundEntity.components.sound.playSound();
    });
}