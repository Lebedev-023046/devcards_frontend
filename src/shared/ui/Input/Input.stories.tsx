import type { Meta, StoryFn } from '@storybook/react';
import { Eye, EyeOff, Search } from 'lucide-react';
import { Input } from './Input';
import type { InputProps } from './types';

export default {
	title: 'Input',
	component: Input,
	argTypes: {
		label: { control: 'text', description: 'Текст метки поля' },
		placeholder: { control: 'text', description: 'Плейсхолдер внутри input' },
		error: {
			control: 'boolean',
			description: 'Флаг ошибки, меняет обводку на красную',
		},
		helperText: {
			control: 'text',
			description: 'Текст подсказки или ошибки под полем',
		},
		startIcon: { control: false, description: 'Иконка слева от поля' },
		endIcon: { control: false, description: 'Иконка справа от поля' },
		onStartIconClick: {
			action: 'startIcon clicked',
			description: 'Обработчик клика по левой иконке',
		},
		onEndIconClick: {
			action: 'endIcon clicked',
			description: 'Обработчик клика по правой иконке',
		},
		fullWidth: {
			control: 'boolean',
			description: 'Растянуть поле на всю ширину контейнера',
		},
		labelPersistent: {
			control: 'boolean',
			description: 'Всегда показывать label поверх поля',
		},
		variant: {
			control: { type: 'radio' },
			options: ['outline', 'filled', 'underline'],
			description: 'Вариант стилей: outline, filled или underline',
		},
		disabled: { control: 'boolean', description: 'Отключает поле и иконки' },
		type: {
			control: 'text',
			description: 'Атрибут type для input (text, password и т.д.)',
		},
	},
} as Meta;

const Template: StoryFn<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
	placeholder: 'Введите текст',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	label: 'Username',
	placeholder: 'Введите имя пользователя',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
	label: 'Email',
	placeholder: 'you@example.com',
	error: true,
	helperText: 'Неверный формат email',
};

export const HelperText = Template.bind({});
HelperText.args = {
	label: 'Password',
	placeholder: '••••••••',
	helperText: 'Пароль должен быть не менее 8 символов',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
	label: 'Search',
	placeholder: 'Поиск…',
	startIcon: <Search size={16} />,
	endIcon: <Eye size={16} />,
};

export const InteractiveIcon = Template.bind({});
InteractiveIcon.args = {
	label: 'Password',
	placeholder: '••••••••',
	endIcon: <EyeOff size={16} />,
	onEndIconClick: () => alert('Toggle password visibility'),
};

export const FullWidth = Template.bind({});
FullWidth.args = {
	label: 'Full Width Input',
	placeholder: 'Заполняю всю ширину',
	fullWidth: true,
};

export const LabelPersistent = Template.bind({});
LabelPersistent.args = {
	label: 'Persistent Label',
	placeholder: 'Метку видно всегда',
	labelPersistent: true,
};

export const Variants = () => (
	<div style={{ display: 'grid', gap: '1rem' }}>
		<Input label='Outline' placeholder='Outline variant' variant='outline' />
		<Input label='Filled' placeholder='Filled variant' variant='filled' />
		<Input
			label='Underline'
			placeholder='Underline variant'
			variant='underline'
		/>
	</div>
);

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled Field',
	placeholder: 'Нельзя редактировать',
	disabled: true,
	startIcon: <Search size={16} />,
	endIcon: <Eye size={16} />,
	onEndIconClick: () => {},
};
