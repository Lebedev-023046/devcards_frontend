import { useGetDeckById } from '@/features/deck/hooks/useGetDeckById';
import {
	Box,
	Container,
	Flex,
	Heading,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';

function DeckPage() {
	const { data: deckInfo, error, isLoading } = useGetDeckById();

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка загрузки</div>;
	if (!deckInfo) return <div>Колода не найдена</div>;

	return (
		<Container p={0} m={0}>
			<Flex alignItems={'flex-start'}>
				<Stack gap={2}>
					<Heading as={'h1'} fontSize={'3xl'}>
						{deckInfo.title}
					</Heading>
					<Text fontSize={'xl'}>
						<Span fontStyle={'italic'}>
							{deckInfo.isPublic ? 'Публичная' : 'Приватная'}{' '}
						</Span>
						колода
					</Text>
				</Stack>

				<Stack ml={'auto'} gap={2}>
					<Text fontSize={'xl'} fontWeight={500}>
						{deckInfo.cards.length} карточек
					</Text>
					<Box></Box>
				</Stack>

				{/* {deckInfo.description && <Text>{deckInfo.description}</Text>} */}
			</Flex>
		</Container>
	);
}

export default DeckPage;
