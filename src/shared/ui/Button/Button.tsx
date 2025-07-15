import cn from 'clsx';
import type React from 'react';
import { Tooltip } from '../Tooltip';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

export function Button<T extends React.ElementType = 'button'>({
	as,
	...props
}: ButtonProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
	const { iconOnly, 'aria-label': ariaLabel } = props;
	if (iconOnly && !ariaLabel) {
		throw new Error(
			'Button(iconOnly) requires an aria-label for accessibility',
		);
	}

	const {
		children,
		type = 'button',
		variant = 'primary',
		size = 'md',
		startIcon,
		endIcon,
		disabled,
		loading,
		fullWidth,
		shape = 'rounded',
		tooltip,
		animationType = 'none',
		onClick,
		...rest
	} = props;

	const Component = as || 'button';

	const className = cn(
		styles.root,
		styles[`size-${size}`],
		styles[`variant-${variant}`],
		styles[`shape-${shape}`],
		fullWidth && styles.fullWidth,
		loading && styles.loading,
		iconOnly && styles.iconOnly,
		animationType !== 'none' && styles[`animation-${animationType}`],
	);

	const component = (
		<Component
			type={type}
			className={className}
			onClick={onClick}
			disabled={disabled || loading}
			aria-disabled={disabled || loading}
			aria-busy={loading}
			aria-label={iconOnly ? ariaLabel : undefined}
			{...rest}
		>
			{loading && <span className={styles.spinner} aria-hidden='true' />}
			{!loading && startIcon && (
				<span className={styles.icon}>{startIcon}</span>
			)}

			<span className={styles.label}>{loading ? 'Loading...' : children}</span>

			{!loading && endIcon && <span className={styles.icon}>{endIcon}</span>}
		</Component>
	);

	return tooltip ? <Tooltip content={tooltip}>{component}</Tooltip> : component;
}
