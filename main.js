import * as THREE from 'three';
import gsap from 'gsap'
import './styles.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//SCENE
const scene=new THREE.Scene();

//SPHERE
const geometry= new THREE.IcosahedronGeometry(4);
const material= new THREE.MeshStandardMaterial(
    {
        color:"#00ff83",
        roughness: 0.5,
})
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

//SIZES

const sizes= {
    w: window.innerWidth,
    h: window.innerHeight,
}

//LIGHT
const light= new THREE.PointLight("0xffffff",1,100);
light.position.set(0,10,10);
light.intensity=1.5
scene.add(light);

//Camera
const camera= new THREE.PerspectiveCamera(45,sizes.w/sizes.h,0.1,100);
camera.position.z=20
scene.add(camera);


//RENDERER
const canvas= document.querySelector(".webgl");
const renderer= new THREE.WebGL1Renderer({canvas});
renderer.setSize(sizes.w,sizes.h);
renderer.render(scene,camera);
renderer.setPixelRatio(2);

//RESIZE
window.addEventListener("resize", ()=>{
    //Update Sizes
    sizes.w= window.innerWidth
    sizes.h= window.innerHeight
    //Update Camera
    camera.aspect= sizes.w/sizes.h
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.w,sizes.h)
    
})

//ORBITCONTROLS
const controls= new OrbitControls(camera,canvas);
controls.enableDamping= true;
controls.enablePan= false;
controls.enableZoom= false;
controls.autoRotate =true;
//controls.autoRotateSpeed=3;

const loop= ()=>{
   // mesh.position.x+=0.1
   controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
    
}
loop()

//Timeline
const t1=gsap.timeline({
    defaults: {duration:1}
})
t1.fromTo(mesh.scale, {x: 0,y: 0,z: 0 }, {x: 1,y: 1,z: 1 });
t1.fromTo("nav", {y:"-100%"}, {y:"0%"});
t1.fromTo("title", {opacity: 0}, {opacity:1});

//CHANGE COLOR
let mouseDown= false;
let rgb=[];
window.addEventListener("mousedown",()=> (mouseDown=true));
window.addEventListener("mouseup",()=> (mouseDown=false));

window.addEventListener("mousemove", (e)=>{
    if(mouseDown)
    {
        rgb=[
            Math.round((e.pageX/sizes.w)*255),
            Math.round((e.pageY/sizes.h)*255),
            150,
        ]
        //To animate
        let newColor=new THREE.Color(`rgb(${rgb.join(',')})`)
        gsap.to(mesh.material.color,{
            r:newColor.r,
            g:newColor.g,
            b:newColor.b,
        })
        //gsap.to(mesh.material.color,{r: rgb[0],g: rgb[1],b: rgb[2]})
    }
})