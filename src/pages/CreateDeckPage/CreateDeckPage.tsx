import { CreateDeckForm } from '@/features/deck/ui/CreateDeckForm';
import { Heading } from '@chakra-ui/react';

function CreateDeckPage() {
	return (
		<section>
			<Heading as={'h1'} textAlign={'center'} color={'text-contrast'}>
				Создание колоды
			</Heading>
			<CreateDeckForm />
		</section>
	);
}

export default CreateDeckPage;
