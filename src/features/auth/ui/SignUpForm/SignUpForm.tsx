import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUser, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignUp';
import { signUpSchema, type SignUpData } from '../../model';
import styles from './SignUpForm.module.css';

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpSchema),
		mode: 'onBlur',
	});
	const { mutate: signUp } = useSignUp();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);
	const [shouldShowConfirmPassword, setShouldShowConfirmPassword] =
		useState(false);

	const onSubmit = (data: SignUpData) => {
		const { name, email, password } = data;
		signUp({ name, email, password });
	};

	return (
		<div className={styles.formWrapper}>
			<h1 className={styles.formTitle}>Регистрация</h1>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.formFieldsWrapper}
				>
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
