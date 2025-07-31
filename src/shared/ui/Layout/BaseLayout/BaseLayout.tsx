import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';

import { Box } from '@chakra-ui/react';
import styles from './BaseLayout.module.css';

export function BaseLayout() {
	return (
		<Box display='flex' flexDirection='column' h='100%'>
			<Header />
			<main className={styles.mainWrapper}>
				<Outlet />
			</main>
			<Footer />
		</Box>
	);
}
