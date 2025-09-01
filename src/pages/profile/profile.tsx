import { FormProvider, useForm } from "react-hook-form";
import profileImg from "../../assets/hassan.jpeg";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, userPasswordSchema } from "../../types/zodSchema";
import z from "zod";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BiCloud, BiUser } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
import { MdAdminPanelSettings, MdMarkEmailRead } from "react-icons/md";
import { updateFullName, updatePassword } from "../../redux/slices/profile/profileSlice";
import { useEffect } from "react";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";
import { setUser } from "../../redux/slices/auth/authSlice";


export default function Profile() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const { nameloading, passwordloading, nameError, passwordError, success, updatedUser } = useAppSelector(state => state.profile);

    useEffect(() => {
        if (updatedUser!!) {
            toastSuccess("Your first or last name is successfuly updated.");
        }
        if (nameError!!) {
            toastError("Something was wrong. please try agin later!")
        }
    }, [nameError, updatedUser]);

    // Toasts for Password Update
    useEffect(() => {
        if (success) toastSuccess("Password updated successfully!");
        if (passwordError) toastError(passwordError);
    }, [success, passwordError]);

    type NameFormData = z.infer<typeof nameSchema>
    type PasswordFormData = z.infer<typeof userPasswordSchema>

    const nameDefaultValues = {
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
    }


    const nameMethods = useForm<NameFormData>({
        defaultValues: nameDefaultValues,
        resolver: zodResolver(nameSchema)
    });

    const passwordMethods = useForm<PasswordFormData>({
        defaultValues: { new_password: "", confirm_password: "" },
        resolver: zodResolver(userPasswordSchema)
    });

    const onSubmitUpdateFullName = async (formData: NameFormData) => {

        try {
            const visitorPayload = await dispatch(
                updateFullName({
                    id: user!.id,
                    first_name: formData.first_name.trim(),
                    last_name: formData.last_name.trim(),
                })
            ).unwrap();

            dispatch(setUser({
                ...user!,
                first_name: visitorPayload.first_name,
                last_name: visitorPayload.last_name,
            }));

            nameMethods.reset({
                first_name: visitorPayload.first_name,
                last_name: visitorPayload.last_name,
            });
        } catch (err) {
            toastError("Failed to update name. Try again.");
        }
    };


    const onsubmitUpdatePassword = async (formData: PasswordFormData) => {
        try {
            await dispatch(updatePassword(formData.new_password)).unwrap();
            passwordMethods.reset();
        } catch (err) {
            toastError("Failed to update password. Try again.");
        }
    }

    return (
        <div className='mx-auto mb-14'>

            <div className=" grid grid-cols-8 gap-8 md:gap-4 xl:gap-8">
                <div className='col-span-8 md:col-span-4 xl:col-span-3 bg-slate-200 dark:bg-slate-800 p-3 xl:p-8 rounded-2xl shadow-md'>
                    <div className="flex flex-col justify-center items-center">
                        <div className="relative w-40 h-40 mx-auto rounded-full bg-inherit p-[3px]">
                            <div className="absolute inset-0  rounded-full custom-gradient animate-spin-slow"></div>
                            <img
                                className="relative w-full h-full  rounded-full object-cover"
                                src={profileImg}
                                alt="profile"
                            />
                        </div>
                        <div className='flex flex-col gap-3 bg-slate-300/50 dark:bg-slate-900/30 shadow border border-slate-300 dark:border-slate-700 rounded-xl w-full px-4 md:px-1 lg:px-5 py-5 mt-4'>
                            <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><BiUser className="size-6" />Full name :</span>
                                <span className="text-slate-800 dark:text-slate-200">{user?.first_name}{" "}{user?.last_name}</span>
                            </div>
                            <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><MdMarkEmailRead className="size-6" />Email address :</span>
                                <span className="text-slate-800 dark:text-slate-200">{user?.email}</span>
                            </div>
                            <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><MdAdminPanelSettings className="size-6" />Role :</span>
                                <span className="text-slate-800 dark:text-slate-200">
                                    {user?.role_id === 1 && "Admin"}
                                    {user?.role_id === 2 && "Team Member"}
                                    {user?.role_id === 3 && "User"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-8 md:col-span-4 xl:col-span-5 bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className="text-xl font-bold text-center m-4">Change the Profile Information</div>
                    <FormProvider {...nameMethods}>
                        <form className="pt-6" method="post" onSubmit={nameMethods.handleSubmit(onSubmitUpdateFullName)} noValidate>
                            <RHFInput name="first_name" label="First Name" placeholder="Enter your first name. " />
                            <RHFInput name="last_name" label="Last Name" placeholder="Enter your last name. " />
                            <div className='flex justify-center items-center my-2'>
                                <Button
                                    type="submit"
                                    className={`button-style`}
                                    disabled={nameloading}
                                >
                                    {nameloading ? "Loading..." : "Seve Changes"}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>

            <div className='my-7'>
                <div className="bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <div className="flex gap-2  text-left mb-2">
                                <TbPasswordFingerprint className='size-7' />
                                <div className="text-lg font-semibold">Change Password Form</div>
                            </div>
                            <div className='border-t-2 border-dotted border-pink-500'></div>
                        </div>
                    </div>
                    <FormProvider {...passwordMethods}>
                        <form method="post" onSubmit={passwordMethods.handleSubmit(onsubmitUpdatePassword)} className='grid grid-cols-8 xl:grid-cols-7 gap-3 lg:gap-4 2xl:gap-6 items-center justify-center' >

                            <div className="col-span-8 md:col-span-4 xl:col-span-3">
                                <RHFInput type="password" name="new_password" label="New password" placeholder="new password" />
                            </div>
                            <div className="col-span-8 md:col-span-4 xl:col-span-3">
                                <RHFInput type="password" name="confirm_password" label="Confirm password" placeholder="confirm password" />
                            </div>
                            <div className='col-span-8 xl:col-span-1 flex justify-center items-center  text-center text-nowrap'>
                                <Button
                                    type="submit"
                                    className="xl:h-11 mt-0"
                                    disabled={passwordloading}
                                >

                                    {passwordloading ? "Loading..." : "Change Password"}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>

            <div className='my-7'>
                <div className="bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className="flex justify-start gap-2 text-left mb-2">
                        <IoImagesOutline className='size-6' />
                        <div className="text-lg font-semibold">Uplode Profile Image</div>
                    </div>
                    <div className='w-1/4 mb-8 border-t-2 border-dotted border-sky-500 '></div>

                    <form onSubmit={() => { }}  >

                        <div className=''>
                            <label htmlFor="profile" className="block text-sm font-semibold m-3">Profile</label>
                            <label htmlFor="profile"
                                className="flex flex-col items-center justify-center bg-slate-300/60 dark:bg-slate-900 w-full h-32 border-2 border-slate-300 border-dashed hover:border-dotted rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <BiCloud className='size-12 text-slate-600 dark:text-slate-400' />
                                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click and uplode the profile</span> or drag and drop </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">WEB_B,SVG , JPG , IMG</p>
                                </div>
                                <input id="profile" type="file" className="hidden" onChange={(event) => {
                                    // setImage(event.target.files[0]);
                                }} />
                            </label>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <Button type="submit">Save Profile</Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
