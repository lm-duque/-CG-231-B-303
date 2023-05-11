
/**CREACION DEL ESCENARIO */
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// **LUZ DE ESCENARIO**
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);


// ** FUNCIÓN FIGURA **

function poligono(nlados, ladoigual, alto) {
  const shape = new THREE.Shape();
  const ang = 2 * Math.PI / nlados;
  for (let i = 0; i < nlados; i++) {
    const x = ladoigual * Math.cos(i * ang);
    const y = ladoigual * Math.sin(i * ang);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  const extrudeSettings = {
    steps: 2,
    depth: alto,
    bevelEnabled: false,
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  return geometry;
}

//** MOSTRAR POLIGONO */
/*
const nlados = 6;
const ladoigual = 1;
const alto = 1;
const geometry = poligono(nlados, ladoigual, alto);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);*/

// ** CREACION DEL PRISMA **
const nlados = 6;
const ladoigual = 1;
const altura = 3;

const geometriaPrisma = poligono(nlados,ladoigual, altura);

const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const prisma = new THREE.Mesh(geometriaPrisma, material);

scene.add(prisma);



//** FUNCION RENDER */
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}



render();




