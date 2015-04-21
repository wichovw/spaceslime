define(["OrbitControls", "./opts", "./materials", "./figures"], function (THREE, opts, materials, figs) {
  var scene, camera, renderer, clock = new THREE.Clock();
  //Set up scene
  scene = new THREE.Scene();
  
  //Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(opts.swidth, opts.sheight);
  
  //Set up camera
  camera = new THREE.PerspectiveCamera(45, (opts.swidth / opts.sheight), opts.near, opts.far * 1.5);
  camera.position.set(2500, 500, 0);
  camera.rotation.set(0, Math.PI / 2, 0);
  scene.add(camera);
  
  //Set up fog
  var fog =  new THREE.Fog(0x16171c, 1, opts.far);
  scene.fog = fog;

  //Set up lights
  var lights = {
    ambient: new THREE.AmbientLight(0x21283b),
    front: new THREE.DirectionalLight(0x2a2c33, 0.5),
    back: new THREE.DirectionalLight(0x2a2c33, 0.7),
    hemisphere: new THREE.HemisphereLight(0xaea9b9, 0x6c7589, 1.001)
  };
  //Add ambient
  scene.add(lights.ambient);
  
  //Add a light in front
  lights.front.position.set(5, 5, 20);
  scene.add(lights.front);
  
  // add a light back
  lights.back.position.set(0, 10, -20);
  scene.add(lights.back);
  
  // add a light in sky
  lights.hemisphere.position.set(0, 500, 500);
  scene.add(lights.hemisphere);
  
  

  //Make prism for player areas 
  var geometry = new figs.PrismGeometry([
    new THREE.Vector2(0, opts.court.long / 3),
    new THREE.Vector2(0, 2 * opts.court.long / 3),
    new THREE.Vector2(opts.court.long / 3, opts.court.long),
    new THREE.Vector2(2 * opts.court.long / 3, opts.court.long),
    new THREE.Vector2(opts.court.long, 2 * opts.court.long / 3),
    new THREE.Vector2(opts.court.long, opts.court.long / 3),
    new THREE.Vector2(2 * opts.court.long / 3, 0),
    new THREE.Vector2(opts.court.long / 3, 0)
  ], opts.infiniteTall);
    
  //Player Area 1
  var area1 = new THREE.Mesh(geometry, materials.circuitMaterial);
  area1.position.set(-opts.court.long / 2, -opts.infiniteTall-20, -80);
  area1.rotation.x = -Math.PI / 2;
  scene.add( area1 );
  
  //Player Area 2
  var area2 = new THREE.Mesh(geometry, materials.shinyMaterial);
  area2.position.set(-opts.court.long/2, -opts.infiniteTall-20, opts.court.long+80);
  area2.rotation.x = -Math.PI / 2;
  scene.add( area2 );

  //Set up net
  var geometry = new THREE.BoxGeometry(opts.court.wide, (opts.infiniteTall), opts.court.line);
  var net = new THREE.Mesh(geometry, materials.glassMaterial);
  net.position.y = -opts.infiniteTall + opts.court.net*2;
  scene.add(net);

  //Set up slimes
  var geometry = new THREE.SphereGeometry(opts.slimes_radius, 15, 15, 0, Math.PI, 0, Math.PI);
  var slime1 = new THREE.Mesh( geometry, materials.lavaMaterial );
  slime1.position.z = -600;
  slime1.rotation.x = -Math.PI/2;
  scene.add( slime1 );
  
  var slime2 = new THREE.Mesh( geometry, materials.lavaMaterial );
  slime2.position.z = 600;
  slime2.rotation.x = -Math.PI/2;
  scene.add( slime2 );
  
  //Add Slime bottom parts
  var cylinderGeom = new THREE.CylinderGeometry(opts.slimes_radius*0.9, opts.slimes_radius+20, 15);
    
  var slimeDown1 = new THREE.Mesh( cylinderGeom, materials.circuitMaterial);
  slimeDown1.rotation.x = -Math.PI/2;
  slimeDown1.position.set(0, 0, -13);
  slime1.add(slimeDown1);
  
  var slimeDown2 = new THREE.Mesh( cylinderGeom, materials.circuitMaterial);
  slimeDown2.rotation.x = -Math.PI/2;
  slimeDown2.position.set(0, 0, -13);   
  slime2.add(slimeDown2);
  
  
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
	
	for ( var c = 0; c < ball.children.length; c ++ )  {
		var sprite = ball.children[ c ];
		// pulse away/towards center
		// individual rates of movement
		var a = particleAttributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
		sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
		sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
		sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;	
	}
    materials.updateLava();
  }
  
  //Create shield item icon
  var sphereItem = new THREE.SphereGeometry( 30, 32, 16 );
  var material = new THREE.MeshPhongMaterial( { color: 0xe0c42c  } );
  var itemShield = new THREE.Mesh( sphereItem, material );
  itemShield.position.set(0,500,0);
  scene.add(itemShield);

  // SUPER SIMPLE GLOW EFFECT
  // use sprite because it appears the same from all angles
  var spriteMaterial = new THREE.SpriteMaterial({ 
      map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ), 
      color: 0xe0c42c, transparent: false, blending: THREE.AdditiveBlending
  });
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(200, 200, 1.0);
  itemShield.add(sprite); // this centers the glow at the mesh
  
  //Create sick icon
  var sickItem = new THREE.Mesh(sphereItem, materials.sickMaterial);
  sickItem.position.set(0, 700, 0);
  scene.add(sickItem);
  
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
    
  return {"renderer": renderer, "camera" : camera, "scene" : scene, "slime1" : slime1, "slime2" : slime2, "ball" : ball, "animateBallParticles": animateBallParticles, "sky" : skyBox, "itemShield" : itemShield};
});