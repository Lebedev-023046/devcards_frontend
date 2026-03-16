import { useGetCardsByDeck } from "@/features/card/hooks/useGetCardsByDeck";
import { useGetDeckById } from "@/features/deck/hooks/useGetDeckById";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui";
import { Link, useParams } from "react-router-dom";
import styles from "./DeckPage.module.css";

function DeckPage() {
	const { deckId = "" } = useParams();
	const { data: deckInfo, error, isLoading } = useGetDeckById();
	const { data: cards = [], isLoading: isCardsLoading } = useGetCardsByDeck(
		deckId,
		1,
		6,
	);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка загрузки</div>;
	if (!deckInfo) return <div>Колода не найдена</div>;

	return (
		<div className={styles.page}>
			<section className={styles.hero}>
				<div className={styles.heroContent}>
					<span className={styles.eyebrow}>
						{deckInfo.isPublic ? "Public deck" : "Private deck"}
					</span>
					<h1 className={styles.title}>{deckInfo.title}</h1>
					<p className={styles.description}>{deckInfo.description}</p>
					<div className={styles.tags}>
						{deckInfo.deckTags.length ? (
							deckInfo.deckTags.map((tagInfo) => (
								<span key={tagInfo.tagId} className={styles.tag}>
									{tagInfo.tag.name}
								</span>
							))
						) : (
							<span className={styles.tag}>Без тегов</span>
						)}
					</div>
					<div className={styles.actions}>
						<Button asChild>
							<Link to={ROUTES.DECK_CARDS(deckInfo.id)}>Все карточки</Link>
						</Button>
						<Button asChild variant="outline">
							<Link to={ROUTES.DECKS()}>Назад к колодам</Link>
						</Button>
					</div>
				</div>
				<div className={styles.stats}>
					<div className={styles.stat}>
						<div className={styles.statValue}>{deckInfo.totalCards}</div>
						<div className={styles.statLabel}>карточек в колоде</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statValue}>{deckInfo.totalReviews}</div>
						<div className={styles.statLabel}>повторений</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statValue}>{deckInfo.views}</div>
						<div className={styles.statLabel}>просмотров</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statValue}>{deckInfo.deckTags.length}</div>
						<div className={styles.statLabel}>тематических тегов</div>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<div>
						<h2 className={styles.sectionTitle}>Карточки в колоде</h2>
						<p className={styles.sectionText}>
							Короткий обзор содержимого перед переходом в полный список.
						</p>
					</div>
					<Button asChild variant="ghost">
						<Link to={ROUTES.DECK_CARDS(deckInfo.id)}>Открыть все</Link>
					</Button>
				</div>
				{isCardsLoading ? (
					<div className={styles.notice}>Загружаем карточки...</div>
				) : cards.length ? (
					<div className={styles.grid}>
						{cards.map((card) => (
							<article key={card.id} className={styles.card}>
								<span className={styles.cardType}>{card.type}</span>
								<h3 className={styles.cardQuestion}>{card.question}</h3>
								<p className={styles.cardAnswer}>
									{card.answer ?? "Карточка с вариантами ответа"}
								</p>
							</article>
						))}
					</div>
				) : (
					<div className={styles.notice}>В этой колоде пока нет карточек.</div>
				)}
			</section>
		</div>
	);
}

export default DeckPage;
