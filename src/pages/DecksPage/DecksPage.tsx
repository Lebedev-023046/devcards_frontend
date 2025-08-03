import { ROUTES } from '@/shared/routes';
import { Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import styles from './DecksPage.module.css';

function DecksPage() {
	const navigate = useNavigate();

	return (
		<section className={styles.deckPageWrapper}>
			<div className={styles.sectionHeader}>
				<Heading color={'text-primary'}>Публичные колоды</Heading>
				<div className={styles.sectionControls}>
					<Button
						bg={'button-primary-gradient'}
						onClick={() => navigate(ROUTES.CREATE_DECK())}
					>
						Создать колоду
					</Button>
				</div>
			</div>
		</section>
	);
}

export default DecksPage;
