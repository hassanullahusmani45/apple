import z from 'zod'

export const ContactUsSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters!"),
    email: z.string().nonempty("Email is required").email({ message: "Invalid email!" }),
    message: z.string().min(5, "The message must be at least 5 characters!").max(2000, "The message is over 2000 characters!"),
    subject: z.string().min(3, "Subject must be at least 3 characters!").max(200, "Subject must be under 200 characters!")
});