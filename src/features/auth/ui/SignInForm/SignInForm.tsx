import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSignIn } from '../../hooks/userSignIn';
import { signInSchema, type signInData } from '../../model';
import styles from './SignInForm.module.css';

export function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<signInData>({
		resolver: zodResolver(signInSchema),
		mode: 'onBlur',
	});
	const { mutate: signIn } = useSignIn();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const onSubmit = (data: signInData) => {
		const { email, password } = data;
		signIn({ email, password });
	};

	return (
		<div className={styles.formWrapper}>
			<h1 className={styles.formTitle}>Авторизация</h1>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.formFieldsWrapper}
				>
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
