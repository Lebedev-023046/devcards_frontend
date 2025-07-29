import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './DecksPage.module.css';

function DecksPage() {
	const navigate = useNavigate();

	return (
		<section className={styles.deckPageWrapper}>
			<div className={styles.sectionHeader}>
				<h2>Публичные колоды</h2>
				<div className={styles.sectionControls}>
					<Button
						variant='secondary'
						startIcon={<SquarePen />}
						onClick={() =>
							navigate(ROUTES.CREATE_DECK(), { state: { isPrivate: false } })
						}
					>
						Создать колоду
					</Button>
				</div>
			</div>
		</section>
	);
}

export default DecksPage;
