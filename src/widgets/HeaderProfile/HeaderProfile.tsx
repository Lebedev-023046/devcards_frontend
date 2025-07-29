import { useUser } from '@/entities/user/hooks/useUser';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
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
			<div className={styles.headerProfileWrapper}>
				<div ref={profileIconRef}>
					<User onClick={() => setIsModalOpen(!isModalOpen)} />
				</div>

				<div
					ref={ref}
					className={cn(styles.modal, isModalOpen && styles.modalOpen)}
				>
					<h4 className={styles.title}>
						Добро пожаловать, {user?.name ?? 'гость' + '!'}
					</h4>
					{!isAuth && (
						<p className={styles.subtitle}>
							Создавайте карточки, тестируйте себя и следите за прогрессом!
						</p>
					)}

					<div className={styles.actions}>
						{isAuth ? (
							<div className={styles.userActions}>
								<Button
									variant='secondary'
									as={Link}
									to={ROUTES.DECKS()}
									startIcon={<img src={MyDecks} alt='to-my-decks-icon' />}
									fullWidth
								>
									Мои колоды
								</Button>
								<Button
									variant='secondary'
									as={Link}
									to={ROUTES.PROFILE()}
									startIcon={<User />}
									fullWidth
								>
									Профиль
								</Button>
							</div>
						) : (
							<Button
								variant='secondary'
								as={Link}
								to={ROUTES.DECKS()}
								startIcon={<EyeIcon />}
							>
								Просмотреть публичные колоды
							</Button>
						)}

						<div className={styles.authBlock}>
							{isAuth ? (
								<Button
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
										as={Link}
										to={ROUTES.SIGNIN()}
										startIcon={<LogIn />}
										animationType='ripple'
										fullWidth
									>
										Войти
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
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
