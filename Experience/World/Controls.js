import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'
export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.World.room.actualRoom;
        this.circleFirst = this.experience.World.floor.circleFirst;
        this.circleSecond = this.experience.World.floor.circleSecond;
        this.circleThird = this.experience.World.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }
    
    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            "(min-width: 969px)": () => {
                console.log("fired desktop");
                this.room.scale.set(0.11, 0.11, 0.11);
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0019; 
                    }
                })

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 0.6; 
                    },
                    z: () => {
                        return this.sizes.height * 0.0052;
                    },
                }, "same")
                this.secondMoveTimeline.to(this.room.scale, {
                    x:0.37,
                    y:0.37,
                    z:0.37,
                }, "same")

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: -1,
                    x: -3.5,
                })
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 7.5,
                    x: 6.3,
                },"same").to(this.camera.orthographicCamera.rotation, {
                    x: 0,
                    y: -Math.PI/3.85,
                }, "same").to(this.room.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                }, "same");
                   
            },
            "(max-width: 968px)": () => {
                console.log("fired mobile");
                this.room.scale.set(0.07, 0.07, 0.07);
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                }, "same").to(this.room.position, {
                    x:1.5,
                }, "same")
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 1.5,
                    x: -1,
                })
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 7.5,
                    x: 3.9,
                },"same").to(this.camera.orthographicCamera.rotation, {
                    x: 0,
                    y: -Math.PI/3.85,
                }, "same").to(this.room.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                }, "same");
            },
            "all": ()=> {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section=>{
                    this.progressWrapper = 
                    section.querySelector(".progress-wrapper");
                    this.progressBar = 
                    section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY:0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    });
                });

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleFirst.scale, {
                    x:3,
                    y:3,
                    z:3,
                })

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleSecond.scale, {
                    x:3,
                    y:3,
                    z:3,
                }, "same").to(this.room.position, {
                    y:0.7,
                }, "same")

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x:3,
                    y:3,
                    z:3,
                })

                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                })
                this.room.children.forEach(child => {
                    if(child.name === "Mini_Floor"){
                        this.f = GSAP.to(child.scale, {
                            x:10,
                            y:10,
                            z:10,
                        })
                    }
                    if(child.name === "Mini_Floor"){
                        this.first = GSAP.to(child.position, {
                            x:-6.41276 ,
                            z:-1.10633 ,
                            ease:"power1.out",
                            duration: 0.3,
                        })
                    }
                    if(child.name === "Mailbox"){
                        this.second = GSAP.to(child.scale, {
                            x: 0.241,
                            y: 1.831,
                            z: 0.241,
                            ease: "back.out(2)",
                            duration: 0.3,
                        })
                    }
                    if(child.name === "Lamp"){
                        this.third = GSAP.to(child.scale, {
                            x: 0.395,
                            y: 0.395,
                            z: 0.395,
                            ease: "back.out(2)",
                            duration: 0.3,
                        })
                    }
                    if(child.name === "FloorFirst"){
                        this.fourth = GSAP.to(child.scale, {
                            x: 0.508,
                            y: 0.035,
                            z: 0.998,
                            ease: "back.out(2)",
                            duration: 0.3,
                        })
                    }
                    if(child.name === "FloorSecond"){
                        this.fifth = GSAP.to(child.scale, {
                            x: 0.508,
                            y: 0.035,
                            z: 0.998,
                            ease: "back.out(2)",
                            duration: 0.3,
                        })
                    }
                    if(child.name === "FloorThird"){
                        this.sixth = GSAP.to(child.scale, {
                            x: 0.508,
                            y: 0.035,
                            z: 0.998,
                            ease: "back.out(2)",
                            duration: 0.3,
                        })
                    }
                })
                this.secondPartTimeline.add(this.f);
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth);
                this.secondPartTimeline.add(this.fifth);
                this.secondPartTimeline.add(this.sixth);
            }
              
          });
    }

    resize(){
    }

    update(){

    }
}