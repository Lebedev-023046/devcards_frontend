import cn from 'clsx';
import { forwardRef, type ChangeEvent } from 'react';
import { Tooltip } from '../Tooltip';
import styles from './Switch.module.css';
import type { SwitchProps } from './types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			checked = false,
			checkedIcon,
			uncheckedIcon,
			onChange,
			disabled = false,
			size = 'md',
			label,
			tooltip = false,
			className,
			...rest
		},
		ref,
	) => {
		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			if (disabled) return;
			onChange?.(e.target.checked, e);
		};
		const rootClass = cn(
			styles.switch,
			className,
			disabled && styles.switchDisabled,
			{
				[styles.switchSm]: size === 'sm',
				[styles.switchLg]: size === 'lg',
			},
		);

		const component = (
			<label className={rootClass}>
				<input
					type='checkbox'
					ref={ref}
					checked={checked}
					disabled={disabled}
					className={styles.srOnly}
					onChange={handleChange}
					{...rest}
				/>
				<span
					className={cn(
						styles.track,
						checked && !disabled && styles.trackChecked,
						checked && disabled && styles.trackDisabledChecked,
					)}
				>
					{uncheckedIcon && !checked && (
						<span className={styles.iconUnchecked}>{uncheckedIcon}</span>
					)}
					{checkedIcon && checked && (
						<span className={styles.iconChecked}>{checkedIcon}</span>
					)}
					<span className={cn(styles.thumb, checked && styles.thumbChecked)} />
				</span>
				{label && <span className={styles.label}>{label}</span>}
			</label>
		);

		return tooltip ? (
			<Tooltip content={tooltip}>{component}</Tooltip>
		) : (
			component
		);
	},
);
