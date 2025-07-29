import z from 'zod';

// Sign Up
export const signUpSchema = z
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

export type SignUpData = z.infer<typeof signUpSchema>;

// Sign In
export const signInSchema = z.object({
	email: z.email('Неверный email'),
	password: z
		.string()
		.min(8, 'Не менее 8 символов')
		.regex(/[0-9]/, 'Должна быть цифра')
		.regex(/[A-Z]/, 'Должна быть заглавная буква'),
});

export type signInData = z.infer<typeof signInSchema>;
