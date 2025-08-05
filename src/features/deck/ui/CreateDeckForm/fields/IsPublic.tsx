import { Checkbox } from '@/shared/ui/checkbox';
import { Controller, useFormContext } from 'react-hook-form';

export const IsPublicField = () => {
	const { control } = useFormContext();

	return (
		<Controller
			name='isPublic'
			control={control}
			defaultValue={true}
			render={({ field }) => (
				<Checkbox
					width={'fit-content'}
					color='text-contrast'
					checked={field.value}
					onChange={e => field.onChange((e.target as HTMLInputElement).checked)}
				>
					публичная колода
				</Checkbox>
			)}
		/>
	);
};
