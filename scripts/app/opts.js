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
  // web socket
  socketurl: 'ws://localhost:9999/ws',
  skybox: {
    prefix: "images/mainframe_",
    extension: ".jpg",
    directions: ["ft", "bk", "up", "dn", "rt", "lf"]
    // ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  }
  
});