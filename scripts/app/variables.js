define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skyTop = Color("#a61cfd");
  var skyBottom = Color("#fd951c");
  
  var vars = {
    gravity : -0.5,
    friction : 1,
    force_factor : 0.2,
    ball: {
      x: 600,
      y: 800,
      x_vel: 0,
      y_vel: 0
    },
    slime1: {
      x: 600,
      y: 0,
      x_vel: 0,
      y_vel: 0,
      dir: 0,
			score:0,
      max_x: opts.court.long - opts.slimes_radius,
      min_x: opts.court.line/2 + opts.slimes_radius,
    },
    slime2: {
      x: -600,
      y: 0,
      x_vel: 0,
      y_vel: 0,
      dir: 0,
			score:0,
      max_x: - opts.court.long + opts.slimes_radius,
      min_x: - opts.court.line/2 - opts.slimes_radius,
    },
    calcs: {
      ball_max_x: opts.court.long - opts.ball_radius,
      ball_min_x: opts.court.line/2 + opts.ball_radius,
      net_height: opts.court.net + opts.ball_radius,
      slime_r2: Math.pow(opts.slimes_radius, 2),
      ball_r2: Math.pow(opts.ball_radius, 2),
      collide_d2: 0
    }
		
  }
  vars.calcs.collide_d2 = vars.calcs.ball_r2 + vars.calcs.slime_r2;
  console.log(vars);
	
  vars.socket = new WebSocket(opts.socketurl);
	vars.socket.onopen = function(evt) {
      // alert("Connection status: Connected!")
    };
    vars.socket.onmessage = function(evt) {
      console.log( "Server: " + evt.data);
      data = JSON.parse(evt.data);
      if (data.type == 0){
        vars.slime2.x_vel -= data.data;
        vars.slime2.dir = vars.slime2.x_vel >= 0 ? 1 : -1;
      }
      else if (data.type == 1){
        vars.slime2.y_vel += data.data;
      }
//      console.log(vars.slime1);
//      console.log(vars.slime2);
    };
    vars.socket.onclose = function(evt) {
      alert ("Connection closed");
    };
	 vars.socket.onerror = function() {
		 console.log('socket error');
	 }
	 
	 vars.socket.onsend = function(evt) {
			 console.log('socket send');
			 console.log(evt);
	 }
//  setInterval(function () {
//    
//  }, 3000);
  

 resetGame = function(){
			vars.gravity = -0.5;
			vars.friction = 1;
			vars.force_factor = 0.2;
			
				vars.ball.x= 600;
				vars.ball.y= 800;
				vars.ball.x_vel= 0;
				vars.ball.y_vel= 0;
			
			
				vars.slime1.x= 600;
				vars.slime1.y= 0;
				vars.slime1.x_vel= 0;
				vars.slime1.y_vel= 0;
				vars.slime1.dir= 0;
			
			vars.slime2.x= -600;
				vars.slime2.y= 0;
				vars.slime2.x_vel= 0;
				vars.slime2.y_vel= 0;
				vars.slime2.dir= 0;
		
 }
  return vars;
});