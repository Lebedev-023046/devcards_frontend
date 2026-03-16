import { deckApi } from "@/entities/deck/api";
import { useGetTopDecks } from "@/features/deck/hooks/useGetTopDecks";
import { DeckCard } from "@/features/deck/ui/DeckCard";
import { useSession } from "@/shared/hooks/useSession";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
	const accessToken = useSession((state) => state.access_token);
	const isAuth = Boolean(accessToken);

	const { data: topDecks = [] } = useGetTopDecks(3);
	const { data: publicDecks } = useQuery({
		...deckApi.getPublicDecksQueryOptions(1, 4),
	});

	return (
		<div className={styles.page}>
			<section className={styles.hero}>
				<div>
					<span className={styles.eyebrow}>Modern Calm</span>
					<h1 className={styles.heroTitle}>Учиться тише. Запоминать глубже.</h1>
					<p className={styles.heroText}>
						Deckable собирает карточки, личные колоды и спокойный ритм
						повторения в одном интерфейсе без визуального шума.
					</p>
					<div className={styles.heroActions}>
						<Button asChild size="lg">
							<Link to={isAuth ? ROUTES.DECKS() : ROUTES.SIGNUP()}>
								{isAuth ? "Перейти к колодам" : "Создать аккаунт"}
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link to={isAuth ? ROUTES.DECKS() : ROUTES.SIGNIN()}>
								{isAuth ? "Открыть каталог" : "Войти"}
							</Link>
						</Button>
					</div>
				</div>
				<div className={styles.stats}>
					<div className={styles.statCard}>
						<span className={styles.statValue}>{topDecks.length || 3}</span>
						<span className={styles.statLabel}>
							подборки для быстрого старта
						</span>
					</div>
					<div className={styles.statCard}>
						<span className={styles.statValue}>{publicDecks?.total ?? 0}</span>
						<span className={styles.statLabel}>публичных колод в каталоге</span>
					</div>
					<div className={styles.statCard}>
						<span className={styles.statValue}>3</span>
						<span className={styles.statLabel}>шага от идеи до повторения</span>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<div>
						<h2 className={styles.sectionTitle}>Популярные колоды</h2>
						<p className={styles.sectionText}>
							Короткий список подборок, с которых удобно начать без настройки.
						</p>
					</div>
				</div>
				<div className={styles.grid}>
					{topDecks.map((deck) => (
						<DeckCard
							key={deck.id}
							deckId={deck.id}
							title={deck.title}
							description={deck.description}
							totalCards={deck.totalCards}
							tagNames={deck.deckTags.map((tagInfo) => tagInfo.tag.name)}
							deckCoverUrl={deck.coverImageUrl}
							href={isAuth ? ROUTES.DECK(deck.id) : ROUTES.SIGNIN()}
							ctaLabel={isAuth ? "Открыть" : "Войти, чтобы открыть"}
							eyebrow="Топ"
							variant="featured"
						/>
					))}
				</div>
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHead}>
					<div>
						<h2 className={styles.sectionTitle}>Публичный каталог</h2>
						<p className={styles.sectionText}>
							Исследуйте открытые колоды по темам и сохраняйте собственный ритм
							обучения.
						</p>
					</div>
					<Button asChild variant="ghost">
						<Link to={isAuth ? ROUTES.DECKS() : ROUTES.SIGNIN()}>
							{isAuth ? "Смотреть все" : "Войти в каталог"}
						</Link>
					</Button>
				</div>
				{publicDecks?.items.length ? (
					<div className={styles.gridCompact}>
						{publicDecks.items.map((deck) => (
							<DeckCard
								key={deck.id}
								deckId={deck.id}
								title={deck.title}
								description={deck.description}
								totalCards={deck.totalCards}
								tagNames={deck.deckTags.map((tagInfo) => tagInfo.tag.name)}
								deckCoverUrl={deck.coverImageUrl}
								href={isAuth ? ROUTES.DECK(deck.id) : ROUTES.SIGNIN()}
								ctaLabel={isAuth ? "Подробнее" : "Войти"}
								eyebrow={deck.isPublic ? "Public" : "Private"}
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

export default LandingPage;
