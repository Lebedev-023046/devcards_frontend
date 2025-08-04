import { Field as ChakraField } from '@chakra-ui/react';
import * as React from 'react';

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
	label?: React.ReactNode;
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	optionalText?: React.ReactNode;
}

export const inputDefaultProps = {
	rounded: 'lg',
	bg: 'bg-secondary',
	color: 'text-secondary',
	_placeholder: {
		color:
			'color-mix(in srgb, var(--chakra-colors-text-secondary) 50%, transparent)',
	},
	border:
		'1px solid color-mix(in srgb, var(--chakra-colors-text-contrast) 20%, transparent)',
};

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
	function Field(props, ref) {
		const { label, children, helperText, errorText, optionalText, ...rest } =
			props;

		return (
			<ChakraField.Root ref={ref} {...rest} color={'text-contrast'}>
				{label && (
					<ChakraField.Label>
						{label}
						<ChakraField.RequiredIndicator fallback={optionalText} />
					</ChakraField.Label>
				)}
				{children}
				{helperText && (
					<ChakraField.HelperText>{helperText}</ChakraField.HelperText>
				)}

				{errorText && (
					<ChakraField.ErrorText color={'error'} fontSize='sm'>
						{errorText}
					</ChakraField.ErrorText>
				)}
			</ChakraField.Root>
		);
	},
);
