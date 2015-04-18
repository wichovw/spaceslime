define(['./variables'], function (vars) {
  //A set of methods to control position
  return {
    changeBallPosition : function changeBallPosition() {
      vars.ball.x += vars.ball.x_vel;
      vars.ball.y += vars.ball.y_vel;
      vars.ball.y_vel += vars.gravity;
    },
    changeSlimesPosition: function changeSlimesPosition() {
      vars.slime1.x += vars.slime1.x_vel;
      vars.slime1.y += vars.slime1.y_vel;
      vars.slime1.y_vel = vars.slime1.y > 0 ? vars.slime1.y_vel + vars.gravity : 0;
    },
    detectCollision: function detectCollision() {
      var d1 = Math.pow(vars.ball.x - vars.slime1.x, 2) + Math.pow(vars.ball.y - vars.slime1.y, 2);
      if (d1 <= vars.collide) {
        vars.ball.x_vel = (vars.ball.x - vars.slime1.x) * vars.force_factor;
        vars.ball.y_vel = (vars.ball.y - vars.slime1.y + vars.slime1.y_vel) * vars.force_factor;
      }
    },
    renderBallAndSlimes: function renderBallAndSlimes(ball, slime2) {
      ball.position.z = vars.ball.x;
      ball.position.y = vars.ball.y;
      slime2.position.z = vars.slime1.x;
      slime2.position.y = vars.slime1.y;
    },
    toDoEachFrame: function toDoEachFrame(ball, slime2) {
      this.detectCollision();
      this.changeBallPosition();
      this.changeSlimesPosition();
      this.renderBallAndSlimes(ball, slime2);
    }
  };
});