import gsap from "gsap";

export const footerAnimations = (info: HTMLDivElement, articles: HTMLAnchorElement, about: HTMLAnchorElement, contact: HTMLAnchorElement, email: HTMLDivElement, phone: HTMLDivElement, whatsapp: HTMLDivElement) => {
    console.log(info);

    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power3.inOut',
        },
        scrollTrigger: {
            start: "60% 50%",
            toggleActions: "play none none reverse",
        }
    });

    tl.from(info, {
        opacity: 0,
        y: 30,
    });

    tl.from(articles, {
        opacity: 0,
        y: 30,
    }, "-=0.9").from(about, {
        opacity: 0,
        y: 30,
    }, "-=0.6").from(contact, {
        opacity: 0,
        y: 30,
    }, "-=0.6");


    tl.from(email, {
        opacity: 0,
        y: 30,
    }, "-=1.3").from(phone, {
        opacity: 0,
        y: 30,
    }, "-=1.1").from(whatsapp, {
        opacity: 0,
        y: 30,
    }, "-=0.8");

}