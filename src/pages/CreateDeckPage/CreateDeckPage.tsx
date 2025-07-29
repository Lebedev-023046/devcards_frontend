import { CreateDeckForm } from '@/features/deck/ui/CreateDeckForm';
import styles from './CreateDeckPage.module.css';

function CreateDeckPage() {
	return (
		<section>
			<h1 className={styles.title}>Создать колоду</h1>
			<CreateDeckForm />
		</section>
	);
}

export default CreateDeckPage;
