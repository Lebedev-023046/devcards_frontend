import { Box } from '@chakra-ui/react';
import { Hero } from './components/Hero';

function LandingPage() {
	return (
		<Box h={'100%'} display={'flex'} flexDirection={'column'} flex={1}>
			<Hero />
		</Box>
	);
}

export default LandingPage;
