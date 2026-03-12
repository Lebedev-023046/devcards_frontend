import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";
import { forwardRef } from "react";
import styles from "./Field.module.css";

export interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
	label?: React.ReactNode;
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	required?: boolean;
	htmlFor?: string;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
	(
		{
			label,
			helperText,
			errorText,
			required,
			htmlFor,
			className,
			children,
			...props
		},
		ref,
	) => {
		return (
			<div ref={ref} className={clsx(styles.root, className)} {...props}>
				{label && (
					<LabelPrimitive.Root className={styles.label} htmlFor={htmlFor}>
						{label}
						{required && <span className={styles.required}>*</span>}
					</LabelPrimitive.Root>
				)}
				{children}
				{helperText && !errorText && (
					<span className={styles.helperText}>{helperText}</span>
				)}
				{errorText && <span className={styles.errorText}>{errorText}</span>}
			</div>
		);
	},
);
Field.displayName = "Field";
