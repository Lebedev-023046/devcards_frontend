import { useUser } from '@/entities/user/hooks';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import {
	EyeIcon,
	KeyRound,
	LogIn,
	LogOut,
	MenuIcon,
	User,
	X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import MyDecks from '/deck/my-decks.svg';
import PublicDecks from '/deck/public-decks.svg';

export function MobileMenu() {
	const { signout } = useSession();
	const { data: user, isAuth } = useUser();

	const [isOpen, setIsOpen] = useState(false);

	const handleListClick: React.MouseEventHandler<HTMLUListElement> = e => {
		const target = e.target as HTMLElement;
		if (target.closest('a')) {
			setIsOpen(false);
		}
	};

	return (
		<div className={styles.mobileMenuWrapper}>
			<Button
				className={cn(styles.menuButton, isOpen && styles.rotate)}
				variant='ghost'
				size='xs'
				iconOnly
				aria-label='Toggle theme'
				startIcon={
					isOpen ? (
						<X size='2rem' color='var(--color-text-primary)' />
					) : (
						<MenuIcon size='2rem' color='var(--color-text-primary)' />
					)
				}
				onClick={() => setIsOpen(p => !p)}
			>
				Меню
			</Button>
			<>
				<div
					className={cn(styles.backdrop, isOpen && styles.backdropOpen)}
					onClick={() => setIsOpen(false)}
					aria-hidden='true'
				/>
				<nav className={cn(styles.menu, isOpen && styles.menuOpen)}>
					<div className={styles.menuContent}>
						{!isAuth && (
							<>
								<h4 className={styles.title}>Добро пожаловать!</h4>{' '}
								<p className={styles.subtitle}>
									Создавайте карточки, тестируйте себя и следите за прогрессом!
								</p>
							</>
						)}
						<ul onClick={handleListClick} className={styles.list}>
							{isAuth ? (
								<>
									<li className={styles.item}>
										<img src={PublicDecks} alt='to-public-decks-icon' />
										<Link to={ROUTES.DECKS()}>Главная</Link>
									</li>
									<li className={styles.item}>
										<img src={MyDecks} alt='to-your-decks' />
										<Link to={ROUTES.DECKS()}>Мои колоды</Link>
									</li>
									<li className={styles.item}>
										<User />
										<Link to={ROUTES.PROFILE()}>Профиль</Link>
									</li>
								</>
							) : null}
						</ul>
						<div className={styles.controls}>
							{isAuth ? (
								<Button
									className={styles.logoutButton}
									as={Link}
									to={ROUTES.SIGNIN()}
									startIcon={<LogOut />}
									animationType='ripple'
									onClick={signout}
									fullWidth
								>
									Выйти
								</Button>
							) : (
								<>
									<Button
										variant='secondary'
										as={Link}
										to={ROUTES.DECKS()}
										startIcon={<EyeIcon />}
										fullWidth
									>
										Публичные колоды
									</Button>
									<Button
										as={Link}
										to={ROUTES.SIGNUP()}
										startIcon={<KeyRound />}
										animationType='ripple'
										fullWidth
									>
										Создать аккаунт
									</Button>
									<Button
										as={Link}
										to={ROUTES.SIGNIN()}
										startIcon={<LogIn />}
										animationType='ripple'
										fullWidth
									>
										Войти
									</Button>
								</>
							)}
						</div>
					</div>
				</nav>
			</>
		</div>
	);
}
