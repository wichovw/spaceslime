define(['./variables', './opts', './scene'], function (vars, opts, scene) {
  //A set of methods to control position
  return {
    changeBallPosition : function changeBallPosition() {
      vars.ball.x += vars.ball.x_vel;
      vars.ball.y += vars.ball.y_vel;
      vars.ball.y_vel += vars.gravity;
    },
    changeSlimePosition: function changeSlimePosition(slime) {
      slime.x += slime.x_vel;
      slime.y += slime.y_vel;
      if (slime.y > 0) slime.y_vel += vars.gravity;
      else {
        slime.y_vel = 0;
        slime.y = 0;
        if (Math.abs(slime.x_vel) > 0) slime.x_vel -= vars.friction * slime.dir;
      }
      if (Math.abs(slime.x) >= Math.abs(slime.max_x)){
        slime.x_vel = 0;
        slime.x = slime.max_x;
      }
      else if (Math.abs(slime.x) <= Math.abs(slime.min_x)){
        slime.x_vel = 0;
        slime.x = slime.min_x;
      }
    },
    detectCollision: function detectCollision() {
      var d2 = Math.pow(vars.ball.x - vars.slime1.x, 2) + Math.pow(vars.ball.y - vars.slime1.y, 2);
      if (d2 <= vars.calcs.collide_d2) {
        vars.ball.x_vel = (vars.ball.x - vars.slime1.x) * vars.force_factor;
        vars.ball.y_vel = (vars.ball.y - vars.slime1.y + vars.slime1.y_vel) * vars.force_factor;
        vars.ball.touched_by = 1;
        vars.socket.send(JSON.stringify({type:2, x:vars.ball.x, y:vars.ball.y, x_vel:vars.ball.x_vel, y_vel:vars.ball.y_vel}));
      }
      if (vars.ball.x > 0) {
        if (vars.ball.x >= vars.calcs.ball_max_x){
          vars.ball.x_vel *= -1;
          vars.ball.x = vars.calcs.ball_max_x;
          vars.socket.send(JSON.stringify({type:0, x:vars.ball.x, y:vars.ball.y, x_vel:vars.ball.x_vel, y_vel:vars.ball.y_vel}));
        }
        else if (vars.ball.y <= vars.calcs.net_height && vars.ball.x <= vars.calcs.ball_min_x){
          if (vars.ball.y >= opts.court.net) vars.ball.y_vel = Math.abs(vars.ball.y_vel);
          if (vars.ball.x >= opts.court.line) vars.ball.x_vel *= -1;
          vars.socket.send(JSON.stringify({type:2, x:vars.ball.x, y:vars.ball.y, x_vel:vars.ball.x_vel, y_vel:vars.ball.y_vel}));
        }
        if (vars.ball.y <= opts.ball_radius){
          vars.ball.y_vel = Math.abs(vars.ball.y_vel)*0.9;
          vars.socket.send(JSON.stringify({type:2, x:vars.ball.x, y:vars.ball.y, x_vel:vars.ball.x_vel, y_vel:vars.ball.y_vel}));
        }
      }
      if (vars.ball.y <= opts.ball_radius && vars.ball.x > 0){ 
				vars.ball.y_vel = Math.abs(vars.ball.y_vel)*0.9;
				if(vars.ball.x<0){
					if(vars.slime2.powerups.shield)//if has powerup shield
						vars.slime2.powerups.shield=false;
					else{
						vars.slime1.score++;
						resetGame(true);
					}
				}
				else{
					if(vars.slime1.powerups.shield)//if has powerup shield
						vars.slime1.powerups.shield = true;
					else{
						vars.slime2.score++;
						resetGame(true);
					}
				}
					
				// alert(vars.slime1.score+"-"+vars.slime2.score);
				
			}
			
			d2 = Math.pow(vars.ball.x - vars.powerupo.x, 2) + Math.pow(vars.ball.y - vars.powerupo.y, 2);
      if (d2 <= vars.calcs.powerup_d2 && vars.ball.touched_by == 1) {
//        alert(vars.powerup);
//        alert(vars.ball.touched_by);
        if(vars.powerup == 1){
          vars.slime1.powerups.shield = true;
          vars.socket.send(JSON.stringify({type:8, data:1}));
        }
        vars.powerup = 0;
        scene.removePowerup();
      }
    },
    renderObject: function renderObject(obj, logical) {
      obj.position.z = logical.x;
      obj.position.y = logical.y;
    },
    toDoEachFrame: function toDoEachFrame(ball, slime1, slime2) {
      this.detectCollision();
      this.changeBallPosition();
      this.changeSlimePosition(vars.slime1);
      this.changeSlimePosition(vars.slime2);
      this.renderObject(ball, vars.ball);
      this.renderObject(slime1, vars.slime1);
      this.renderObject(slime2, vars.slime2);
    }
  };
});