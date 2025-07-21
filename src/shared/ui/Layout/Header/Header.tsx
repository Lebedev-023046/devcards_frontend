import { ROUTES } from '@/shared/routes';
import { useTheme } from '@/shared/styles/useTheme';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { Input } from '../../Input';
import styles from './Header.module.css';
import Logo from '/header/logo.svg';
import Moon from '/header/moon.svg';
import Search from '/header/search.svg';
import Sun from '/header/sun.svg';
import TryIt from '/header/try-it.svg';

export function Header() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';

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

				<Button as={Link} to={ROUTES.SIGNUP()} startIcon={<img src={TryIt} />}>
					Попробовать
				</Button>

				<Button
					variant='ghost'
					size='xs'
					iconOnly
					aria-label='Toggle theme'
					startIcon={
						<img
							className={cn(styles.toggleIcon, !isDark && styles.rotate)}
							src={isDark ? Moon : Sun}
							alt='toggle theme'
						/>
					}
					onClick={() => setTheme(isDark ? 'light' : 'dark')}
				>
					Toggle THeme
				</Button>
			</div>
		</div>
	);
}
