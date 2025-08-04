import { inputDefaultProps } from '@/shared/ui/field';
import { CloseButton, FileUpload, Input, InputGroup } from '@chakra-ui/react';
import { File } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

const placeholderColor =
	'color-mix(in srgb, var(--chakra-colors-text-secondary) 20%, transparent)';

export const BgImageField = () => {
	const { control } = useFormContext();

	return (
		<Controller
			name='backgroundImage'
			control={control}
			defaultValue={null}
			render={({ field }) => (
				<FileUpload.Root
					accept='.png, .jpg, .jpeg, .webp, .svg'
					color='text-contrast'
					gap='0.5rem'
					maxWidth='100%'
				>
					<FileUpload.HiddenInput
						onChange={e => {
							const file = e.target.files?.[0] ?? null;
							field.onChange(file);
						}}
						ref={field.ref}
						name={field.name}
					/>
					<FileUpload.Label>Загрузите фон колоды</FileUpload.Label>
					<InputGroup
						startElement={<File size={20} color={placeholderColor} />}
						endElement={
							<FileUpload.ClearTrigger asChild>
								<CloseButton
									color='text-contrast'
									me='-1'
									size='xs'
									variant='plain'
									focusVisibleRing='inside'
									focusRingWidth='2px'
									pointerEvents='auto'
									onClick={() => field.onChange(null)} // сброс
								/>
							</FileUpload.ClearTrigger>
						}
					>
						<Input asChild {...inputDefaultProps}>
							<FileUpload.Trigger>
								<FileUpload.FileText fallback='Выберите файл' />
							</FileUpload.Trigger>
						</Input>
					</InputGroup>
				</FileUpload.Root>
			)}
		/>
	);
};
