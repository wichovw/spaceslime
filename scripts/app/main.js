define(['./animate', './variables', 'jquery', './opts'], function (animation, vars, $, opts) {
  //Set basic event
  $(document.documentElement).keydown(function(e) {
    if (e.keyCode === 37) { 
      vars.slime1.x_vel += vars.slime1.x_vel <= 20 ? 10 : 0;
    }
    else if (e.keyCode === 39) { 
      vars.slime1.x_vel -= vars.slime1.x_vel >= -20 ? 10 : 0;
    }
    else if (e.keyCode === 38 || e.keyCode === 32) { 
      vars.slime1.y_vel += vars.slime1.y_vel <= 20 ? vars.slime1.y <= opts.slime_max_jump ? 20 : 0 : 0;
    }
    else return;
    vars.slime1.dir = vars.slime1.x_vel >= 0 ? 1 : -1;
    e.preventDefault();
  });
  
  //Run animate
  animation.animate();
  
  //Insert into body
  document.body.appendChild( animation.renderer.domElement);
});