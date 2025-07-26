import { authApi } from '@/features/auth/api';
import { translateServerMessage } from '@/features/auth/translateServerMessage';
import type { AuthRequestDto } from '@/features/auth/types';
import type { ApiResponse } from '@/shared/api/types';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { CircleUser, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';
import styles from './SignUpPage.module.css';

const signUpSchema = z
	.object({
		name: z.string().min(2, 'Слишком короткое имя'),
		email: z.email('Неверный email'),
		password: z
			.string()
			.min(8, 'Не менее 8 символов')
			.regex(/[0-9]/, 'Должна быть цифра')
			.regex(/[A-Z]/, 'Должна быть заглавная буква'),
		confirmPassword: z.string().min(8, 'Не менее 8 символов'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

type SignUpData = z.infer<typeof signUpSchema>;

function SignUpPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpSchema),
		mode: 'onBlur',
	});

	const { signin } = useSession();
	const navigate = useNavigate();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);
	const [shouldShowConfirmPassword, setShouldShowConfirmPassword] =
		useState(false);

	const { mutate: signUp } = useMutation({
		mutationFn: authApi.signUp,
		onSuccess(apiResponse) {
			signin(apiResponse.data.access_token);
			reset();
			navigate('/decks', {
				replace: true,
			});
			toast.success('Добро пожаловать!');
		},
		onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<AuthRequestDto>>)
				?.response?.data;
			if (apiResponse) {
				toast.error(translateServerMessage(apiResponse.message));
			}
		},
	});

	const onSubmit = (data: SignUpData) => {
		const { name, email, password } = data;
		signUp({ name, email, password });
	};

	return (
		<div className={styles.pageWrapper}>
			<h1 className={styles.pageTitle}>Регистрация</h1>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
					<Input
						{...register('name')}
						placeholder='ваше имя'
						inputSize='lg'
						error={!!errors.name}
						helperText={errors.name?.message}
						startIcon={<CircleUser />}
					/>
					<Input
						{...register('email')}
						placeholder='you@example.com'
						inputSize='lg'
						error={!!errors.email}
						helperText={errors.email?.message}
						startIcon={<Mail />}
					/>
					<Input
						{...register('password')}
						type={shouldShowPassword ? 'text' : 'password'}
						placeholder='придумайте надежный пароль'
						inputSize='lg'
						error={!!errors.password}
						helperText={errors.password?.message}
						endIcon={shouldShowPassword ? <Eye /> : <EyeOff />}
						onEndIconClick={() => setShouldShowPassword(s => !s)}
						startIcon={<KeyRound />}
					/>
					<Input
						{...register('confirmPassword')}
						type={shouldShowConfirmPassword ? 'text' : 'password'}
						placeholder='повторите пароль'
						inputSize='lg'
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
						endIcon={shouldShowConfirmPassword ? <Eye /> : <EyeOff />}
						onEndIconClick={() => setShouldShowConfirmPassword(s => !s)}
						startIcon={<KeyRound />}
					/>
					<Button
						loading={isSubmitting}
						size='lg'
						type='submit'
						animationType='ripple'
						fullWidth
					>
						Создать аккаунт
					</Button>
				</form>
				<div className={styles.footerText}>
					Уже есть аккаунт?{' '}
					<Link className={styles.link} to={ROUTES.SIGNIN()}>
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
