define(['OrbitControls', './opts'], function(THREE, opts){
  // Build Lava/Slime Material
  // base image texture for mesh
  var lavaTexture = new THREE.ImageUtils.loadTexture( 'images/lavag.jpg');
  lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping; 
  // multiplier for distortion speed 		
  var baseSpeed = 0.02;
  // number of times to repeat texture in each direction
  var repeatS = repeatT = 4.0;

  // texture used to generate "randomness", distort all other textures
  var noiseTexture = new THREE.ImageUtils.loadTexture( 'images/cloud.png' );
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
  // magnitude of noise effect
  var noiseScale = 0.8;

  // texture to additively blend with base image texture
  var blendTexture = new THREE.ImageUtils.loadTexture( 'images/lavag.jpg' );
  blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping; 
  // multiplier for distortion speed 
  var blendSpeed = 0.02;
  // adjust lightness/darkness of blended texture
  var blendOffset = 0.25;

  // texture to determine normal displacement
  var bumpTexture = noiseTexture;
  bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 
  // multiplier for distortion speed 		
  var bumpSpeed   = 0.15;
  // magnitude of normal displacement
  var bumpScale   = 40.0;

  // use "this." to create global object
  customUniforms = {
      baseTexture: 	{ type: "t", value: lavaTexture },
      baseSpeed:		{ type: "f", value: baseSpeed },
      repeatS:		{ type: "f", value: repeatS },
      repeatT:		{ type: "f", value: repeatT },
      noiseTexture:	{ type: "t", value: noiseTexture },
      noiseScale:		{ type: "f", value: noiseScale },
      blendTexture:	{ type: "t", value: blendTexture },
      blendSpeed: 	{ type: "f", value: blendSpeed },
      blendOffset: 	{ type: "f", value: blendOffset },
      bumpTexture:	{ type: "t", value: bumpTexture },
      bumpSpeed: 		{ type: "f", value: bumpSpeed },
      bumpScale: 		{ type: "f", value: bumpScale },
      alpha: 			{ type: "f", value: 1.0 },
      time: 			{ type: "f", value: 1.0 }
  };

  // create custom material from the shader
  var customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms: customUniforms,
      vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  }   );
  
  var clock = new THREE.Clock();
  function updateLava(){
    var delta = clock.getDelta();
	customUniforms.time.value += delta;
  }
  
  //Build circuit material
  var circuitTexture	= THREE.ImageUtils.loadTexture(opts.circuitsURL);
  var circuitMaterial = new THREE.MeshPhongMaterial( {color: 0xa2a2a2, map: circuitTexture, specular: 0x00ffff, shininess: 20 } );
  circuitTexture.wrapS = circuitTexture.wrapT = THREE.RepeatWrapping;
  circuitTexture.repeat.set(1, 1);
  //Shiny circuit material
  var shinyMaterial = new THREE.MeshPhongMaterial( {color: 0xcbc5a6, map: circuitTexture, specular: 0xffa700, shininess: 50 } );
  
  //Invisible material
  var invisibleMaterial = new THREE.MeshPhongMaterial({color: 0xfff, transparent: true, opacity: 0.0});
  
  //Glass material
  var glassMaterial = new THREE.MeshPhongMaterial({color: 0xddddff, transparent: true, opacity: 0.5});
  
  return {lavaMaterial:  customMaterial, updateLava: updateLava, circuitMaterial: circuitMaterial, invisibleMaterial: invisibleMaterial, glassMaterial: glassMaterial, shinyMaterial: shinyMaterial};
});