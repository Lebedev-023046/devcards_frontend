import { Checkbox } from '@/shared/ui/checkbox';
import { Field, inputDefaultProps } from '@/shared/ui/field';
import {
	Box,
	CloseButton,
	FileUpload,
	Input,
	InputGroup,
	Stack,
} from '@chakra-ui/react';
import { File } from 'lucide-react';
import styles from './CreateDeckForm.module.css';
import { TagsSelect } from './TagsSelect';

export function CreateDeckForm() {
	return (
		<Box as='form' role='form' mt={6} className={styles.form}>
			<Stack gap={4}>
				<Field
					// invalid={!!errors.email?.message}
					label='Название'
					// errorText={errors.email?.message}
				>
					<InputGroup>
						<Input
							// {...register('email')}
							placeholder='название'
							{...inputDefaultProps}
						/>
					</InputGroup>
				</Field>
				<Field
					// invalid={!!errors.email?.message}
					label='Описание'
					// errorText={errors.email?.message}
				>
					<InputGroup>
						<Input
							// {...register('email')}
							placeholder='oписание'
							{...inputDefaultProps}
						/>
					</InputGroup>
				</Field>
				{/* should be checkbox */}
				<Checkbox color='text-primary'>публичная колода</Checkbox>

				<FileUpload.Root
					accept='.png, .jpg, .jpeg, .webp, .svg'
					color='text-primary'
					gap='0.5rem'
					maxWidth='100%'
				>
					<FileUpload.HiddenInput />
					<FileUpload.Label>Загрузите фон колоды</FileUpload.Label>
					<InputGroup
						startElement={
							<File size={20} color='var(--chakra-colors-text-primary)' />
						}
						endElement={
							<FileUpload.ClearTrigger asChild>
								<CloseButton
									color='text-primary'
									me='-1'
									size='xs'
									variant='plain'
									focusVisibleRing='inside'
									focusRingWidth='2px'
									pointerEvents='auto'
								/>
							</FileUpload.ClearTrigger>
						}
					>
						<Input asChild>
							<FileUpload.Trigger>
								<FileUpload.FileText
									color='text-primary'
									fallback='Выберите файл'
								/>
							</FileUpload.Trigger>
						</Input>
					</InputGroup>
				</FileUpload.Root>
				<TagsSelect />
			</Stack>

			{/* should be additional fields */}
			{/* <Input inputSize='lg' placeholder='Cards' /> */}
		</Box>
	);
}
