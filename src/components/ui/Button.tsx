import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

const Button = ({ type="button", children, ...props }: ButtonProps) => {

  return (
    <button
      type={type}
      {...props}
      className="button-style"
    >
      {children}
    </button>
  )
}

export default Button;