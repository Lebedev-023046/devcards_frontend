import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from '/header/logo.svg';

export function Footer() {
	return (
		<>
			<Box
				bg='bg-accent'
				color='text'
				as='footer'
				className={styles.footerWrapper}
			>
				<Link to={'/'} className={styles.logoWrapper}>
					<img src={Logo} className={styles.logoImage} />
					<h1 className={styles.logoTitle}>Deckable</h1>
				</Link>
			</Box>
		</>
	);
}
