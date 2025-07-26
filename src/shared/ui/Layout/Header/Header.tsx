import { HeaderProfile } from '@/widgets/HeaderProfile';
import { MobileMenu } from '@/widgets/MobileMenu';
import { ThemeToggler } from '@/widgets/ThemeToggler';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { Input } from '../../Input';
import styles from './Header.module.css';
import Logo from '/header/logo.svg';
import Search from '/header/search.svg';

export function Header() {
	return (
		<div className={styles.root}>
			<Link to={'/'} className={styles.logoWrapper}>
				<img src={Logo} className={styles.logoImage} />
				<h1 className={styles.logoTitle}>Deckable</h1>
			</Link>

			<div className={styles.controls}>
				<Input
					className={styles.search}
					aria-label='Search'
					placeholder='Найти колоду'
					startIcon={
						<img src={Search} className={styles.searchIcon} alt='search-icon' />
					}
				/>

				<ThemeToggler />
				<HeaderProfile />
				<MobileMenu />
			</div>
		</div>
	);
}
