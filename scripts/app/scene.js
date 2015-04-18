define(["OrbitControls", "./opts"], function(THREE, opts){
  var scene, camera, renderer;
  var clock = new THREE.Clock();
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
  var fog =  new THREE.Fog( 0x16171c, 1, opts.far);
  scene.fog = fog;

  //Set up lights
  var lights = {
    ambient: new THREE.AmbientLight(0x21283b),
    front: new THREE.DirectionalLight(0x2a2c33, 0.5),
    back: new THREE.DirectionalLight(0x2a2c33, 0.7),
    hemisphere: new THREE.HemisphereLight(0xaea9b9, 0x6c7589, 1.001)
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

  //Set up court
  var material = new THREE.MeshPhongMaterial({color: 0xffffff});
  var geometry = new THREE.PlaneBufferGeometry(opts.court.wide, opts.court.long*2);
  var line = new THREE.Mesh( geometry, material );
  line.rotation.x = -Math.PI/2;
  line.position.y = 0.5;
  scene.add( line );

  //Set up fields
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
  
  var material = new THREE.MeshPhongMaterial({color: 0xddddff, transparent: true, opacity: 0.5});
  var geometry = new THREE.BoxGeometry(opts.court.wide, opts.court.net, opts.court.line);
  var net = new THREE.Mesh(geometry, material);
  net.position.y = opts.court.net/2;
  scene.add(net);

  //Set up slimes
  var material = new THREE.MeshPhongMaterial({color: 0xffff00, side: THREE.DoubleSide});
  var geometry = new THREE.SphereGeometry(opts.slimes_radius, 15, 15, 0, Math.PI, 0, Math.PI);
  var slime1 = new THREE.Mesh( geometry, material );
  var slime2 = new THREE.Mesh( geometry, material );
  slime1.position.z = -600;
  slime2.position.z = 600;
  slime1.rotation.x = -Math.PI/2;
  slime2.rotation.x = -Math.PI/2;
  scene.add( slime1 );
  scene.add( slime2 );
  
  //Create particles ball
  //From: https://stemkoski.github.io/Three.js/#particles
  var particleTexture = THREE.ImageUtils.loadTexture( 'images/spark.png' );
  var ball = new THREE.Object3D();
  var particleAttributes = { startSize: [], startPosition: [], randomness: [] };
  var totalParticles = 200;
  var radiusRange = opts.ball_radius;
  for( var i = 0; i < totalParticles; i++ ) {
      var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, useScreenCoordinates: false, color: 0xffffff } );

      var sprite = new THREE.Sprite( spriteMaterial );
      sprite.scale.set( 32, 32, 1.0 ); // imageWidth, imageHeight
      sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
      // for a spherical shell:
      sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );

      // sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
      sprite.material.color.setHSL( Math.random(), 0.9, 0.7 ); 

      // sprite.opacity = 0.80; // translucent particles
      sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles

      ball.add( sprite );
      // add variable qualities to arrays, if they need to be accessed later
      particleAttributes.startPosition.push( sprite.position.clone() );
      particleAttributes.randomness.push( Math.random() );
  }
  ball.position.z = 600;
  ball.position.y = 800;
  scene.add(ball);
  
  //Function to animate ball particles
  function animateBallParticles(){
    var time = 4 * clock.getElapsedTime();
	
	for ( var c = 0; c < ball.children.length; c ++ ) 
	{
		var sprite = ball.children[ c ];

		// particle wiggle
		// var wiggleScale = 2;
		// sprite.position.x += wiggleScale * (Math.random() - 0.5);
		// sprite.position.y += wiggleScale * (Math.random() - 0.5);
		// sprite.position.z += wiggleScale * (Math.random() - 0.5);
		
		// pulse away/towards center
		// individual rates of movement
		var a = particleAttributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
		sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
		sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
		sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;	
	}
  }
  
  //Set up the sky box
  var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );	
  //For each cube side
  var materialArray = [];
  for (var i = 0; i < 6; i++)
      materialArray.push( new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture( opts.skybox.prefix + opts.skybox.directions[i] + opts.skybox.extension ),
          side: THREE.BackSide
      }));
  var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
  var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
  scene.add( skyBox );
    
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "controls" : controls, "slime1" : slime1, "slime2" : slime2, "ball" : ball, "animateBallParticles": animateBallParticles, "sky" : skyBox};
});