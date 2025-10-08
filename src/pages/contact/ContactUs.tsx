import { useEffect, useRef } from 'react';
import { LuLinkedin, LuMapPinned } from 'react-icons/lu';
import { BsEnvelopeAt } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { GrSend } from "react-icons/gr";
import hassanProfile from '../../assets/hassan.jpeg';
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInput from '../../components/form/RHFInput';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextarea from '../../components/form/RHFTextarea';
import Button from '../../components/ui/Button';
import { ContactUsSchema } from '../../types/zodSchema';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createContact, resetStatus } from '../../redux/slices/contactUs/contactUsSlice';
import { toastSuccess } from '../../utils/toastSuccess';
import { toastError } from '../../utils/toastError';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useTranslation } from 'react-i18next';
import { FiFacebook, FiGithub } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


export default function ContactUs() {
    const { t } = useTranslation("contect_us");
    const { t: t_main } = useTranslation("main");
    const { t: t_toast } = useTranslation("toast");
    const dispatch = useAppDispatch();
    const { success, error, loading } = useAppSelector(state => state.contactUs);
    const [contacFormBody] = useAutoAnimate<HTMLFormElement>();
    type FormData = z.infer<typeof ContactUsSchema>

    const nameInputRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const subjectRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const imgWraperRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const about_P1Ref = useRef<HTMLParagraphElement>(null);
    const about_P2Ref = useRef<HTMLParagraphElement>(null);
    const skilesRef = useRef<HTMLDivElement>(null);
    const skilesInfoRef = useRef<HTMLParagraphElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const addressRef = useRef<HTMLDivElement>(null);
    const emailAddressRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const websiteRef = useRef<HTMLAnchorElement>(null);
    useGSAP(() => {

        const tl1 = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut',
            }
        });

        tl1.from(nameInputRef.current, {
            opacity: 0,
            y: 50,
        }).from(emailRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.2").from(subjectRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3").from(messageRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3");


        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: imgWraperRef.current,
                // markers:true,
                start: "top 50%",
                toggleActions: "play none none reverse",
            }
        });

        tl2.from(imgWraperRef.current, {
            duration: 1.5,
            scale: 0,
            ease: 'back',
        }).from(aboutRef.current, {
            opacity: 0,
            y: -50,
            ease: 'bounce.out'
        }, "<").from(about_P1Ref.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.2").from(about_P2Ref.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.5");


        tl2.from(skilesRef.current, {
            opacity: 0,
            y: -50,
            ease: 'bounce.out'
        }, "<+=0.2").from(skilesInfoRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3")


        tl2.from(contactRef.current, {
            opacity: 0,
            y: -50,
            ease: 'bounce.out'
        }, "<+=0.3").from(addressRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3").from(emailAddressRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3").from(phoneRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3").from(websiteRef.current, {
            opacity: 0,
            y: 50,
        }, "<+=0.3");

    }, []);

    const defaultValues = {
        name: '',
        email: '',
        message: '',
        subject: '',
    };

    const methods = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(ContactUsSchema)
    });

    const onSubmit = (data: FormData) => {
        dispatch(createContact(data));
    }

    useEffect(() => {
        if (success) {
            toastSuccess(t_toast("The contact message was saved successfully."));
            methods.reset();
            dispatch(resetStatus());
        }
        if (error) {
            toastError(t_toast("Something was wrong, please try again!"));
            console.error("ERROR :", error);

            dispatch(resetStatus());
        }
    }, [success, error]);

    return (

        <div className="grid grid-cols-8 gap-y-8 gap-5 xl:gap-10 2xl:gap-20 lg:my-10">
            <div className="col-span-8 lg:col-span-3 h-fit bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 lg:my-8 rounded-2xl shadow-md">
                <div className="text-2xl font-bold text-center mb-4 text-green-600 dark:text-orange-400">{t("Contact Us")}</div>
                <FormProvider {...methods}>
                    <form ref={contacFormBody} className="grid grid-cols-2 gap-x-4 pt-2 lg:pt-4" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <div ref={nameInputRef} className="col-span-2 md:col-span-1 lg:col-span-2">
                            <RHFInput name="name" label={t("Name")} placeholder={t('Enter your name')} />
                        </div>
                        <div ref={emailRef} className="col-span-2 md:col-span-1 lg:col-span-2">
                            <RHFInput name="email" label={t("Email")} type="email" placeholder='example@gmail.com' />
                        </div>
                        <div ref={subjectRef} className="col-span-2">
                            <RHFInput name="subject" label={t("Subject")} placeholder={t('Write your subject')} />
                        </div>
                        <div ref={messageRef} className="col-span-2">
                            <RHFTextarea
                                name='message'
                                label={t('Message')}
                                placeholder={t('Enter your contact message')}
                                rows={5}
                            />
                        </div>

                        <div className="col-span-2 flex justify-center items-center mt-5">
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <div>{t_main("Loading...")}</div> :
                                    (<>
                                        <GrSend className="size-5" />
                                        {t("Send")}
                                    </>)
                                }
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>

            <div className="relative col-span-8 lg:col-span-5 h-fit bg-slate-200 dark:bg-slate-800 p-4 sm:p-6 lg:p-8 my-20 lg:my-8 rounded-2xl shadow-md">

                <div ref={imgWraperRef} className="flex bg-slate-100 dark:bg-slate-950 justify-center items-center w-34 sm:w-38 md:w-40 lg:w-45 h-34 sm:h-38 md:h-40 lg:h-45 rounded-full border-0 absolute mx-auto right-0 left-0 -inset-y-18 sm:-inset-y-20 md:-inset-y-22 lg:-inset-y-26 ">
                    <div className="relative w-30 sm:w-34 md:w-36 lg:w-40 h-30 sm:h-34 md:h-36 lg:h-40 mx-auto rounded-full bg-inherit p-1 dark:p-[3px]">
                        <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                        <img
                            className="relative w-full h-full  rounded-full object-cover bg-slate-50 dark:bg-slate-950"
                            src={hassanProfile}
                            alt="profile"
                        />
                    </div>
                </div>



                <div ref={aboutRef} className="text-base font-bold mt-8">{t("About Me")}</div>
                <div className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    <p ref={about_P1Ref}>{t("about_P1")}</p>
                    <p ref={about_P2Ref}>{t("about_P2")}</p>
                </div>

                <div ref={skilesRef} className="text-base font-semibold mt-8">{t("My Skiles")}</div>
                <p ref={skilesInfoRef} className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    {t("my_skilles_info")}
                </p>
                <div ref={contactRef} className="text-base font-semibold mt-8">{t("Contect Me")}</div>
                <div className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    <div ref={addressRef} className="flex items-start md:items-center gap-2 ">
                        <LuMapPinned className="size-5 text-slate-950 dark:text-white" />
                        <span className="break-all">{t("address")}</span>
                    </div>
                    <div ref={emailAddressRef} className="flex items-center gap-2"><BsEnvelopeAt className="size-5 text-slate-950 dark:text-white" />hassanullahusmani45@gmail.com</div>
                    <div ref={phoneRef} className="flex items-center gap-2">
                        <HiOutlineDevicePhoneMobile className="size-5 text-slate-950 dark:text-white" />
                        <span dir='ltr'>{t("phone")}</span>
                    </div>
                    <a ref={websiteRef} href='https://hassanullahusmani-portfolio.netlify.app' target='_blank' className="flex items-start md:items-center gap-2">
                        <HiOutlineGlobeAlt className="size-6 text-slate-950 dark:text-white" />
                        <span className="break-all">{t("website")}</span>
                    </a>
                </div>
                <div className="mt-10">
                    <div className="flex justify-center items-center gap-4 md:gap-6">
                        <a
                            className='contactSocialMedia'
                            href="https://www.linkedin.com/in/hassanullahusmani" target="_blank"
                            rel="noopener noreferrer" >
                            <LuLinkedin className="size-6" />
                        </a>
                        <a
                            className='contactSocialMedia'
                            href="https://github.com/hassanullahusmani45" target="_blank"
                            rel="noopener noreferrer" >
                            <FiGithub className="size-6" />
                        </a>
                        <a
                            className='contactSocialMedia'
                            href="https://www.facebook.com/profile.php?id=61579164404688" target="_blank"
                            rel="noopener noreferrer" >
                            <FiFacebook className="size-6" />
                        </a>
                        <a
                            className='contactSocialMedia'
                            href="https://www.instagram.com/hassanullahusmani45" target="_blank"
                            rel="noopener noreferrer" >
                            <FaInstagram className="size-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
