import cn from 'clsx';
import { Star } from 'lucide-react';
import { useState } from 'react';
import styles from './DeckCard.module.css';

export function DeckCard() {
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);

	return (
		<div className={cn(styles.deckCardWrapper, isInfoOpen && styles.open)}>
			<div className={cn(styles.deckSide, styles.front)}>
				<div className={styles.frontHeader}>
					<h3>Название колоды</h3>
					<Star
						size='1.5rem'
						className={cn(styles.favorite, isMarkedAsFavorite && styles.rotate)}
						fill={isMarkedAsFavorite ? 'var(--color-favorite)' : 'none'}
						onClick={() => setIsMarkedAsFavorite(p => !p)}
					/>
				</div>

				<div>Карт в колоде: 22</div>
				<div>Теги: здоровье, психология</div>

				{/* <Button
					className={styles.deckControl}
					animationType='ripple'
					endIcon={<ArrowRight />}
					onClick={() => setIsInfoOpen(true)}
				>
					Подробнее
				</Button> */}
			</div>
			<div className={cn(styles.deckSide, styles.back)}>
				<p>Описание колоды</p>
				<p>Сложность колоды</p>
				{/* <Button
					className={styles.deckControl}
					animationType='ripple'
					startIcon={<ArrowLeft />}
					onClick={() => setIsInfoOpen(false)}
				>
					Вернуться
				</Button> */}
			</div>
		</div>
	);
}
