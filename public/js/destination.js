AFRAME.registerComponent('destination', {
    schema: {
    },
    multiple: false, //do not allow multiple instances of this component on this entity
    init: function() {
      
      const Context_AF = this;
      
      //let's add the basic animation to teh walls entity
      //note that it is not enabled initially
      
      //listen on click
      Context_AF.el.addEventListener('click', function() {
        location.reload()
      });
    },
    

  });
  