import { CreateDeckForm } from '@/features/deck/ui/CreateDeckForm';
import { Heading } from '@chakra-ui/react';

function CreateDeckPage() {
	return (
		<section>
			<Heading as={'h1'} color={'text-primary'}>
				Создать колоду
			</Heading>
			<CreateDeckForm />
		</section>
	);
}

export default CreateDeckPage;
