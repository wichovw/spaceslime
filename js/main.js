// Definition of scene, camera and renderer.

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 9000 );
camera.position.set(1250, 500, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var light	= new THREE.AmbientLight( 0x020202 )
scene.add( light )
light	= new THREE.DirectionalLight('white', 0.3)
light.position.set(5, 5, 20)
scene.add( light )
light	= new THREE.DirectionalLight('white', 0.2)
light.position.set(0, 10, -20)
scene.add( light )
light = new THREE.HemisphereLight(0xE3F4FF, 0xBCE1F9, 1.001);
light.position.set(0,500,500);
scene.add(light);

// ----------

var material = new THREE.MeshPhongMaterial({color: 0x00ff00, side: THREE.DoubleSide});
var geometry = new THREE.PlaneBufferGeometry(40000, 40000);
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -Math.PI/2;
scene.add( plane );

var material = new THREE.MeshPhongMaterial({color: 0xffffff});
var geometry = new THREE.PlaneBufferGeometry(1200, 2600);
var line = new THREE.Mesh( geometry, material );
line.rotation.x = -Math.PI/2;
line.position.y = 0.5;
scene.add( line );

var material = new THREE.MeshPhongMaterial({color: 0x0000ff});
var geometry = new THREE.PlaneBufferGeometry(1100, 1200);
var cancha1 = new THREE.Mesh( geometry, material );
var cancha2 = new THREE.Mesh( geometry, material );
cancha1.rotation.x = -Math.PI/2;
cancha2.rotation.x = -Math.PI/2;
cancha1.position.y = 1;
cancha2.position.y = 1;
cancha1.position.z = -650;
cancha2.position.z = 650;
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


// ----------

function toDoEachFrame() {
}

function render() {
	requestAnimationFrame( render );
    toDoEachFrame();
	renderer.render( scene, camera );
}
render();