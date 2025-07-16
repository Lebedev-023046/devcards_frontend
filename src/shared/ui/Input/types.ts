import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: boolean;
	helperText?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	fullWidth?: boolean;
	labelPersistent?: boolean;
	variant?: 'outline' | 'filled' | 'underline';
	onStartIconClick?: React.MouseEventHandler;
	onEndIconClick?: React.MouseEventHandler;
}
