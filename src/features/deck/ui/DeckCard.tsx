import { Button } from "@/shared/ui";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./DeckCard.module.css";

interface Props {
	deckId: string;
	title: string;
	description: string;
	totalCards: number;
	tagNames: string[];
	deckCoverUrl: string;
	href: string;
	ctaLabel?: string;
	eyebrow?: string;
	variant?: "default" | "featured";
}

export function DeckCard({
	title,
	description,
	totalCards,
	tagNames,
	deckCoverUrl,
	href,
	ctaLabel = "Открыть колоду",
	eyebrow = "Колода",
	variant = "default",
}: Props) {
	const bgImagePath = deckCoverUrl
		? `${import.meta.env.VITE_API_URL}${deckCoverUrl}`
		: undefined;

	return (
		<article
			className={`${styles.card} ${variant === "featured" ? styles.featured : ""}`}
		>
			<div
				className={styles.cover}
				style={
					bgImagePath
						? {
								backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.72)), url(${bgImagePath})`,
							}
						: undefined
				}
			>
				<span className={styles.eyebrow}>{eyebrow}</span>
				<span className={styles.count}>{totalCards} карточек</span>
			</div>
			<div className={styles.body}>
				<div>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{description}</p>
				</div>
				<div className={styles.tags}>
					{tagNames.length ? (
						tagNames.slice(0, 4).map((tagName) => (
							<span key={tagName} className={styles.tag}>
								{tagName}
							</span>
						))
					) : (
						<span className={styles.tag}>Без тегов</span>
					)}
				</div>
				<div className={styles.footer}>
					<span className={styles.meta}>
						{tagNames.length ? `${tagNames.length} тем` : "Спокойный старт"}
					</span>
					<Button asChild variant="ghost">
						<Link to={href}>
							{ctaLabel}
							<ArrowRight size={16} />
						</Link>
					</Button>
				</div>
			</div>
		</article>
	);
}
