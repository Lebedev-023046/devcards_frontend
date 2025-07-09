import './App.css';

import { useQuery } from '@tanstack/react-query';

type Option = {
	id: string;
	text: string;
	isCorrect: boolean;
};

type Card = {
	id: string;
	title: string;
	options?: Option[];
};

const fetchCards = async (): Promise<Card[]> => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/cards`);

	if (!res.ok) throw new Error('Ошибка при загрузке карточек');
	return res.json();
};

export default function App() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['cards'],
		queryFn: fetchCards,
	});

	if (isLoading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error.message}</p>;

	return (
		<div style={{ padding: '1rem' }}>
			<h1>Карточки</h1>
			{data?.map(card => (
				<div
					key={card.id}
					style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}
				>
					<h2>{card.title}</h2>
					{card.options && (
						<ul>
							{card.options.map(opt => (
								<li key={opt.id}>
									{opt.text} {opt.isCorrect ? '✅' : ''}
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);
}
