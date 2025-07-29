import { Input } from '@/shared/ui/Input';
import { ToggleInput } from '@/shared/ui/ToggleInput';
import styles from './CreateDeckForm.module.css';

export function CreateDeckForm() {
	return (
		<form className={styles.form}>
			<Input inputSize='lg' placeholder='Название' />
			<Input inputSize='lg' placeholder='Описание' />

			{/* should be checkbox */}
			<ToggleInput type='checkbox' label='IsPublic' placeholder='IsPublic' />

			{/* should be upload image (draggable) */}
			<Input inputSize='lg' placeholder='CoverImageUrl' />

			{/* should be select */}
			<Input inputSize='lg' placeholder='Tags' />

			{/* should be additional fields */}
			<Input inputSize='lg' placeholder='Cards' />
		</form>
	);
}
