import { useGetCardsByDeck } from "@/features/card/hooks/useGetCardsByDeck";
import { useGetDeckById } from "@/features/deck/hooks/useGetDeckById";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui";
import { Link, useParams } from "react-router-dom";
import styles from "./CardsPage.module.css";

function CardsPage() {
	const { deckId = "" } = useParams();
	const { data: deckInfo, isLoading: isDeckLoading } = useGetDeckById();
	const { data: cards = [], isLoading: isCardsLoading } = useGetCardsByDeck(
		deckId,
		1,
		50,
	);

	if (isDeckLoading || isCardsLoading) {
		return <div className={styles.notice}>Загружаем карточки...</div>;
	}

	if (!deckInfo) {
		return <div className={styles.notice}>Колода не найдена.</div>;
	}

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h1 className={styles.title}>Карточки колоды</h1>
					<p className={styles.text}>
						{deckInfo.title} · {cards.length} карточек
					</p>
				</div>
				<Button asChild variant="outline">
					<Link to={ROUTES.DECK(deckInfo.id)}>Назад к колоде</Link>
				</Button>
			</header>

			{cards.length ? (
				<div className={styles.grid}>
					{cards.map((card) => (
						<article key={card.id} className={styles.card}>
							<span className={styles.type}>{card.type}</span>
							<h2 className={styles.question}>{card.question}</h2>
							{card.answer ? (
								<p className={styles.answer}>{card.answer}</p>
							) : card.options?.length ? (
								<ul className={styles.optionList}>
									{card.options.map((option) => (
										<li key={option.id}>{option.text}</li>
									))}
								</ul>
							) : (
								<p className={styles.answer}>Ответ появится после настройки.</p>
							)}
						</article>
					))}
				</div>
			) : (
				<div className={styles.notice}>В этой колоде пока нет карточек.</div>
			)}
		</div>
	);
}

export default CardsPage;
