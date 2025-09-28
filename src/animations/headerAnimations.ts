import gsap from "gsap"

export const headerAnimations = (targets: HTMLAnchorElement[]) => {

    gsap.set(targets, { y: -100});

    const tl = gsap.timeline({ defaults: { duration: 1, stagger: 0.3, ease: "power3.out" } });
    
    tl.to(targets,
        {
            y: 0,
            opacity: 1,
            ease: "power3.inOut",
        }
    )
}