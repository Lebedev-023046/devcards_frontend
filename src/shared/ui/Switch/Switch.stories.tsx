import type { Meta, StoryFn } from '@storybook/react';
import { Switch } from './Switch';
import type { SwitchProps } from './types';

export default {
	title: 'Switch',
	component: Switch,
	argTypes: {
		checked: { control: 'boolean', description: 'Состояние переключателя' },
		onChange: { action: 'changed', description: 'Колбэк при переключении' },
		disabled: { control: 'boolean', description: 'Блокировка свича' },
		size: {
			control: { type: 'radio' },
			options: ['sm', 'md', 'lg'],
			description: 'Размер свича',
		},
		label: { control: 'text', description: 'Метка рядом со свичем' },
	},
} as Meta<SwitchProps>;

const Template: StoryFn<SwitchProps> = args => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
	checked: false,
	disabled: false,
	size: 'md',
};

export const Checked = Template.bind({});
Checked.args = {
	checked: true,
	disabled: false,
	size: 'md',
};

export const Disabled = Template.bind({});
Disabled.args = {
	checked: false,
	disabled: true,
	size: 'md',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	checked: false,
	label: 'Dark Mode',
	size: 'md',
};

export const Sizes = () => (
	<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
		<Switch size='sm' checked={false} label='Small' />
		<Switch size='md' checked={false} label='Medium' />
		<Switch size='lg' checked={false} label='Large' />
	</div>
);

export const Interactive = Template.bind({});
Interactive.args = {
	checked: false,
	label: 'Enable feature',
	size: 'md',
};
