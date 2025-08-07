import type { CardType } from '@/entities/card/model';
import { FlipCard } from '@/shared/ui/flipCard';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { CardLayout } from './CardLayout';
import { Question } from './card-options/Choice';

function ControlButton({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<Button
			mt='auto'
			bg={'button-primary-gradient'}
			w={'100%'}
			onClick={onClick}
		>
			{children}
		</Button>
	);
}

function SideWrapperInfo({
	children,
	buttonText,
	onClick,
}: {
	children: React.ReactNode;
	buttonText: string;
	onClick: () => void;
}) {
	return (
		<Stack p='1.5rem 1rem' h='100%'>
			<Flex fontSize='2xl' h='100%' alignItems='center' justifyContent='center'>
				<Heading>{children}</Heading>
			</Flex>
			<ControlButton onClick={onClick}>{buttonText}</ControlButton>
		</Stack>
	);
}

export function Card({ type }: { type: CardType }) {
	const [isAnswerOpen, setIsAnswerOpen] = useState(false);

	const openAnswer = () => setIsAnswerOpen(true);
	const closeAnswer = () => setIsAnswerOpen(false);

	let frontContent: React.ReactNode;
	let backContent: React.ReactNode;

	if (type === 'INFO') {
		frontContent = (
			<CardLayout buttonText='Посмотреть ответ' onButtonClick={openAnswer}>
				<Flex
					fontSize='2xl'
					h='100%'
					alignItems='center'
					justifyContent='center'
				>
					{/* <Heading>{cardCongig.question}</Heading> */}
					<Heading>Какой-то вопрос с информацией</Heading>
				</Flex>
			</CardLayout>
		);
		backContent = (
			<CardLayout buttonText='Вернуться к вопросу' onButtonClick={closeAnswer}>
				<Flex
					fontSize='2xl'
					h='100%'
					alignItems='center'
					justifyContent='center'
				>
					{/* <Heading>{cardCongig.answerText}</Heading> */}
					<Heading>Какой-то ответ</Heading>
				</Flex>
			</CardLayout>
		);
	} else if (['SINGLE_CHOICE', 'MULTI_CHOICE'].includes(type)) {
		frontContent = (
			<CardLayout buttonText='Посмотреть ответ' onButtonClick={openAnswer}>
				<Question
					// question={config.question}
					// options={config.options!}
					// type={config.type}
					question='Какой-то вопрос с вариантами'
					options={[
						{ value: '1', label: 'Вариант 1' },
						{ value: '2', label: 'Вариант 2' },
						{ value: '3', label: 'Вариант 3' },
						{ value: '4', label: 'Вариант 4' },
					]}
					type={type}
				/>
			</CardLayout>
		);
		backContent = (
			<CardLayout buttonText='Вернуться к вопросу' onButtonClick={closeAnswer}>
				<Heading>
					{/* {type === 'SINGLE_CHOICE'
            ? `Правильный ответ: ${config.correctAnswer}`
            : `Правильные ответы: ${(config.correctAnswer as string[]).join(', ')}`} */}

					{type === 'SINGLE_CHOICE'
						? `Правильный ответ: 1`
						: `Правильные ответы: 1, 2`}
				</Heading>
				<Question
					// question={config.question}
					// options={config.options!}
					// type={config.type}
					// disabled
					// defaultValue={config.correctAnswer}
					options={[
						{ value: '1', label: 'Вариант 1' },
						{ value: '2', label: 'Вариант 2' },
						{ value: '3', label: 'Вариант 3' },
						{ value: '4', label: 'Вариант 4' },
					]}
					type={type}
					disabled
					defaultValue={type === 'SINGLE_CHOICE' ? '1' : ['1', '2']}
				/>
			</CardLayout>
		);
	}

	console.log({ frontContent });

	return (
		<FlipCard
			isFlipped={isAnswerOpen}
			front={frontContent}
			back={backContent}
		/>
	);
}
