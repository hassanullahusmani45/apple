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

