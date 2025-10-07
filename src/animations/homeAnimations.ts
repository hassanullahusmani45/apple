import gsap from "gsap"


export const title = (title1: HTMLDivElement, title2: HTMLDivElement) => {

    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: 'elastic.inOut' } })
    tl.fromTo(
        title1,
        {
            x: -100,
            y: -80,
            opacity: 0,
        },
        {
            x: 0,
            y: 0,
            opacity: 1,

        }
    ).fromTo(
        title2,
        {
            x: 100,
            y: 80,
            opacity: 0,
        },
        {
            x: 0,
            y: 0,
            opacity: 1,
        }
        , "-=1")
}


export const sectionTitle = (title: HTMLDivElement) => {
    gsap.from(title, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3',
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
    });
}
export const appleInfo = (info: HTMLDivElement) => {
    gsap.from(info, {
        opacity: 0,
        y: -30,
        duration: 1.5,
        ease: 'elastic.out',
        scrollTrigger: {
            trigger: info,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
    });
}

