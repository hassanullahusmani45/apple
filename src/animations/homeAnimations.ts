import gsap from "gsap"


export const title = (title1: HTMLDivElement, title2: HTMLDivElement) => {

    const tl = gsap.timeline({ defaults: { duration: 2.5, ease: 'elastic.inOut' } })
    tl.fromTo(
        title1,
        {
            x: -300,
            y: -80,
            opacity: 0,
        },
        {
            x: 0,
            y: 0,
            opacity: 1,

        }
    )
        .fromTo(
            title2,
            {
                x: 300,
                y: 80,
                opacity: 0,
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
            }
            , "-=2")
}


export const sectionTitle = (title: HTMLDivElement) => {
    gsap.from(title, {
        opacity: 0,
        y: -80,
        duration: 0.8,
        ease: 'bounce.out',
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
    });
}
export const appleInfo = (info: HTMLDivElement) => {
    gsap.from(info, {
        delay: 0.5,
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: 'elastic.out',
        scrollTrigger: {
            trigger: info,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
    });
}

