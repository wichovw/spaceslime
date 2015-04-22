define(['./animate', './variables', 'jquery', './opts'], function (animation, vars, $, opts) {
  //Set basic event
  $(document.documentElement).keydown(function(e) {

    if (!vars.playing) return;
      
    if (e.keyCode === 37) { 
      var x_vel = vars.slime1.x_vel <= 20 ? 10 : 0;
      vars.slime1.x_vel += x_vel;
    }
    else if (e.keyCode === 39) { 
      var x_vel = vars.slime1.x_vel >= -20 ? 10 : 0;
      vars.slime1.x_vel += -x_vel;
    }
    else if (e.keyCode === 38 || e.keyCode === 32) { 
      var y_vel = vars.slime1.y_vel <= 20 ? vars.slime1.y <= opts.slime_max_jump ? 20 : 0 : 0;
      vars.slime1.y_vel += y_vel
    }
    else return;
    var message = {type:1, x:vars.slime1.x, y:vars.slime1.y, x_vel:vars.slime1.x_vel, y_vel:vars.slime1.y_vel};
    vars.socket.send(JSON.stringify(message));
    vars.slime1.dir = vars.slime1.x_vel >= 0 ? 1 : -1;
    e.preventDefault();
  });
  
  //Run animate
  animation.animate();
  
  //Insert into body
  document.body.appendChild( animation.renderer.domElement);
});