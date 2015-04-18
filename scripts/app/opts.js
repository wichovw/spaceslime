define({
  // scene
  swidth: window.innerWidth,
  sheight: window.innerHeight,
  near: 1,
  far: 9000,
  // court
  court: {
    long: 1300,
    wide: 1200,
    line: 50,
    net: 250,
    walls: 1000
  },
  slimes_radius: 150,
  ball_radius: 50,
  // web socket
  socketurl: 'ws://localhost:9999/ws'
});