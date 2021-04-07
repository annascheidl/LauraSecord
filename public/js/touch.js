AFRAME.registerComponent('destination-click', {
    schema: {
        duration: {type: 'int', default: 20000}
    },
    
       

    init: function() {
        var endGame = false;
        console.log("Function has occurred");
        const CONTEXT_AF= this;
        CONTEXT_AF.destination = document.querySelector('#destination-sphere')

        if (endGame = true) {
            endGame = false;
        }
       
        CONTEXT_AF.el.addEventListener('click', function() {
            var endGame = true;
            console.log("Function worked");
        })

    }

})
