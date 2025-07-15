import { Button } from '@/shared/ui/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

type ButtonProps = React.ComponentProps<typeof Button>;

const meta: Meta<ButtonProps> = {
	title: 'Button',
	component: Button,
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'outline', 'ghost', 'text', 'link'],
		},
		size: {
			control: { type: 'inline-radio' },
			options: ['sm', 'md', 'lg'],
		},
		shape: {
			control: { type: 'inline-radio' },
			options: ['pill', 'rounded', 'rounded-sm', 'square'],
		},
		fullWidth: { control: 'boolean' },
		loading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		iconOnly: { control: 'boolean' },
		animationType: {
			control: { type: 'select' },
			options: ['none', 'scale', 'ripple', 'lift', 'color', 'combined'],
		},
		tooltip: { control: 'text' },
		onClick: { action: 'clicked' },
		startIcon: { table: { disable: true } },
		endIcon: { table: { disable: true } },
		type: { table: { disable: true } },
		'aria-label': { table: { disable: true } },
	},
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
	args: {
		children: 'Button',
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
		fullWidth: false,
		loading: false,
		disabled: false,
		iconOnly: false,
		animationType: 'none',
		tooltip: '',
		startIcon: <SearchIcon size={16} />,
	},
};

export const Variants: Story = {
	render: args => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			{['primary', 'secondary', 'outline', 'ghost', 'text', 'link'].map(v => (
				<Button key={v} {...args} variant={v as ButtonProps['variant']}>
					{v}
				</Button>
			))}
		</div>
	),
	args: { ...Default.args },
};

export const Sizes: Story = {
	render: args => (
		<div style={{ display: 'flex', gap: '16px' }}>
			{['sm', 'md', 'lg'].map(s => (
				<Button key={s} {...args} size={s as ButtonProps['size']}>
					{s}
				</Button>
			))}
		</div>
	),
	args: { variant: 'primary', shape: 'rounded', animationType: 'none' },
};

export const Shapes: Story = {
	render: args => (
		<div style={{ display: 'flex', gap: '16px' }}>
			{['pill', 'rounded', 'rounded-sm', 'square'].map(sh => (
				<Button key={sh} {...args} shape={sh as ButtonProps['shape']}>
					{sh}
				</Button>
			))}
		</div>
	),
	args: { variant: 'primary', size: 'md', animationType: 'none' },
};

export const FullWidth: Story = {
	args: {
		children: 'Full Width Button',
		fullWidth: true,
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};

export const Loading: Story = {
	args: {
		children: 'Loading',
		loading: true,
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};

export const IconOnly: Story = {
	args: {
		iconOnly: true,
		'aria-label': 'Search',
		startIcon: <SearchIcon size={16} />,
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};

export const Animations: Story = {
	render: args => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			{['none', 'scale', 'ripple', 'lift', 'color', 'combined'].map(anim => (
				<Button
					key={anim}
					{...args}
					animationType={anim as ButtonProps['animationType']}
				>
					{anim}
				</Button>
			))}
		</div>
	),
	args: {
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};

export const WithTooltip: Story = {
	args: {
		children: 'Hover me',
		tooltip: 'This is a tooltip',
		variant: 'primary',
		size: 'md',
		shape: 'rounded',
	},
};
