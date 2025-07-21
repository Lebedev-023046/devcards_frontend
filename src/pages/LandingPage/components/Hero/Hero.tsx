import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import ToHome from '/hero/to-home.svg';

export function Hero() {
	return (
		<div className={styles.heroWrapper}>
			<div className={styles.contentWrapper}>
				<h1 className={styles.title}>Deckable</h1>
				<h2 className={styles.subtitle}>
					Создавайте и учитесь по собственным карточкам
				</h2>
				<h3 className={styles.description}>
					Интерактивная проверка GPT, статистика прогресса, кастомные колоды
				</h3>
				<Button
					as={Link}
					to={ROUTES.DECKS()}
					className={styles.button}
					size='lg'
					endIcon={<img src={ToHome} alt='to-home-icon' />}
				>
					На главную
				</Button>
			</div>
		</div>
	);
}
