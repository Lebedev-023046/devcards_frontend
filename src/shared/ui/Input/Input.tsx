import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useId } from 'react';
import styles from './Input.module.css';
import type { InputProps } from './types';

const helperVariants = {
	hidden: {
		opacity: 0,
		y: 8,
		height: 0,
		transition: {
			opacity: { duration: 0.2 },
			y: { duration: 0.2 },
			height: { duration: 0.2 },
		},
	},
	visible: {
		opacity: 1,
		y: 4,
		height: 'auto',
		transition: {
			opacity: { duration: 0.3 },
			y: { duration: 0.3 },
			height: { duration: 0.3 },
		},
	},
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			inputSize = 'md',
			error = false,
			helperText,
			startIcon,
			endIcon,
			fullWidth = false,
			labelPersistent = false,
			variant = 'outline',
			onStartIconClick,
			onEndIconClick,
			className,
			style,
			...rest
		},
		ref,
	) => {
		const id = useId();

		const classNames = cn(
			styles.root,
			labelPersistent && styles.labelPersistent,
			fullWidth && styles.fullWidth,
			className,
		);

		return (
			<div className={classNames} style={style}>
				<div className={cn(styles.wrapper)}>
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
							styles[`size-${inputSize}`],
							styles[`variant-${variant}`],
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
				</div>
				<AnimatePresence initial={false}>
					{helperText && (
						<motion.div
							key='helper'
							className={styles.helperText}
							variants={helperVariants}
							initial='hidden'
							animate={error ? 'visible' : 'hidden'}
							exit='hidden'
							aria-live='polite'
						>
							{helperText}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	},
);

Input.displayName = 'Input';
