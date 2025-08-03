import { ROUTES } from '@/shared/routes';
import { Field, inputDefaultProps } from '@/shared/ui/field';
import {
	Box,
	Button,
	Heading,
	IconButton,
	Input,
	InputGroup,
} from '@chakra-ui/react';
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
			<Heading
				as='h1'
				mb={6}
				textAlign={'center'}
				color={'text-primary'}
				fontSize={'2rem'}
			>
				Регистрация
			</Heading>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.formFieldsWrapper}
				>
					<Field
						invalid={!!errors.name?.message}
						label='Имя'
						errorText={errors.name?.message}
					>
						<InputGroup startElement={<CircleUser />}>
							<Input
								{...register('name')}
								placeholder='ваше имя'
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>
					<Field
						invalid={!!errors.email?.message}
						label='Email'
						errorText={errors.email?.message}
					>
						<InputGroup startElement={<Mail />}>
							<Input
								{...register('email')}
								placeholder='me@example.com'
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>
					<Field
						invalid={!!errors.password?.message}
						label='Пароль'
						errorText={errors.password?.message}
					>
						<InputGroup
							startElement={<KeyRound />}
							endElement={
								<IconButton
									_icon={{ w: '1.5rem', h: '1.5rem' }}
									bg='transparent'
									variant='ghost'
									aria-label={
										shouldShowPassword ? 'Скрыть пароль' : 'Показать пароль'
									}
									onClick={() => setShouldShowPassword(prev => !prev)}
								>
									{shouldShowPassword ? <Eye /> : <EyeOff />}
								</IconButton>
							}
						>
							<Input
								{...register('password')}
								type={shouldShowPassword ? 'text' : 'password'}
								placeholder='пароль'
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>
					<Field
						invalid={!!errors.confirmPassword?.message}
						label='Повторите пароль'
						errorText={errors.confirmPassword?.message}
					>
						<InputGroup
							startElement={<KeyRound />}
							endElement={
								<IconButton
									_icon={{ w: '1.5rem', h: '1.5rem' }}
									bg='transparent'
									variant='ghost'
									aria-label={
										shouldShowConfirmPassword
											? 'Скрыть пароль'
											: 'Показать пароль'
									}
									onClick={() => setShouldShowConfirmPassword(prev => !prev)}
								>
									{shouldShowPassword ? <Eye /> : <EyeOff />}
								</IconButton>
							}
						>
							<Input
								{...register('confirmPassword')}
								type={shouldShowPassword ? 'text' : 'password'}
								placeholder='повторите пароль'
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>
					<Button
						loading={isSubmitting}
						bg={'button-primary'}
						size='lg'
						type='submit'
					>
						Создать аккаунт
					</Button>
				</form>
				<Box color='text-primary' className={styles.footerText}>
					Уже есть аккаунт?{' '}
					<Link className={styles.link} to={ROUTES.SIGNIN()}>
						Войти
					</Link>
				</Box>
			</div>
		</div>
	);
}
