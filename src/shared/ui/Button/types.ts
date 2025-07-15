import type { ReactNode } from 'react';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonShape = 'pill' | 'rounded' | 'rounded-sm' | 'square';
type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'text'
	| 'link';

type ButtonAnimation =
	| 'none'
	| 'scale'
	| 'ripple'
	| 'lift'
	| 'color'
	| 'combined';

export interface ButtonOwnProps {
	children: ReactNode;
	type?: ButtonType;
	variant?: ButtonVariant;
	size?: ButtonSize;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	iconOnly?: boolean;
	shape?: ButtonShape;
	'aria-label'?: string;
	tooltip?: string;
	animationType?: ButtonAnimation;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonProps<T extends React.ElementType>
	extends ButtonOwnProps {
	as?: T;
}
