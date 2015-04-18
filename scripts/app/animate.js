define(['./scene', './physics'], function (scene, physics) {
  //Animate
  function animate() {
    requestAnimationFrame(animate);
    //Do frame rendering
    scene.renderer.render(scene.scene, scene.camera);
    physics.toDoEachFrame(scene.ball, scene.slime2, scene.slime1);
    scene.sky.rotation.y += 0.0003;
    scene.animateBallParticles();
//    scene.controls.update();
  }
  return {"animate" : animate, "renderer" : scene.renderer};
});