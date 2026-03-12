import { ROUTES } from "@/shared/routes";
import { Field, inputDefaultProps } from "@/shared/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	Heading,
	IconButton,
	Input,
	InputGroup,
} from "@chakra-ui/react";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
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
	const { mutate: signIn } = useSignIn();

	const [shouldShowPassword, setShouldShowPassword] = useState(false);

	const onSubmit = (data: signInData) => {
		const { email, password } = data;
		signIn({ email, password });
	};

	return (
		<div className={styles.formWrapper}>
			<Heading
				as="h1"
				mb={6}
				textAlign={"center"}
				color={"text-primary"}
				fontSize={"2rem"}
			>
				Авторизация
			</Heading>
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.formFieldsWrapper}
				>
					<Field
						invalid={!!errors.email?.message}
						label="Email"
						errorText={errors.email?.message}
					>
						<InputGroup startElement={<Mail />}>
							<Input
								{...register("email")}
								placeholder="me@example.com"
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>

					<Field
						invalid={!!errors.password?.message}
						label="Пароль"
						errorText={errors.password?.message}
					>
						<InputGroup
							startElement={<KeyRound />}
							endElement={
								<IconButton
									_icon={{ w: "1.5rem", h: "1.5rem" }}
									variant="ghost"
									aria-label={
										shouldShowPassword ? "Скрыть пароль" : "Показать пароль"
									}
									onClick={() => setShouldShowPassword((prev) => !prev)}
								>
									{shouldShowPassword ? <Eye /> : <EyeOff />}
								</IconButton>
							}
						>
							<Input
								{...register("password")}
								type={shouldShowPassword ? "text" : "password"}
								placeholder="пароль"
								{...inputDefaultProps}
							/>
						</InputGroup>
					</Field>

					<Button
						fontSize="1.25rem"
						bg={"button-primary"}
						loading={isSubmitting}
						type="submit"
					>
						Войти
					</Button>
				</form>
				<Box color="text-primary" className={styles.footerText}>
					Нет аккаунта?{" "}
					<Link className={styles.link} to={ROUTES.SIGNUP()}>
						Зарегистрироваться
					</Link>
				</Box>
			</div>
		</div>
	);
}
