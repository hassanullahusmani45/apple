import { useEffect } from 'react';
import { LuMapPinned } from 'react-icons/lu';
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


export default function ContactUs() {
    const dispatch = useAppDispatch();
    const { success, error, loading } = useAppSelector(state => state.contactUs);
    const [contacFormBody] = useAutoAnimate<HTMLFormElement>();
    type FormData = z.infer<typeof ContactUsSchema>

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
        console.log("Data", data);
        dispatch(createContact(data));
    }

    useEffect(() => {
        if (success) {
            toastSuccess("The contact message was saved successfully.");
            methods.reset();
            dispatch(resetStatus());
        }
        if (error) {
            toastError("Something was wrong, please try again!");
            console.error("ERROR :", error);

            dispatch(resetStatus());
        }
    }, [success, error]);

    return (

        <div className=" grid md:grid-cols-2 gap-20 my-10">
            <div className="col-span-1 h-fit bg-slate-200 dark:bg-slate-800 p-8 my-8 rounded-2xl shadow-md">
                <div className="text-2xl font-bold text-center mb-4 text-green-600 dark:text-orange-400">Contact Us</div>
                <div>
                    {/* {error && <p className=" flex gap-2 items-center text-red-400"><ExclamationTriangleIcon className='size-5 text-red-500' /> {error}</p>} */}
                </div>
                <FormProvider {...methods}>
                    <form ref={contacFormBody} className="pt-6" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <RHFInput name="name" label="Name" placeholder='Enter your name' />
                        <RHFInput name="email" label="Email" type="email" placeholder='example@gmail.com' />
                        <RHFInput name="subject" label="Subject" placeholder='Write your subject' />
                        <RHFTextarea
                            name='message'
                            label='Message'
                            placeholder='Enter your contact message'
                            rows={5}
                        />
                        <div className="flex justify-center items-center mt-5">
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <div>Loading ...</div> :
                                    (<>
                                        <GrSend className="size-6" />
                                        Send
                                    </>)
                                }
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>

            <div className="relative col-span-1 bg-slate-200 dark:bg-slate-800 p-8 my-8 rounded-2xl shadow-md">

                <div className="flex bg-slate-100 dark:bg-slate-900 justify-center items-center w-45 h-45 rounded-full border-0 absolute mx-auto right-0 left-0 -inset-y-24">
                    <div className="relative w-40 h-40 mx-auto rounded-full bg-inherit p-1 dark:p-[3px]">
                        <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                        <img
                            className="relative w-full h-full  rounded-full object-cover"
                            src={hassanProfile}
                            alt="profile"
                        />
                    </div>
                </div>



                <div className="text-base font-bold mt-8">Abute Me</div>
                <p className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    My name is Hasssanullah usmani I’m a Full-Stack Developer with over three years of experience in web development.
                    <br />
                    I have worked as a back-end developer at Entire Thinkers Technology and am currently working as a Full-Stack Developer at the Ministry of Transport and Aviation in Afghanistan contry.
                </p>

                <div className="text-base font-semibold mt-8">My Skiles</div>
                <p className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    React, JavaScript, Vue, Tailwind CSS, Laravel, PHP, Bootstrap, HTML, CSS, Flex-box, CssGrid, MySQL, MongoDB, Git, GitHub, and more.
                </p>
                <div className="text-base font-semibold mt-8">Contect Me</div>
                <div className="text-slate-800 dark:text-gray-300 text-justify pt-4 leading-7">
                    <div className="flex items-start md:items-center gap-2 ">
                        <LuMapPinned className="size-5 text-slate-950 dark:text-white" />
                        <span className="break-all">
                            Kabul Tarafick square 3 street Afghanistan
                        </span>
                    </div>
                    <div className="flex items-center gap-2"><BsEnvelopeAt className="size-5 text-slate-950 dark:text-white" />hassanullahusmani45@gmail.com</div>
                    <div className="flex items-center gap-2"><HiOutlineDevicePhoneMobile className="size-5 text-slate-950 dark:text-white" />+93 767 233 172</div>
                    <a href='https://hassanullahusmani-portfolio.netlify.app' target='_blank' className="flex items-start md:items-center gap-2">
                        <HiOutlineGlobeAlt className="size-6 text-slate-950 dark:text-white" />
                        <span className="break-all">
                            https://hassanullahusmani-portfolio.netlify.app
                        </span>
                    </a>
                </div>
            </div>
        </div >
    )
}
