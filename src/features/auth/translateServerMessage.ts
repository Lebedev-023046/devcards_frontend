const MESSAGE_MAP: Record<string, string> = {
	// auth
	'User with this email already exists':
		'Пользователь с таким email уже существует',
	'User not found': 'Пользователь не найден',
	'Wrong password': 'Неверный пароль',
};

export function translateServerMessage(msg: string) {
	return MESSAGE_MAP[msg] ?? msg;
}
