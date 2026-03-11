import React from "react";
import css from "./Button.module.css";
import Link from "next/link";
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  buttonType?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  href,
  buttonType,
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `${css.Button} ${className}`.trim();
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
