import { Field, inputDefaultProps } from '@/shared/ui/field';
import { Input, InputGroup } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

export const TitleField = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			name='title'
			control={control}
			rules={{
				required: 'Введите название',
				maxLength: { value: 50, message: 'Максимум 50 символов' },
				minLength: { value: 2, message: 'Минимум 2 символа' },
			}}
			render={({ field }) => (
				<Field
					label='Название'
					invalid={!!errors.title?.message}
					errorText={errors.title?.message as string}
				>
					<InputGroup>
						<Input placeholder='название' {...field} {...inputDefaultProps} />
					</InputGroup>
				</Field>
			)}
		/>
	);
};
