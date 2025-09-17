import { FormProvider, useForm } from "react-hook-form";
import profileImg from "../../assets/hassan.jpeg";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, profileImgSchema, userPasswordSchema } from "../../types/zodSchema";
import z from "zod";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BiCloud, BiUser } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
import { MdAdminPanelSettings, MdMarkEmailRead } from "react-icons/md";
import { updateFullName, updatePassword, updateProfileImge } from "../../redux/slices/profile/profileSlice";
import { useEffect, useState } from "react";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";
import { setUser } from "../../redux/slices/auth/authSlice";
import RHFFileInput from "../../components/form/RHFFileInput";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import { useTranslation } from "react-i18next";


export default function Profile() {
    const { t } = useTranslation("main");
    const dispatch = useAppDispatch();
    const { user, checkingSession } = useAppSelector(state => state.auth);
    const { nameloading, passwordloading, profileImgloading, nameError, passwordError, profileImgError, successProfileImg, successPassword, updatedUser } = useAppSelector(state => state.profile);

    // Toasts for name Update
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
        if (successPassword) toastSuccess("Password updated successfully!");
        if (passwordError) toastError(passwordError);
    }, [successPassword, passwordError]);

    // Toasts for profile image Update.
    useEffect(() => {
        if (successProfileImg) toastSuccess("Your profile image updated successfully!");
        if (profileImgError) toastError(profileImgError);
    }, [successProfileImg, profileImgError]);

    type NameFormData = z.infer<typeof nameSchema>
    type PasswordFormData = z.infer<typeof userPasswordSchema>
    type ProfileFormData = z.infer<typeof profileImgSchema>

    const nameDefaultValues = {
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
    }
    const [preview, setPreview] = useState<string | null>(user?.profile || null);


    const nameMethods = useForm<NameFormData>({
        defaultValues: nameDefaultValues,
        resolver: zodResolver(nameSchema)
    });

    const passwordMethods = useForm<PasswordFormData>({
        defaultValues: { new_password: "", confirm_password: "" },
        resolver: zodResolver(userPasswordSchema)
    });
    const profileMethods = useForm<ProfileFormData>({
        defaultValues: { profile: undefined },
        resolver: zodResolver(profileImgSchema)
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



    const onSubmitUpdateProfile = async (data: ProfileFormData) => {

        const profile = data.profile?.[0];

        const publicUrl = await dispatch(updateProfileImge({ profile, id: user!.id })).unwrap();
        setPreview(publicUrl);
        dispatch(setUser({ ...user!, profile: publicUrl }));

    };


    // that is used for show the image preview.
    useEffect(() => {
        const subscription = profileMethods.watch((value) => {
            const fileList = value.profile as FileList;
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                const url = URL.createObjectURL(file);
                setPreview(url);
            }
        });
        return () => subscription.unsubscribe();
    }, [profileMethods]);

    return (
        <>
            {checkingSession ? (<ProfileSkeleton />)
                :
                (<div className='mx-auto mb-14'>

                    <div className=" grid grid-cols-8 gap-8 md:gap-4 xl:gap-8">
                        <div className='col-span-8 md:col-span-4 xl:col-span-3 bg-slate-200 dark:bg-slate-800 p-3 xl:p-8 rounded-2xl shadow-md'>
                            <div className="flex flex-col justify-center items-center">
                                <div className="relative w-30 sm:w-34 md:w-36 lg:w-40 h-30 sm:h-34 md:h-36 lg:h-40 mx-auto rounded-full bg-inherit p-[3px]">
                                    <div className="absolute inset-0 rounded-full custom-gradient animate-spin-slow"></div>
                                    <img
                                        className="relative w-full h-full  rounded-full object-cover bg-slate-50 dark:bg-slate-900"
                                        src={user?.profile || profileImg}
                                        alt="profile"
                                    />
                                </div>
                                <div className='flex flex-col gap-3 bg-slate-300/50 dark:bg-slate-900/30 shadow border border-slate-300 dark:border-slate-700 rounded-xl w-full px-1 md:px-1 lg:px-5 py-5 mt-4'>
                                    <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                        <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><BiUser className="size-6" />{t("Full name")} :</span>
                                        <span className="text-slate-800 dark:text-slate-200">{user?.first_name}{" "}{user?.last_name}</span>
                                    </div>
                                    <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                        <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><MdMarkEmailRead className="size-6" />{t("Email address")} :</span>
                                        <span className="text-slate-800 dark:text-slate-200">{user?.email}</span>
                                    </div>
                                    <div className='flex justify-start gap-1 xl:gap-4 text-nowrap'>
                                        <span className="flex justify-center items-center gap-1 text-sm font-semibold text-teal-500"><MdAdminPanelSettings className="size-6" />{t("Role")} :</span>
                                        <span className="text-slate-800 dark:text-slate-200">
                                            {user?.role_id === 1 && t("Admin")}
                                            {user?.role_id === 2 && t("Team Member")}
                                            {user?.role_id === 3 && t("User")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-8 md:col-span-4 xl:col-span-5 bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                            <div className="text-xl font-bold text-center m-4">{t("Change the Profile Information")}</div>
                            <FormProvider {...nameMethods}>
                                <form className="pt-6" method="post" onSubmit={nameMethods.handleSubmit(onSubmitUpdateFullName)} noValidate>
                                    <RHFInput name="first_name" label={t("First Name")} placeholder={t("Enter your first name.")} />
                                    <RHFInput name="last_name" label={t("Last Name")} placeholder={t("Enter your last name.")} />
                                    <div className='flex justify-center items-center my-2'>
                                        <Button
                                            type="submit"
                                            className={`button-style`}
                                            disabled={nameloading}
                                        >
                                            {nameloading ? "Loading..." : t("Seve Changes")}
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
                                        <div className="text-lg font-semibold">{t("Change Password Form")}</div>
                                    </div>
                                    <div className='border-t-2 border-dotted border-pink-500'></div>
                                </div>
                            </div>
                            <FormProvider {...passwordMethods}>
                                <form method="post" onSubmit={passwordMethods.handleSubmit(onsubmitUpdatePassword)} className='grid grid-cols-8 xl:grid-cols-7 gap-3 lg:gap-4 2xl:gap-6 items-center justify-center' >

                                    <div className="col-span-8 md:col-span-4 xl:col-span-3">
                                        <RHFInput type="password" name="new_password" label={t("New password")} placeholder={t("Enter new password")} />
                                    </div>
                                    <div className="col-span-8 md:col-span-4 xl:col-span-3">
                                        <RHFInput type="password" name="confirm_password" label={t("Confirm password")} placeholder={t("Enter confirm password")} />
                                    </div>
                                    <div className='col-span-8 xl:col-span-1 flex justify-center items-center  text-center text-nowrap'>
                                        <Button
                                            type="submit"
                                            className="xl:h-11 mt-0"
                                            disabled={passwordloading}
                                        >

                                            {passwordloading ? "Loading..." : t("Change Password")}
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>

                    <div className='my-7'>
                        <div className="bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                            <div className="flex justify-start gap-2 text-left mb-1">
                                <IoImagesOutline className='size-6' />
                                <div className="text-lg font-semibold">{t("Uplode Profile Image")}</div>
                            </div>
                            <div className='w-56 mb-8 border-t-2 border-dotted border-sky-500 '></div>
                            <FormProvider {...profileMethods}>
                                <form method="post" onSubmit={profileMethods.handleSubmit(onSubmitUpdateProfile)} noValidate>
                                    <div className="grid grid-cols-5 gap-2 lg:gap-4 xl:gap-2 justify-end items-center">
                                        <div className="col-span-5 lg:col-span-4">
                                            <label htmlFor="profile" className="block text-sm font-semibold m-1 md:m-3">{t("Profile")}</label>
                                            <label htmlFor="profile"
                                                className="flex flex-col items-center justify-center bg-slate-300/60 dark:bg-slate-900 w-full h-24 md:h-32 border-2 border-slate-400 border-dashed hover:border-dotted rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 mb-2">
                                                <div className="flex flex-col items-center justify-center md:pt-5 md:pb-6">
                                                    <BiCloud className='size-8 md:size-12 text-slate-600 dark:text-slate-400' />
                                                    <p className="mb-2 text-xs md:text-sm text-slate-500 font-semibold">{t("Click and uplode the profile")}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{t("JPG, JPEG, PNG or WEBP")}</p>
                                                </div>

                                            </label>
                                            <RHFFileInput
                                                name="profile"
                                                id="profile"
                                                className="hidden!"
                                            />
                                        </div>
                                        <div className="col-span-5 lg:col-span-1 flex justify-center items-center md:mt-1.5  mb-4 lg:mb-0">
                                            <div className="flex items-center justify-center size-22 md:size-33 border border-dashed border-slate-400 rounded-xl overflow-hidden">
                                                {preview ? (
                                                    <img src={preview} alt="Profile Preview" className="size-22 md:size-33 object-cover" />
                                                ) :
                                                    <div className="size-22 md:size-33 bg-slate-300/60 dark:bg-slate-900 text-sm text-center font-semibold flex justify-center items-center ">
                                                        {t("Preview Image")}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center items-center '>
                                        <Button
                                            type="submit"
                                            disabled={profileImgloading}
                                        >
                                            {profileImgloading ? "Loading..." : t("Changes Profile")}
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>

                </div >)
            }
        </>
    )

}
