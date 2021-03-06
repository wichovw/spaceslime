define(['./opts', './utils', 'color','./scene'], function(opts, utils, Color,scene){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skyTop = Color("#a61cfd");
  var skyBottom = Color("#fd951c");
  
  var vars = {
    playerNo : 0,
    playing: false,
    gravity : 0,
    friction : 1,
    force_factor : 0.2,
		powerup: 0,
    ball: {
      x: 600,
      y: 800,
      x_vel: 0,
      y_vel: 0,
      touched_by: 0
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
      powerups: {
        shield: false,
        sick: false,
        extra: false
      }
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
      powerups: {
        shield: false,
        sick: false,
        extra: false

      }
    },
    calcs: {
      ball_max_x: opts.court.long - opts.ball_radius,
      ball_min_x: opts.court.line/2 + opts.ball_radius,
      net_height: opts.court.net + opts.ball_radius,
      slime_r2: Math.pow(opts.slimes_radius, 2),
      ball_r2: Math.pow(opts.ball_radius, 2),
      collide_d2: 0,
      powerup_d2: 0
    },
		powerupo: {
			x: 0,
			y: 500
		}
  }
  vars.calcs.collide_d2 = vars.calcs.ball_r2 + vars.calcs.slime_r2;
  vars.calcs.powerup_d2 = vars.calcs.ball_r2 + 50;
  console.log(vars);
	
  vars.socket = new WebSocket(opts.socketurl);
	vars.socket.onopen = function(evt) {
      // alert("Connection status: Connected!")
    };
		
    vars.socket.onmessage = function(evt) {
      console.log( "Server: " + evt.data);
      data = JSON.parse(evt.data);
      if (data.type == 3){
        // joined game
        if (data.players == 2)
          vars.ball.x = -600;
        else if (data.players > 2){
          alert("Sólo pueden jugar dos");
          vars.gravity = -0.5;
        }
      }
      else if (data.type == 4){
        // game start
        vars.gravity = -0.5;
        vars.playing = true;
      }
      else if (data.type == 5){
        vars.ball.x_vel = 0;
        vars.ball.x = data.point;
        resetGame(false);
      }
      else if (data.type == 1){
        vars.slime2.x = -data.x;
        vars.slime2.y = data.y;
        vars.slime2.x_vel = -data.x_vel;
        vars.slime2.y_vel = data.y_vel;
        vars.slime2.dir = vars.slime2.x_vel >= 0 ? 1 : -1;
      }
      else if (data.type == 2 || data.type == 0){
        vars.ball.x = -data.x;
        vars.ball.y = data.y;
        vars.ball.x_vel = -data.x_vel;
        vars.ball.y_vel = data.y_vel;
        if(data.type==0)
          vars.ball.touched_by = -1;
      }
			else if(data.type == 9 ){
				if(vars.powerup==0){//check if there is already a power in the game
					
					scene.showPowerup(data.data,0,500);
					vars.powerup = data.data;
				} 
			}
      else if (data.type == 8){
        if (data.data == 1)
          vars.slime2.powerups.shield = true;
        vars.powerup = 0;
        scene.removePowerup();
      }
		else if (data.type == 10){
			if (data.data == 1)
				vars.slime2.powerups.shield = false;
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
  

 resetGame = function(won){
		vars.gravity = -0.5;
		vars.friction = 1;
		vars.force_factor = 0.2;
   
        var point = vars.ball.x > 0 ? -1 : 1;
//        if (point == 1){
//          alert("GANASTE!");
//        }
//        if (point == -1){
//          alert("PERDISTE, MULA!");
//        }
   
        if (won){
          vars.socket.send(JSON.stringify({type:5, point:point}));
        }
   
		vars.ball.x= 600*point;
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