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
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';
import styles from './SignInPage.module.css';

const signInSchema = z.object({
	email: z.email('Неверный email'),
	password: z
		.string()
		.min(8, 'Не менее 8 символов')
		.regex(/[0-9]/, 'Должна быть цифра')
		.regex(/[A-Z]/, 'Должна быть заглавная буква'),
});

type signInData = z.infer<typeof signInSchema>;

function SignInPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<signInData>({
		resolver: zodResolver(signInSchema),
		mode: 'onBlur',
	});

	const { signin } = useSession();
	const navigate = useNavigate();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const { mutate: signIn } = useMutation({
		mutationFn: authApi.signIn,
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

	const onSubmit = (data: signInData) => {
		const { email, password } = data;
		signIn({ email, password });
	};

	return (
		<div className={styles.pageWrapper}>
			<h1 className={styles.pageTitle}>Авторизация</h1>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
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
						placeholder='пароль'
						inputSize='lg'
						error={!!errors.password}
						helperText={errors.password?.message}
						endIcon={shouldShowPassword ? <Eye /> : <EyeOff />}
						onEndIconClick={() => setShouldShowPassword(s => !s)}
						startIcon={<KeyRound />}
					/>
					<Button
						loading={isSubmitting}
						size='lg'
						type='submit'
						animationType='ripple'
						fullWidth
					>
						Войти
					</Button>
				</form>
				<div className={styles.footerText}>
					Нет аккаунта?{' '}
					<Link className={styles.link} to={ROUTES.SIGNUP()}>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignInPage;
