import { IoMdEyeOff, IoIosEye } from "react-icons/io";
import AuthLayout from "../../components/AuthLayout";
import { RegisterSchema } from "../../types/zodSchema";
import z from "zod";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInput from "../../components/form/RHFInput";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { FiSquare } from "react-icons/fi";
import { FaSquareCheck } from "react-icons/fa6";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registeration, resetStatus } from "../../redux/slices/auth/authSlice";
import { toastSuccess } from "../../utils/toastSuccess";
import { toastError } from "../../utils/toastError";
import { useNavigate } from "react-router-dom";
import { splitFullName } from "../../utils/splitFullName";



export default function Register() {
    const [regosterBody] = useAutoAnimate<HTMLFormElement>();
    const [eyeWrapper] = useAutoAnimate<HTMLDivElement>();
    const [isShow, setIsShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const { success, loading, error } = useAppSelector((state) => state.auth);

    type FormData = z.infer<typeof RegisterSchema>
    console.log("Success:", success);

    const defaultValues = {
        full_name: '',
        email: '',
        password: ''
    }

    const methods = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = (data: FormData) => {
        const { full_name, email, password } = data;

        const { first_name, last_name } = splitFullName(full_name);

        const registerData = {
            first_name,
            last_name,
            email,
            password
        }

        dispatch(registeration(registerData));
    }


    useEffect(() => {
        if (success) {
            toastSuccess("You are successfully Register 🤣.");
            methods.reset();
            dispatch(resetStatus());
            // navigate('/');
        }
        if (error) {
            toastError(error);
            dispatch(resetStatus());
        }
    }, [success, error, navigate, methods, dispatch]);


    return (
        <AuthLayout
            page="Register"
            information="Already have an account"
        >
            <FormProvider {...methods}>
                <form ref={regosterBody} onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <RHFInput name="full_name" label="Full Name" placeholder="Enter your full name. " />
                    <RHFInput name="email" label="Email" type="email" placeholder="user@gmail.com" />
                    <div ref={eyeWrapper} className=" relative">
                        <RHFInput name="password" label="Password" type={isShow ? "text" : "password"} placeholder="************" />
                        <span className="absolute flex justify-center items-center  w-10 h-10 end-2 top-7 2xl:top-8 cursor-pointer" onMouseOver={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
                            {isShow ? <IoMdEyeOff className="size-6 text-green-600 dark:text-orange-500" /> : <IoIosEye className="size-6" />}
                        </span>
                    </div>
                    <div onClick={() => setIsShow(prev => !prev)} className="flex justify-start items-center w-fit gap-1.5 text-slate-500 dark:text-slate-400 text-sm my-3 hover:cursor-pointer">
                        {isShow ? <FaSquareCheck className="size-5 text-green-600 dark:text-orange-500" /> : <FiSquare className="size-5 text-green-600 dark:text-orange-500" />}
                        show the password.
                    </div>

                    <div className="flex justify-center items-center">
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading ..." : "Register"}

                        </Button>
                    </div>
                </form>
            </FormProvider>

        </AuthLayout>
    )
}
