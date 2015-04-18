define(['./opts', './utils', 'color'], function(opts, utils, Color){
  
  //We'll use websockets here to construct and object
  
  //Computed properties
  var skyTop = Color("#a61cfd");
  var skyBottom = Color("#fd951c");
  
  var vars = {
    gravity : -1,
    friction : -1,
    slime_r2 : Math.pow(150, 2),
    ball_r2 : Math.pow(50, 2),
    collide : this.slime_r2 + this.ball_r2,
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
      y_vel: 0
    }
  }
  console.log(vars);
  
//  setInterval(function () {
//    
//  }, 3000);
  
//  var socket = new WebSocket(opts.socketurl);
//
//  // On Message Receive
//  socket.onmessage = function(evt) {
//      console.log('socket receive');
//      console.log(evt.data);
//      alert("FUCK");
//  }
//
//  // On Socket Close
//  socket.onclose = function() {
//      console.log('socket closed');
//    alert("DAMN!");
//  }
//
//  // On Error
//  socket.onerror = function() {
//      console.log('socket error');
//  }
//
//  // On Connection Establish
//  socket.onopen = function(evt) {
//      console.log('socket open');
//      alert("FUQ!");
//      // Send a Message!
//      socket.send('hello world!');
//  }
//
//  // On Send Complete
//  socket.onsend = function(evt) {
//      console.log('socket send');
//      console.log(evt);
//  }
  
  
  return vars;
});