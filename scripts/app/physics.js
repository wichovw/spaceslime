define(['./variables', './opts'], function (vars, opts) {
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
      }
      var abs_ball_x = Math.abs(vars.ball.x);
      if (abs_ball_x >= vars.calcs.ball_max_x) vars.ball.x_vel *= -1;
      else if (vars.ball.y <= vars.calcs.net_height && abs_ball_x <= vars.calcs.ball_min_x){
        if (vars.ball.y >= opts.court.net) vars.ball.y_vel = Math.abs(vars.ball.y_vel);
        if (abs_ball_x >= opts.court.line) vars.ball.x_vel *= -1;
      }
      if (vars.ball.y <= opts.ball_radius){ 
				vars.ball.y_vel = Math.abs(vars.ball.y_vel)*0.9;
				if(vars.ball.x<0){
					if(vars.slime2.shield>0)//if has powerup shield
						vars.slime2.shield--;
					else{
						vars.slime1.score++;
						resetGame();
					}
				}
				else{
					if(vars.slime1.shield>0)//if has powerup shield
						vars.slime1.shield--;
					else{
						vars.slime2.score++;
						resetGame();
					}
				}
					
				// alert(vars.slime1.score+"-"+vars.slime2.score);
				
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