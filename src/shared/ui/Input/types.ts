import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	inputSize?: 'sm' | 'md' | 'lg';
	label?: string;
	error?: boolean;
	helperText?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	fullWidth?: boolean;
	labelPersistent?: boolean;
	variant?: 'primary' | 'secondary' | 'outline' | 'filled' | 'underline';
	onStartIconClick?: React.MouseEventHandler;
	onEndIconClick?: React.MouseEventHandler;
}
