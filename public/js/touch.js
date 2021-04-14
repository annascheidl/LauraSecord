
/*AFRAME.registerComponent('cursor-listener', {
    init: function() {
        var gameEnd = false;

    },
    tick: function () {
      
      this.el.addEventListener('click', function (evt) {
        
        console.log('I was clicked at ');
        gameEnd = true;
        
        gameEnding(gameEnd)

      });
    }
  });

function gameEnding(gameEnd){
    if (gameEnd==true) {
        console.log('I was reset');
        window.location.replace("/homepage.html");

    }
}
*/

let socket = io();

socket.on('connect', (data) => {
    document.querySelector('#interactive').addEventListener('click', function() {
       socket.emit('true'); 
    });

    socket.on('game_end', data=> {
        if (data==true) {
            window.location.replace("/homepage.html");
    }})
})