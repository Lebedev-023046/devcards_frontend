import cn from 'clsx';
import { forwardRef, useId } from 'react';
import styles from './Input.module.css';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error = false,
			helperText,
			startIcon,
			endIcon,
			onStartIconClick,
			onEndIconClick,
			fullWidth = false,
			labelPersistent = false,
			variant = 'outline',
			className,
			style,
			...rest
		},
		ref,
	) => {
		const id = useId();

		const classNames = cn(
			styles.root,
			variant === 'outline' && styles.variantOutline,
			variant === 'filled' && styles.variantFilled,
			variant === 'underline' && styles.variantUnderline,
			labelPersistent && styles.labelPersistent,
			fullWidth && styles.fullWidth,
			className,
		);

		return (
			<div className={classNames} style={style}>
				<div className={cn(styles.wrapper, error && styles.error)}>
					{startIcon &&
						(onStartIconClick ? (
							<button
								type='button'
								className={cn(styles.iconButton, styles.iconLeft)}
								onClick={onStartIconClick}
							>
								{startIcon}
							</button>
						) : (
							<span className={styles.iconLeft}>{startIcon}</span>
						))}

					{label && (
						<label className={cn(styles.label)} htmlFor={rest.id ?? id}>
							{label}
						</label>
					)}
					<input
						id={rest.id ?? id}
						ref={ref}
						className={cn(
							styles.input,
							startIcon && styles.hasLeftIcon,
							endIcon && styles.hasRightIcon,
						)}
						aria-invalid={error}
						aria-describedby={error ? `${id}-helper` : undefined}
						{...rest}
					/>

					{endIcon &&
						(onEndIconClick ? (
							<button
								type='button'
								className={cn(styles.iconButton, styles.iconRight)}
								onClick={onEndIconClick}
							>
								{endIcon}
							</button>
						) : (
							<span className={styles.iconRight}>{endIcon}</span>
						))}

					<div className={cn([error && styles.error, styles.helperText])}>
						{helperText}
					</div>
				</div>
			</div>
		);
	},
);

Input.displayName = 'Input';
