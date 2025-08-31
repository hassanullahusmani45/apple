import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  className?: string;
}

const Button = ({ type = "button", children, className, ...props }: ButtonProps) => {

  return (
    <button
      type={type}
      {...props}
      className={`button-style ${className}`}
    >
      {children}
    </button>
  )
}

export default Button;