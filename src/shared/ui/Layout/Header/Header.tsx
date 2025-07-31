import { ROUTES } from '@/shared/routes';
import { HeaderProfile } from '@/widgets/HeaderProfile';
import { MobileMenu } from '@/widgets/MobileMenu';
import { ThemeToggler } from '@/widgets/ThemeToggler';
import { Box, Heading, Input, InputGroup } from '@chakra-ui/react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '/header/logo.svg';
import Search from '/header/search.svg';

export function Header() {
	return (
		<Box bg={'bg-accent'} color='text' as='header' className={styles.root}>
			<Link to={ROUTES.DECKS()} className={styles.logoWrapper}>
				<img src={Logo} className={styles.logoImage} />
				<Heading as='h1' className={styles.logoTitle}>
					Deckable
				</Heading>
			</Link>

			<div className={styles.controls}>
				<InputGroup
					startElement={
						<img src={Search} className={styles.searchIcon} alt='search-icon' />
					}
				>
					<Input
						size='sm'
						className={styles.search}
						_placeholder={{ color: 'text', fontWeight: '100' }}
						aria-label='Search'
						placeholder='Найти колоду'
					/>
				</InputGroup>

				<ThemeToggler />
				<HeaderProfile />
				<MobileMenu />
			</div>
		</Box>
	);
}
