import { LuMapPinned } from 'react-icons/lu';
import hassanProfile from '../../assets/hassan.jpeg';
import { BsEnvelopeAt } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile, HiOutlineGlobeAlt } from 'react-icons/hi2';
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInput from '../../components/form/RHFInput';
import { FormProvider, useForm } from 'react-hook-form';



export default function ContactUs() {

    const schema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters!"),
        email: z.string().nonempty("Email is required").email({ message: "Invalid email!" }),
        message: z.string().min(5, "The message must be at least 5 characters!").max(2000, "The message is over 2000 characters!"),
        subject: z.string().min(3, "Subject must be at least 3 characters!").max(200, "Subject must be under 200 characters!")
    });

    type FormData = z.infer<typeof schema>
    const defaultValues = {
        name: '',
        email: '',
        message: '',
        subject: '',
    };

    const methods = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        console.log("Data", data);
    }

    return (

        <div className=" grid md:grid-cols-2 gap-20 my-10">
            <div className="col-span-1 h-fit bg-slate-200 dark:bg-slate-800 p-8 my-8 rounded-2xl shadow-md">
                <div className="text-xl font-bold text-center mb-4">Contact As</div>
                <div>
                    {/* {error && <p className=" flex gap-2 items-center text-red-400"><ExclamationTriangleIcon className='size-5 text-red-500' /> {error}</p>} */}
                </div>
                <FormProvider {...methods}>
                    <form className="pt-6" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <RHFInput name="name" label="Name" placeholder='Enter your name' />
                        <RHFInput name="email" label="Email" type="email" placeholder='example@gmail.com' />
                        <RHFInput name="subject" label="Subject" placeholder='write your subject' />
                        <RHFInput name="message" label="Message" type='textearea' />

                        <button
                            type="submit"
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            Send
                        </button>
                    </form>
                </FormProvider>
            </div>

            <div className="relative col-span-1 bg-slate-200 dark:bg-slate-800 p-8 my-8 rounded-2xl shadow-md">

                <div className="flex bg-slate-100 dark:bg-slate-900 justify-center items-center w-42 h-42 rounded-full border-0 absolute mx-auto right-0 left-0 -inset-y-20">
                    <img className=" min-w-42 min-h-42 p-2.5 rounded-full "
                        src={hassanProfile} />
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
        </div>
    )
}
