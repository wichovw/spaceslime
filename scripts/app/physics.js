define(['./variables'], function (vars) {
  //A set of methods to control position
  return {
    changeBallPosition : function changeBallPosition() {
      vars.ball.x += vars.ball.x_vel;
      vars.ball.y += vars.ball.y_vel;
      vars.ball.y_vel += vars.gravity;
    },
    changeSlimePosition: function changeSlimePosition() {
      vars.slime1.x += vars.slime1.x_vel;
      vars.slime1.y += vars.slime1.y_vel;
      if (vars.slime1.y > 0) vars.slime1.y_vel += vars.gravity;
      else {
        vars.slime1.y_vel = 0;
        vars.slime1.y = 0;
        if (Math.abs(vars.slime1.x_vel) > 0) vars.slime1.x_vel -= vars.friction * vars.slime1.dir;
      }
    },
    detectCollision: function detectCollision() {
      var d1 = Math.pow(vars.ball.x - vars.slime1.x, 2) + Math.pow(vars.ball.y - vars.slime1.y, 2);
      if (d1 <= vars.collide) {
        vars.ball.x_vel = (vars.ball.x - vars.slime1.x) * vars.force_factor;
        vars.ball.y_vel = (vars.ball.y - vars.slime1.y + vars.slime1.y_vel) * vars.force_factor;
      }
    },
    renderObject: function renderObject(obj, logical) {
      obj.position.z = logical.x;
      obj.position.y = logical.y;
    },
    toDoEachFrame: function toDoEachFrame(ball, slime1, slime2) {
      this.detectCollision();
      this.changeBallPosition();
      this.changeSlimePosition();
      this.renderObject(ball, vars.ball);
      this.renderObject(slime1, vars.slime1);
      this.renderObject(slime2, vars.slime2);
    }
  };
});