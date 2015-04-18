define(['./animate', './variables', 'jquery'], function (animation, vars, $) {
  //Set basic event
  $(document.documentElement).keyup(function(e) {
    if (e.keyCode === 65) { // A
      vars.slime1.x_vel += 10;
    }
    else if (e.keyCode === 68) { // D
      vars.slime1.x_vel -= 10;
    }
    else if (e.keyCode === 87) { // W
      vars.slime1.y_vel += 10;
    }
  });
  
  //Run animate
  animation.animate;
  
  //Insert into body
  document.body.appendChild( animation.renderer.domElement);
});