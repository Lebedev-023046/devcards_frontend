import { useUser } from '@/entities/user/hooks/useUser';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { Box, Button, Heading } from '@chakra-ui/react';
import cn from 'clsx';
import { EyeIcon, KeyRound, LogIn, LogOut, User } from 'lucide-react';
import { useRef, useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderProfile.module.css';
import MyDecks from '/deck/my-decks.svg';

export function HeaderProfile() {
	const { signout } = useSession();
	const { data: user, isAuth } = useUser();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const profileIconRef = useRef<HTMLDivElement>(null);
	const ref = useOutsideClick<HTMLDivElement>(
		() => setIsModalOpen(false),
		[profileIconRef as RefObject<HTMLElement>],
	);

	return (
		<>
			<Box color='text-primary' className={styles.headerProfileWrapper}>
				<div ref={profileIconRef}>
					<User onClick={() => setIsModalOpen(!isModalOpen)} />
				</div>

				<Box
					bg='bg-accent'
					color='text-primary'
					ref={ref}
					className={cn(styles.modal, isModalOpen && styles.modalOpen)}
				>
					<Heading className={styles.title}>
						Добро пожаловать, {user?.name ?? 'гость' + '!'}
					</Heading>
					{!isAuth && (
						<p className={styles.subtitle}>
							Создавайте карточки, тестируйте себя и следите за прогрессом!
						</p>
					)}

					<div className={styles.actions}>
						{isAuth ? (
							<div className={styles.userActions}>
								<Button flex={1} asChild bg={'button-tertiary'}>
									<Link to={ROUTES.DECKS()}>
										<img src={MyDecks} alt='to-my-decks-icon' /> Мои колоды
									</Link>
								</Button>
								<Button flex={1} asChild bg={'button-tertiary'}>
									<Link to={ROUTES.PROFILE()}>
										<User /> Профиль
									</Link>
								</Button>
							</div>
						) : (
							<Button bg={'button-primary'} asChild>
								<Link to={ROUTES.DECKS()}>
									<EyeIcon /> Просмотреть публичные колоды
								</Link>
							</Button>
						)}

						<div className={styles.authBlock}>
							{isAuth ? (
								<Button
									flex={1}
									bg={'button-secondary'}
									onClick={signout}
									asChild
								>
									<Link to={ROUTES.SIGNIN()}>
										<LogOut /> Выйти
									</Link>
								</Button>
							) : (
								<>
									<Button bg={'button-tertiary'} flex={1} asChild>
										<Link to={ROUTES.SIGNIN()}>
											<LogIn /> Войти
										</Link>
									</Button>
									<Button bg={'button-secondary'} flex={1} asChild>
										<Link to={ROUTES.SIGNUP()}>
											<KeyRound /> Создать аккаунт
										</Link>
									</Button>
								</>
							)}
						</div>
					</div>
				</Box>
			</Box>
		</>
	);
}
