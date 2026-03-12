import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { forwardRef } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?: "primary" | "secondary" | "ghost" | "outline";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			asChild,
			variant = "primary",
			size = "md",
			fullWidth = false,
			className,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={clsx(
					styles.button,
					styles[variant],
					styles[size],
					fullWidth && styles.fullWidth,
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";
