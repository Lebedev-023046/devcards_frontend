import { useGetPublicDecks } from "@/features/deck/hooks/useGetPublicDecks";
import { useGetUserDecks } from "@/features/deck/hooks/useGetUserDecks";
import { DeckCard } from "@/features/deck/ui/DeckCard";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";
import styles from "./DecksPage.module.css";

function DecksPage() {
	const { data: myDecks = [], isLoading: isMyDecksLoading } = useGetUserDecks();
	const { data: publicDecks, isLoading: isPublicDecksLoading } =
		useGetPublicDecks();

	console.log(myDecks, publicDecks);

	return (
		<div className={styles.page}>
			<section className={styles.hero}>
				<div>
					<h1 className={styles.title}>Колоды</h1>
					<p className={styles.text}>
						Собственные подборки и общий каталог теперь живут в одном спокойном
						пространстве. Создавайте, просматривайте и возвращайтесь к важному.
					</p>
				</div>
				<Button asChild size="lg">
					<Link to={ROUTES.CREATE_DECK()}>Создать колоду</Link>
				</Button>
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<div>
						<h2 className={styles.sectionTitle}>Мои колоды</h2>
						<p className={styles.sectionText}>
							Личное пространство для ваших тем и собственного темпа.
						</p>
					</div>
				</div>
				{isMyDecksLoading ? (
					<div className={styles.notice}>Загружаем ваши колоды...</div>
				) : myDecks.length ? (
					<div className={styles.grid}>
						{myDecks.map((deck) => (
							<DeckCard
								key={deck.id}
								deckId={deck.id}
								title={deck.title}
								description={deck.description}
								totalCards={deck.totalCards}
								deckCoverUrl={deck.coverImageUrl}
								tagNames={(deck.deckTags ?? []).map(
									(tagInfo) => tagInfo.tag.name,
								)}
								href={ROUTES.DECK(deck.id)}
								ctaLabel="Открыть"
								eyebrow="My"
							/>
						))}
					</div>
				) : (
					<div className={styles.notice}>
						У вас пока нет колод. Создайте первую и соберите собственный ритм
						повторения.
					</div>
				)}
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<div>
						<h2 className={styles.sectionTitle}>Публичные колоды</h2>
						<p className={styles.sectionText}>
							Открытые подборки для быстрого исследования и вдохновения.
						</p>
					</div>
				</div>

				{isPublicDecksLoading ? (
					<div className={styles.notice}>Загружаем публичные колоды...</div>
				) : publicDecks?.items.length ? (
					<div className={styles.grid}>
						{publicDecks.items.map((deck) => (
							<DeckCard
								key={deck.id}
								deckId={deck.id}
								title={deck.title}
								description={deck.description}
								totalCards={deck.totalCards}
								deckCoverUrl={deck.coverImageUrl}
								tagNames={(deck.deckTags ?? []).map(
									(tagInfo) => tagInfo.tag.name,
								)}
								href={ROUTES.DECK(deck.id)}
								ctaLabel="Подробнее"
								eyebrow="Public"
							/>
						))}
					</div>
				) : (
					<div className={styles.notice}>Публичные колоды пока не найдены.</div>
				)}
			</section>
		</div>
	);
}

export default DecksPage;
