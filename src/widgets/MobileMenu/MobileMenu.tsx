import { useUser } from '@/entities/user/hooks/useUser';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
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
	const { isAuth } = useUser();

	const [isOpen, setIsOpen] = useState(false);

	const handleListClick: React.MouseEventHandler<HTMLUListElement> = e => {
		const target = e.target as HTMLElement;
		if (target.closest('a')) {
			setIsOpen(false);
		}
	};

	return (
		<div className={styles.mobileMenuWrapper}>
			<IconButton
				_icon={{ w: '2rem', h: '2rem' }}
				bg='transparent'
				color={'text-primary'}
				className={cn(styles.menuButton, isOpen && styles.rotate)}
				variant='ghost'
				aria-label='Toggle theme'
				onClick={() => setIsOpen(p => !p)}
			>
				{isOpen ? <X size='2rem' /> : <MenuIcon size='2rem' />}
			</IconButton>
			<>
				<div
					className={cn(styles.backdrop, isOpen && styles.backdropOpen)}
					onClick={() => setIsOpen(false)}
					aria-hidden='true'
				/>
				<Box
					as='nav'
					bg='bg-accent'
					color='text'
					className={cn(styles.menu, isOpen && styles.menuOpen)}
				>
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
						<ButtonGroup className={styles.controls}>
							{isAuth ? (
								<Button
									className={styles.logoutButton}
									bg={'button-secondary'}
									w={'100%'}
									asChild
									onClick={signout}
								>
									<Link to={ROUTES.SIGNIN()}>
										<LogOut /> Выйти
									</Link>
								</Button>
							) : (
								<>
									<Button w={'100%'} bg={'button-primary'} asChild>
										<Link to={ROUTES.DECKS()}>
											<EyeIcon />
											Публичные колоды
										</Link>
									</Button>
									<Button w={'100%'} bg={'button-secondary'} asChild>
										<Link to={ROUTES.SIGNUP()}>
											<KeyRound /> Создать аккаунт
										</Link>
									</Button>
									<Button w={'100%'} bg={'button-tertiary'} asChild>
										<Link to={ROUTES.SIGNIN()}>
											<LogIn /> Войти
										</Link>
									</Button>
								</>
							)}
						</ButtonGroup>
					</div>
				</Box>
			</>
		</div>
	);
}
