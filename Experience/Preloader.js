import {EventEmitter} from "events"
import Experience from "./Experience.js"
import GSAP from "gsap";
import convert from "./Utils/covertsDivstoSpans.js"
export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.World;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device)=>{
            this.device = device;
        })

        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        convert(document.querySelector('.intro-text'));
        convert(document.querySelector('.hero-main-title'));
        convert(document.querySelector('.hero-main-description'));
        convert(document.querySelector('.hero-second-subheading'));
        convert(document.querySelector('.second-sub'));
        this.room = this.experience.World.room.actualRoom;
        this.roomChildren = this.experience.World.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro(){
        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline(); 
            this.timeline.set(".animatedis", {
                y:0,
                yPercent:100
            })
            this.timeline.to(".preloader", {
                opacity:0,
                delay: 1,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add("hidden")
                }
            })
            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.plane.scale, {
                    x:2.140,
                    y:2.140 ,
                    z:2.377,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.roomChildren.plane.position, {
                    x:0,
                    z:6,
                    duration: 2,
                }).to(this.roomChildren.cube.scale, {
                    x:1.4,
                    y:1.4,
                    z:1.4,
                    ease: "back.out(2.5)",
                    duration: 0.1,
                }).to(this.roomChildren.plane.position, {
                    x:-70,
                    z:6,
                    duration: 3,
                }).to(this.roomChildren.plane.scale, {
                    x:0,
                    y:0 ,
                    z:0,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x:-1,
                    ease:"power1.out",
                    duration: 0.7,
                })
            }else{
                this.timeline.to(this.roomChildren.plane.scale, {
                    x:1.78,
                    y:1.78 ,
                    z:1.98,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.roomChildren.plane.position, {
                    x:0,
                    z:6,
                    duration: 2,
                }).to(this.roomChildren.cube.scale, {
                    x:1.4,
                    y:1.4,
                    z:1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.roomChildren.plane.position, {
                    x:-30,
                    z:6,
                    duration: 1,
                }).to(this.roomChildren.plane.scale, {
                    x:0,
                    y:0 ,
                    z:0,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z:-1,
                    ease:"power1.out",
                    duration: 0.7,
                })
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back-out(1.7)",
                onComplete: resolve,
            }).to(".arrow-svg-wrapper", {
                opacity:1,
            }, "same").to(".toggle-bar", {
                opacity:1,
                onComplete: resolve,
            }, "same");
        })
        
    }

    secondIntro(){
        return new Promise((resolve)=>{
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back-in(1.7)",
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity:0,
            }, "fadeout").to(this.room.position, {
                z:0,
                x:0,
                y:0,
                ease:"power1.out",
            }, "same").to(this.roomChildren.cube.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
            }, "same").to(this.roomChildren.cube.scale, {
                x:10,
                y:10,
                z:10,
            }, "same").to(this.camera.orthographicCamera.position, {
                y:3.5,
            }, "same").to(this.roomChildren.cube.position, {
                y:9.66266,
                z:0.558681,
                x:0.606697,
            }, "same").set(this.roomChildren.body.scale,{
                x:4.88222,
                y:1.80709,
                z:2.86527,
            }).to(this.roomChildren.cube.scale, {
                x:0,
                y:0,
                z:0,
            }, "introText").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            }, "introText").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            }, "introText").to(".hero-second-subheading .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            }, "introText").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.7)",
            }, "introText").to(this.roomChildren.aquarium.scale, {
                x:0.325,
                y:0.325,
                z:0.325,
                ease:"back-out(2.2)",
                duration: 0.5,
            }, ">-0.5").to(this.roomChildren.shelves.scale, {
                x:0.004955,
                y:0.205639,
                z:0.006143,
                ease:"back-out(2.2)",
                duration: 0.5,
            }, ">-0.4").to(this.roomChildren.floor_items.scale, {
                x:1.36585,
                y:0.129762,
                z:0.938335,
                ease:"back-out(2.2)",
                duration: 0.5,
            }, ">-0.3").to(this.roomChildren.desks.scale, {
                x:2.12574,
                y:0.238669,
                z:2.12574,
                ease:"back-out(2.2)",
                duration: 0.5,
            }, ">-0.2").to(this.roomChildren.table_stuff.scale, {
                x:0.020022,
                y:0.125823,
                z:0.020022,
                ease:"back-out(2.2)",
                duration: 0.5,
            }, ">-0.1").to(this.roomChildren.computer.scale, {
                x:0.063097,
                y:1.47242,
                z:2.56265,
                ease:"back-out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.chair.scale, {
                x:1.3398,
                y:0.288194,
                z:1.3398,
                ease:"back-out(2.2)",
                duration: 0.5,
            },"chair")
            .to(this.roomChildren.chair.rotation, {
                y: 4* Math.PI + Math.PI/8,
                ease:"power2.out",
                duration: 1,
            },"chair")
            .to(this.roomChildren.fish.scale, {
                x:0.76212,
                y:0.76212,
                z:0.76212,
                ease:"back-out(2.2)",
                duration: 0.5,
            }).to(".arrow-svg-wrapper", {
                opacity:1,
                onComplete:resolve,
            })
            
        });
                
    }   

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if(difference > 0){
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro;
        }
        this.initalY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent)
        window.removeEventListener("touchstart", this.scrollOnceEvent)
        window.removeEventListener("touchmove", this.scrollOnceEvent)
    }

    async playIntro(){
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.toucheMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent)
        window.addEventListener("touchstart", this.scrollOnceEvent)
        window.addEventListener("touchmove", this.scrollOnceEvent)
    }

    async playSecondIntro(){
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1,0,0);
        }else{
            this.room.position.set(0,0,-1);
        }
    }

    scale(){
        if(this.device === "desktop"){
            this.room.scale.set(0.11,0.11,0.11);
        }else{
            this.room.scale.set(0.07,0.07,0.07);
        }
    }


    update(){
        if(this.moveFlag){
            this.move();
        }
        if(this.scaleFlag){
            this.scale();
        }
    }
}
