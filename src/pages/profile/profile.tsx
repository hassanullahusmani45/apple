import { FormProvider, useForm } from "react-hook-form";
import profileImg from "../../assets/hassan.jpeg";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/ui/Button";
import { useAppSelector } from "../../hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { visitorSchema } from "../../types/zodSchema";
import z from "zod";
import { HiLockClosed } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { BiCloud } from "react-icons/bi";


export default function Profile() {

    const { user } = useAppSelector(state => state.auth);
    console.log("USer Data :", user);

    type FormData = z.infer<typeof visitorSchema>

    const defaultValues = {
        email: '',
        full_name: ''
    }

    const methods = useForm({
        defaultValues,
        resolver: zodResolver(visitorSchema)
    });

    const onSubmit = (data: FormData) => {
        console.info(data);
    }

    return (
        <div className='grid grid-cols-5 gap-10 py-16'>

            <div className='col-span-2 bg-slate-800/80 p-8 rounded-2xl shadow-xl'>
                <div className="flex flex-col justify-center items-center">
                    <img className=" w-40 h-40 p-2 rounded-full border-4 border-dotted border-teal-200" src={user?.profile || profileImg} />
                    <div className='w-1/2 my-6 border-t-2 border-dotted border-emerald-300 '></div>
                    <div className=' flex flex-col gap-4'>
                        <div className='text-lg font-medium font-serif text-teal-500 gap-x-4'>Name : <span className='text-base font-mono text-emerald-300'>{user?.first_name}</span></div>
                        <div className='text-lg font-medium font-serif text-teal-500 gap-x-4'>Email : <span className='text-base font-mono text-emerald-300'>{user?.last_name}</span></div>
                        <div className='text-lg font-medium font-serif text-teal-500 gap-x-4'>Role : <span className='text-base font-mono text-emerald-300'>
                            {user?.role_id === 1 && "Admin"}
                            {user?.role_id === 2 && "Team Member"}
                            {user?.role_id === 3 && "User"}
                        </span></div>
                    </div>
                </div>
            </div>

            <div className="col-span-3 bg-slate-800/80 py-8 px-16 rounded-2xl shadow-xl">
                <div className="text-xl font-bold text-center mb-4">Change the Profile Information</div>
                <FormProvider {...methods}>
                    <form className="pt-6" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                        <RHFInput name="full_name" label="Full Name" placeholder="Enter your full name. " />
                        <RHFInput name="email" label="Email" type="email" placeholder="user@gmail.com" />
                        <div className='flex justify-center items-center mt-5'>
                            <Button
                                type="submit"
                                className={`button-style`}
                                disabled={false}
                            >
                                Seve Changes
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>


            <div className='appear col-span-5 mt-7'>
                <div className="bg-slate-800 p-8 rounded-2xl shadow-xl">
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <div className="flex gap-2 text-lg font-bold text-left mb-2"><HiLockClosed className='size-6' />Change Password Form</div>
                            <div className='border-t-2 border-dotted border-orange-500'></div>
                        </div>
                    </div>
                    <FormProvider {...methods}>
                        <form className='grid grid-cols-10 gap-6 items-center justify-center' onSubmit={() => { }}>
                            <div className="col-span-4">
                                <RHFInput className="" type="password" name="password" label="Old password" placeholder="old password" />
                            </div>
                            <div className="col-span-4">
                                <RHFInput className="col-span-3" type="password" name="password" label="New password" placeholder="new password" />
                            </div>
                            <div className='col-span-2'>
                                <Button type="submit">
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>

            <div className='appear col-span-5 mt-7'>
                <div className="bg-slate-800/80 p-8 rounded-2xl shadow-xl">
                    <div className="flex gap-2 text-lg font-bold text-left mb-2 text-sky-500"><FaUserCircle className='size-8' /> Uplode Profile Image</div>
                    <div className='w-1/4 mb-8 border-t-2 border-dotted border-sky-300 '></div>

                    <form className='grid grid-cols-8' onSubmit={() => { }}  >

                        <div className='col-span-6'>
                            <label htmlFor="profile" className="block mb-1 ms-2 text-sm font-medium text-slate-100">Profile</label>
                            <label htmlFor="profile"
                                className="flex flex-col items-center justify-center bg-slate-900 w-full h-32 border-2 border-slate-300 border-dashed hover:border-dotted rounded-xl cursor-pointer  hover:bg-slate-800/95">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <BiCloud className='size-12' />
                                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click and uplode the profile</span> or drag and drop </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">SVG , JPG , IMG</p>
                                </div>
                                <input id="profile" type="file" className="hidden" onChange={(event) => {
                                    // setImage(event.target.files[0]);
                                }} />
                            </label>
                        </div>
                        <div className='col-span-2 flex justify-center items-end'>
                            <Button type="submit">Save Profile</Button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}
