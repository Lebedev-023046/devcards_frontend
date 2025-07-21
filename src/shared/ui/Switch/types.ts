export interface SwitchProps {
	checked?: boolean;
	onChange?: (
		checked: boolean,
		event: React.ChangeEvent<HTMLInputElement>,
	) => void;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	tooltip?: boolean;
	checkedIcon?: React.ReactNode;
	uncheckedIcon?: React.ReactNode;
	className?: string;
	[key: string]: any;
}
