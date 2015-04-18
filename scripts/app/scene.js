define(["OrbitControls", "./opts"], function(THREE, opts){
  var scene, camera, renderer;
  //Set up scene
  scene = new THREE.Scene();
  
  //Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(opts.swidth, opts.sheight);
  
  //Set up camera
  camera = new THREE.PerspectiveCamera(45, (opts.swidth / opts.sheight), opts.near, opts.far*1.5);
  camera.position.set(2500, 500, 0);
  camera.rotation.set(0, Math.PI/2, 0);
  scene.add(camera);
  
  //Set up fog
  var fog =  new THREE.Fog( 0xd0eaff, 1, opts.far*.70);
  scene.fog = fog;

  
  //Set up lights
  var lights = {
    ambient: new THREE.AmbientLight(0x020202),
    front: new THREE.DirectionalLight('white', 0.3),
    back: new THREE.DirectionalLight('white', 0.2),
    hemisphere: new THREE.HemisphereLight(0xE3F4FF, 0xBCE1F9, 1.001)
  }
  //Add ambient
  scene.add(lights.ambient);
  
  //Add a light in front
  lights.front.position.set(5, 5, 20);
  scene.add(lights.front);
  
  // add a light back
  lights.back.position.set(0, 10, -20)
  scene.add(lights.back);
  
  // add a light in sky
  lights.hemisphere.position.set(0, 500, 500);
  scene.add(lights.hemisphere);
  
  //Set up ground
  var material = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});
  var geometry = new THREE.PlaneBufferGeometry(opts.far, opts.far);
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI/2;
  scene.add( plane );

  var material = new THREE.MeshPhongMaterial({color: 0xffffff});
  var geometry = new THREE.PlaneBufferGeometry(opts.court.wide, opts.court.long*2);
  var line = new THREE.Mesh( geometry, material );
  line.rotation.x = -Math.PI/2;
  line.position.y = 0.5;
  scene.add( line );

  var material = new THREE.MeshPhongMaterial({color: 0x0000ff});
  var geometry = new THREE.PlaneBufferGeometry(opts.court.wide - 2*opts.court.line, opts.court.long - 1.5*opts.court.line);
  var cancha1 = new THREE.Mesh( geometry, material );
  var cancha2 = new THREE.Mesh( geometry, material );
  cancha1.rotation.x = -Math.PI/2;
  cancha2.rotation.x = -Math.PI/2;
  cancha1.position.y = 1;
  cancha2.position.y = 1;
  cancha1.position.z = -(opts.court.long - opts.court.line*1.5)/2 - opts.court.line/2;
  cancha2.position.z = (opts.court.long - opts.court.line*1.5)/2 + opts.court.line/2;
  scene.add( cancha1 );
  scene.add( cancha2 );

  var material = new THREE.MeshPhongMaterial({color: 0xffff00, side: THREE.DoubleSide});
  var geometry = new THREE.SphereGeometry(150, 15, 15, 0, Math.PI, 0, Math.PI);
  var slime1 = new THREE.Mesh( geometry, material );
  var slime2 = new THREE.Mesh( geometry, material );
  slime1.position.z = -600;
  slime2.position.z = 600;
  slime1.rotation.x = -Math.PI/2;
  slime2.rotation.x = -Math.PI/2;
  scene.add( slime1 );
  scene.add( slime2 );
  
  var material = new THREE.MeshPhongMaterial({color: 0xffaa00});
  var geometry = new THREE.SphereGeometry(50, 10, 10);
  var ball = new THREE.Mesh(geometry, material);
  ball.position.z = 600;
  ball.position.y = 800;
  scene.add(ball);
  
  //Set up the sky
  geometry = new THREE.SphereGeometry (opts.far/2);
  material = new THREE.MeshPhongMaterial({color: 0xB8EEFF} );
  var sky = new THREE.Mesh( geometry, material );
	sky.material.side = THREE.DoubleSide;
  scene.add( sky );
    
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "controls" : controls, "slime1" : slime1, "slime2" : slime2, "ball" : ball};
});