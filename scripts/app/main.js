define(['./animate', './variables', 'jquery', './opts'], function (animation, vars, $, opts) {
  //Set basic event
  $(document.documentElement).keydown(function(e) {
		
		var y_vel = 10
    if (e.keyCode === 37) { 
      var x_vel = vars.slime1.x_vel <= 20 ? 10 : 0;
      vars.slime1.x_vel += x_vel
			var message = {type:0,data:-x_vel}
			vars.socket.send(message);
    }
    else if (e.keyCode === 39) { 
      var x_vel = vars.slime1.x_vel >= -20 ? 10 : 0;
      vars.slime1.x_vel += -x_vel
			$.get("action",{type:0,data:-x_vel},function(data){
				alert(data);
			});
    }
    else if (e.keyCode === 38 || e.keyCode === 32) { 
			var y_vel = vars.slime1.y_vel <= 20 ? vars.slime1.y <= opts.slime_max_jump ? 20 : 0 : 0;
      vars.slime1.y_vel += y_vel
			$.get("action",{type:1,data:y_vel},function(data){
				alert(data);
			});
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