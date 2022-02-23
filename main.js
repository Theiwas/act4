import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(15, window.innerWidth/window.innerHeight,0.1,1000);
const camera1= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,innerHeight);
camera.position.setZ(90);
renderer.render(scene,camera);
renderer.render(scene,camera1);

const geometry= new THREE.CylinderGeometry(10,10,10,10,10);
const geometry1= new THREE.DodecahedronGeometry(5,5)
const material= new THREE.MeshBasicMaterial({color: 0xBC,wireframe:true});
const material1= new THREE.MeshStandardMaterial({color: 0xACD});
const figure= new THREE.Mesh(geometry,material);
const figure1= new THREE.Mesh(geometry1,material1);

scene.add(figure)
scene.add(figure1)

const pointLigth =new THREE.PointLight(0xffffff)
pointLigth.position.set(20,20,20)
const ambientLight =new THREE.AmbientLight(0xffffff);
scene.add(pointLigth,ambientLight)

const lightHelper =new THREE.PointLightHelper(pointLigth)
const gridHelper=new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)

const controls= new OrbitControls(camera,renderer.domElement)

function addO(){
  
  const geometry = new THREE.SphereGeometry( 0.15, 25, 25 );
  const material = new THREE.MeshBasicMaterial( { color:0x0000ff , wireframe:true });
  const torusKnot = new THREE.Mesh( geometry, material );

  const [x,y,z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  torusKnot.position.set(x,y,z);
  scene.add(torusKnot)
}

Array(200).fill().forEach(addO)

const spacea = new THREE.TextureLoader().load('2.jpg');
scene.background=spacea;

const f= new THREE.TextureLoader().load('3.jpg');

const luffy= new THREE.Mesh(
  new THREE.BoxGeometry (4,4,4),
  new THREE.MeshStandardMaterial({map: f,})
)
scene.add(luffy);

luffy.position.z =30;
luffy.position.setX(-10);


function moveCamera(){
  const t= document.body.getBoundingClientRect().top;
  luffy.rotation.x +=0.05;
  luffy.rotation.y +=0.075;
  luffy.rotation.z +=0.05;

  camera.position.z=t*-0.01;
  camera.position.x=t*-0.0002;
  camera.position.y=t*-0.0002;
}
document.body.onscroll=moveCamera
function animate(){
  requestAnimationFrame(animate);
  figure.rotation.x +=0.01;
  figure.rotation.y += 0.005;
  figure.rotation.z += 0.01;
  figure1.rotation.x -=0.02;
  figure1.rotation.y -= 0.003;
  figure1.rotation.z -= 0.01;
  controls.update();
  renderer.render(scene,camera);
}
animate();

