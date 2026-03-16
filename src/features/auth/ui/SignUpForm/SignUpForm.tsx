import { ROUTES } from "@/shared/routes";
import { Button, Field, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUser, Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import { signUpSchema, type SignUpData } from "../../model";
import styles from "./SignUpForm.module.css";

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpSchema),
		mode: "onBlur",
	});
	const { mutate: signUp, isPending } = useSignUp();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);
	const [shouldShowConfirmPassword, setShouldShowConfirmPassword] =
		useState(false);

	const onSubmit = (data: SignUpData) => {
		const { name, email, password } = data;
		signUp({ name, email, password });
	};

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h1 className={styles.title}>Регистрация</h1>
				<p className={styles.subtitle}>
					Соберите личное пространство для карточек, повторения и прогресса.
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					label="Имя"
					htmlFor="signup-name"
					errorText={errors.name?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<CircleUser size={18} />
						</span>
						<Input
							id="signup-name"
							className={styles.input}
							placeholder="Ваше имя"
							{...register("name")}
						/>
					</div>
				</Field>

				<Field
					label="Email"
					htmlFor="signup-email"
					errorText={errors.email?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<Mail size={18} />
						</span>
						<Input
							id="signup-email"
							type="email"
							className={styles.input}
							placeholder="me@example.com"
							{...register("email")}
						/>
					</div>
				</Field>

				<Field
					label="Пароль"
					htmlFor="signup-password"
					errorText={errors.password?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<KeyRound size={18} />
						</span>
						<Input
							id="signup-password"
							type={shouldShowPassword ? "text" : "password"}
							className={styles.inputPassword}
							placeholder="Не менее 8 символов"
							{...register("password")}
						/>
						<button
							type="button"
							className={styles.toggle}
							aria-label={
								shouldShowPassword ? "Скрыть пароль" : "Показать пароль"
							}
							onClick={() => setShouldShowPassword((prev) => !prev)}
						>
							{shouldShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</Field>

				<Field
					label="Повторите пароль"
					htmlFor="signup-confirm-password"
					errorText={errors.confirmPassword?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<KeyRound size={18} />
						</span>
						<Input
							id="signup-confirm-password"
							type={shouldShowConfirmPassword ? "text" : "password"}
							className={styles.inputPassword}
							placeholder="Повторите пароль"
							{...register("confirmPassword")}
						/>
						<button
							type="button"
							className={styles.toggle}
							aria-label={
								shouldShowConfirmPassword ? "Скрыть пароль" : "Показать пароль"
							}
							onClick={() => setShouldShowConfirmPassword((prev) => !prev)}
						>
							{shouldShowConfirmPassword ? (
								<EyeOff size={18} />
							) : (
								<Eye size={18} />
							)}
						</button>
					</div>
				</Field>

				<Button
					type="submit"
					size="lg"
					fullWidth
					disabled={isPending || isSubmitting}
				>
					{isPending ? "Создаем..." : "Создать аккаунт"}
				</Button>
			</form>
			<p className={styles.footer}>
				Уже есть аккаунт?{" "}
				<Link className={styles.link} to={ROUTES.SIGNIN()}>
					Войти
				</Link>
			</p>
		</div>
	);
}
