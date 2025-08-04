import { Field, inputDefaultProps } from '@/shared/ui/field';
import { Input, InputGroup } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

export const DescriptionField = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			name='description'
			control={control}
			render={({ field }) => (
				<Field
					label='Название'
					errorText={errors.description?.message as string}
				>
					<InputGroup>
						<Input placeholder='название' {...field} {...inputDefaultProps} />
					</InputGroup>
				</Field>
			)}
		/>
	);
};
