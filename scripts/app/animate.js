define(['OrbitControls', './scene', './physics', './variables', './materials'], function (THREE, scene, physics, vars, materials) {
  //Animate
  
  var effect = new THREE.AnaglyphEffect(scene.renderer);
  effect.setSize(window.innerWidth,  window.innerHeight);
  
  function animate() {
    requestAnimationFrame(animate);
    //Do frame rendering
    if(vars.slime1.powerups.sick){
      effect.render( scene.scene, scene.camera );
       scene.slime2.material = materials.sickMaterial;
    } else{
      scene.renderer.render(scene.scene, scene.camera);
    }
    if(vars.slime2.powerups.sick){
      scene.slime1.material = materials.sickMaterial;
    }
         

    
    physics.toDoEachFrame(scene.ball, scene.slime2, scene.slime1);
    scene.sky.rotation.y += 0.0003;
    scene.animateBallParticles();
  }
  return {"animate" : animate, "renderer" : scene.renderer};
});