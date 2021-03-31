
function convertCords(oldVector){
    return oldVector.x +' ' + oldVector.z +' '+ -oldVector.y;
  }

  function SpawnObject(value){
    var newObj;
    switch(value){
      case 0:
        //box
        newObj = document.createElement('a-entity');
        newObj.setAttribute('designRock_1', '\assets/designRock_1.obj')
        break;
      case 1:
        //sphere
        newObj = document.createElement('a-sphere');
        break;
      case 2:
        //cylinder
        newObj = document.createElement('a-cylinder');
        break;
      case 3:
        //torus
        newObj = document.createElement('a-torus');
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
      document.querySelector('#loading-animation').style.display='none';
      document.querySelector('#user-gesture-button').style.display='block';

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
        color: 0xE50096,
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
          document.querySelector('a-scene').appendChild(envObj);
          envObj.addEventListener('loaded', function () {
            console.log('envObj attached');
          });
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
      document.querySelector('#user-gesture-overlay').style.display='none';
              
      //start all ambient music
      const ambientSounds = document.querySelectorAll('.ambient-music');
      ambientSounds.forEach(function(soundEntity) {
      soundEntity.components.sound.playSound();
      });
  }