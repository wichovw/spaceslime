define(['./scene', './physics'], function (scene, physics) {
  //Animate
  function animate() {
    requestAnimationFrame(animate);
    //Do frame rendering
    scene.renderer.render(scene.scene, scene.camera);
    physics.toDoEachFrame(scene.ball, scene.slime2);
//    scene.controls.update();
  }
  return {"animate" : animate(), "renderer" : scene.renderer};
});