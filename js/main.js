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

var material = new THREE.MeshPhongMaterial({color: 0xffaa00});
var geometry = new THREE.SphereGeometry(50, 10, 10);
var ball = new THREE.Mesh(geometry, material);
ball.position.z = 600;
ball.position.y = 800;
scene.add(ball);

// ----------

// Ball control variables:
var gravity = -1;
var friction = -1;
var slime_r2 = Math.pow(150, 2);
var ball_r2 = Math.pow(50, 2);
var collide = slime_r2 + ball_r2;
var force_factor = 0.2;
var ball_ = {
    x: 600,
    y: 800,
    x_vel: 0,
    y_vel: 0
}
var slime1_ = {
    x: 600,
    y: 0,
    x_vel: 0,
    y_vel: 0
}

function changeBallPosition() {
    ball_.x += ball_.x_vel;
    ball_.y += ball_.y_vel;
    ball_.y_vel += gravity;
}

function changeSlimesPosition() {
    slime1_.x += slime1_.x_vel;
    slime1_.y += slime1_.y_vel;
    slime1_.y_vel = slime1_.y > 0 ? slime1_.y_vel + gravity : 0;
//    slime1_.x_vel = slime1_.x_vel > 0 ? slime1_.x_vel + friction : 0;
}

function detectCollision() {
    d1 = Math.pow(ball_.x - slime1_.x, 2) + Math.pow(ball_.y - slime1_.y, 2)
    if (d1 <= collide){
        ball_.x_vel = (ball_.x - slime1_.x)*force_factor;
        ball_.y_vel = (ball_.y - slime1_.y + slime1_.y_vel)*force_factor;
    }
}

function renderBallAndSlimes() {
    ball.position.z = ball_.x;
    ball.position.y = ball_.y;
    slime2.position.z = slime1_.x;
    slime2.position.y = slime1_.y;
}

jQuery(document.documentElement).keyup(function(e){
    if (e.keyCode == 65){ // A
        slime1_.x_vel += 10;
    }
    else if (e.keyCode == 68){ // D
        slime1_.x_vel -= 10;
    }
    else if (e.keyCode == 87){ // W
        slime1_.y_vel += 10;
    }
});

function toDoEachFrame() {
    detectCollision();
    changeBallPosition();
    changeSlimesPosition();
    renderBallAndSlimes();
}

function render() {
	requestAnimationFrame( render );
    toDoEachFrame();
	renderer.render( scene, camera );
}
render();