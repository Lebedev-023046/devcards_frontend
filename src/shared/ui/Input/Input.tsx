import { clsx } from "clsx";
import { forwardRef } from "react";
import styles from "./Input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input className={clsx(styles.input, className)} ref={ref} {...props} />
		);
	},
);
Input.displayName = "Input";
