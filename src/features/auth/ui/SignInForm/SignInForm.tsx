import { ROUTES } from "@/shared/routes";
import { Button, Field, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignIn } from "../../hooks/useSignIn";
import { signInSchema, type signInData } from "../../model";
import styles from "./SignInForm.module.css";

export function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<signInData>({
		resolver: zodResolver(signInSchema),
		mode: "onBlur",
	});
	const { mutate: signIn, isPending } = useSignIn();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const onSubmit = (data: signInData) => {
		const { email, password } = data;
		signIn({ email, password });
	};

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<h1 className={styles.title}>Вход</h1>
				<p className={styles.subtitle}>
					Вернитесь к своим колодам и продолжите повторение без лишних шагов.
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					label="Email"
					htmlFor="signin-email"
					errorText={errors.email?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<Mail size={18} />
						</span>
						<Input
							id="signin-email"
							type="email"
							className={styles.input}
							placeholder="me@example.com"
							{...register("email")}
						/>
					</div>
				</Field>

				<Field
					label="Пароль"
					htmlFor="signin-password"
					errorText={errors.password?.message}
				>
					<div className={styles.inputWrap}>
						<span className={styles.iconLeading}>
							<KeyRound size={18} />
						</span>
						<Input
							id="signin-password"
							type={shouldShowPassword ? "text" : "password"}
							className={styles.inputPassword}
							placeholder="Введите пароль"
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

				<Button
					type="submit"
					size="lg"
					fullWidth
					disabled={isPending || isSubmitting}
				>
					{isPending ? "Входим..." : "Войти"}
				</Button>
			</form>
			<p className={styles.footer}>
				Нет аккаунта?{" "}
				<Link className={styles.link} to={ROUTES.SIGNUP()}>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	);
}
