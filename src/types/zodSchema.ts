import z from 'zod'

export const ContactUsSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters!"),

    email: z
        .string()
        .nonempty("Email is required!")
        .email({ message: "Invalid email!" }),

    message: z
        .string()
        .min(5, "The message must be at least 5 characters!")
        .max(2000, "The message is over 2000 characters!"),

    subject: z
        .string()
        .min(3, "Subject must be at least 3 characters!")
        .max(200, "Subject must be under 200 characters!")
});


export const RegisterSchema = z.object({
    full_name: z
        .string()
        .nonempty("Full Name is required!")
        .min(3, "Full Name must be at least 3 characters!")
        .max(20, "Full Name cannot exceed 20 characters!"),

    email: z
        .string()
        .nonempty("Email is required!")
        .email({ message: "Invalid email!" }),

    password: z
        .string()
        .nonempty("Password is required!")
        .min(8, "Password must be at least 8 characters!")
        .max(20, "Password cannot exceed 20 characters!"),
});

export const LoginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required!")
        .email({ message: "Invalid email!" }),

    password: z
        .string()
        .nonempty("Password is required!")
        .min(8, "Password must be at least 8 characters!")
        .max(20, "Password cannot exceed 20 characters!"),
});


export const visitorSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required!")
        .email({ message: "Invalid email!" }),

    full_name: z
        .string()
        .nonempty("Full Name is required!")
        .min(3, "Full Name must be at least 3 characters!")
        .max(20, "Full Name cannot exceed 20 characters!"),
});


export const nameSchema = z.object({
    first_name: z
        .string()
        .nonempty("First Name is required!")
        .min(3, "First Name must be at least 3 characters!")
        .max(20, "First Name cannot exceed 20 characters!"),

    last_name: z
        .string()
        .nonempty("Last Name is required!")
        .min(3, "Last Name must be at least 3 characters!")
        .max(20, "Last Name cannot exceed 20 characters!"),
});

export const userPasswordSchema = z.object({
    new_password: z
        .string()
        .nonempty("new password is required!")
        .min(8, "new password must be at least 8 characters!")
        .max(200, "new password cannot exceed 20 characters!"),
    confirm_password: z
        .string()
        .nonempty("confirm password is required!")
        .min(8, "confirm password must be at least 8 characters!")
        .max(200, "confirm password cannot exceed 20 characters!"),
}).refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "new pasword and confirm password is not equle!",
});




export const profileImgSchema = z.object({
    profile: z
        .custom<FileList>(
            (val) => val instanceof FileList && val.length > 0,
            { message: "Please upload image file!" }
        )
        
        .refine(
            (files) =>
                files && /\.(jpg|jpeg|png|webp)$/i.test(files[0]?.name),
            {
                message: "The profile image format must be JPG, JPEG, PNG or WEBP!",
            }
        ),
});



