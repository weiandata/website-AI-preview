import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  ghost: "button-ghost",
};

const sizes: Record<ButtonSize, string> = {
  sm: "button-sm",
  md: "button-md",
  lg: "button-lg",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn("button-base", variants[variant], sizes[size], className);
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
});

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName({ variant, size, className })}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClassName({ variant, size, className })}>
      {children}
    </Link>
  );
}
