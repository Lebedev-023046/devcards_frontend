import { ROUTES } from '@/shared/routes';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import ToHome from '/hero/to-home.svg';

export function Hero() {
	return (
		<div className={styles.heroWrapper}>
			<Box color='text-primary' className={styles.contentWrapper}>
				<h1 className={styles.title}>Deckable</h1>
				<h2 className={styles.subtitle}>
					Создавайте и учитесь по собственным карточкам
				</h2>
				<h3 className={styles.description}>
					Интерактивная проверка GPT, статистика прогресса, кастомные колоды
				</h3>
				<Button
					size='2xl'
					maxWidth='300px'
					width='100%'
					rounded='xl'
					asChild
					bg='button-tertiary-gradient'
				>
					<Link to={ROUTES.DECKS()}>
						<img src={ToHome} alt='to-home-icon' /> На главную
					</Link>
				</Button>
			</Box>
		</div>
	);
}
