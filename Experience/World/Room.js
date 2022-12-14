import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene; 
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target:0,
            ease: 0.1,
        };
        
        this.setModel();
        // this.setAnimation();
        this.onMouseMove();
        

    }

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;  
            
            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;  
                })
            }

            if(child.name === "Computer"){
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            if(child.name === "Aquarium"){
                child.children[4].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.arcade,
                });
            }
            if(child.name === "Mini_Floor"){
                child.position.x = -2.11243;
                child.position.z = -5.25418;
            }

            // if(child.name === "Mailbox" || 
            // child.name === "Lamp" || 
            // child.name === "FloorFirst" ||
            // child.name === "FloorSecond" ||
            // child.name === "FloorThird"){
            //     child.scale.set(0, 0, 0);
            // }

            child.scale.set(0,0,0);
            if(child.name === "Cube"){
                // child.scale.set(1,1,1);
                child.position.set(0,-1.5, 0);
                child.rotation.y = Math.PI/4;
            }
            if(child.name === "Plane"){
                // child.scale.set(1,1,1);
                child.position.set(60,7, 6);
            }
            this.roomChildren[child.name.toLowerCase()] = child;
        })

        const width = 0.03;
        const height = 0.03; 
        const intensity = 100;
        const rectLight = new THREE.PointLight( 0xff0000, 0.4, 100 );
        rectLight.position.set(-8.8, 13.5, -1.5);
        this.actualRoom.add( rectLight )

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }
    
    // setAnimation(){
    //     // this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //     // this.swim = this.mixer.clipAction(this.room.animations[129]);
    //     // this.swim.play(); 
    // }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
            this.lerp.target = this.rotation*0.1;
        })
    }

    resize(){
    }

    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        
        // this.mixer.update(this.time.delta * 0.0009);
    }
}