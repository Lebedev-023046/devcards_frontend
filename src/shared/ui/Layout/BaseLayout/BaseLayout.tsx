import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';

import styles from './BaseLayout.module.css';

export function BaseLayout() {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.root}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
