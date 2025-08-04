import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const colors = {
	light: {
		'bg-primary': '#6C5DD3',
		'bg-secondary': '#ffffff',

		'text-primary': '#fafafa',
		'text-secondary': '#21212f',
		'text-tertiary': '#1f1f1f',

		surface: '#4C4C8B',

		'button-primary': '#FEB47B',
		'button-primary-2': '#ffd280',

		'button-secondary': '#5fd3a9',
		'button-secondary-2': '#44ae87',

		'button-tertiary': '#bd75f0',
		'button-tertiary-2': '#D095F5',

		error: '#ff3134',
	},
	dark: {
		'bg-primary': '#1A1A2E',
		'bg-secondary': '#2A2855',

		'text-primary': '#DDDDDD',
		'text-secondary': '#B5B5DC',
		'text-tertiary': '#f0f0f0',

		surface: '#242444',

		'button-primary': '#4FD1C5',
		'button-primary-2': '#2CA6A0',

		'button-secondary': '#4d9cd1',
		'button-secondary-2': '#6CB3E0',

		'button-tertiary': '#4d5ad1',
		'button-tertiary-2': '#7A7Be8',

		error: '#ff4d4f',
	},
};

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				// фоны
				'bg-primary': {
					DEFAULT: { value: colors.light['bg-primary'] },
					_dark: { value: colors.dark['bg-primary'] },
				},
				'bg-secondary': {
					DEFAULT: { value: colors.light['bg-secondary'] },
					_dark: { value: colors.dark['bg-secondary'] },
				},

				// текстовые цвета
				'text-primary': {
					DEFAULT: { value: colors.light['text-primary'] },
					_dark: { value: colors.dark['text-primary'] },
				},
				'text-secondary': {
					DEFAULT: { value: colors.light['text-secondary'] },
					_dark: { value: colors.dark['text-secondary'] },
				},

				// поверхность (cards, panels)
				surface: {
					DEFAULT: { value: colors.light.surface },
					_dark: { value: colors.dark.surface },
				},
			},
		},
		semanticTokens: {
			colors: {
				bg: {
					value: {
						base: colors.light['bg-secondary'],
						_dark: colors.dark['bg-secondary'],
					},
				},
				'bg-accent': {
					value: {
						base: colors.light['bg-primary'],
						_dark: colors.dark['bg-primary'],
					},
				},
				surface: {
					value: {
						base: colors.light.surface,
						_dark: colors.dark.surface,
					},
				},

				// основная палитра
				primary: {
					value: {
						base: colors.light['button-primary'],
						_dark: colors.dark['button-primary'],
					},
				},
				secondary: {
					value: {
						base: colors.light['button-secondary'],
						_dark: colors.dark['button-secondary'],
					},
				},

				// текст
				text: {
					value: {
						base: colors.light['text-primary'],
						_dark: colors.dark['text-primary'],
					},
				},
				'text-emphasis': {
					value: {
						base: colors.light['text-secondary'],
						_dark: colors.dark['text-secondary'],
					},
				},

				'text-contrast': {
					value: {
						base: colors.light['text-tertiary'],
						_dark: colors.dark['text-tertiary'],
					},
				},

				'button-primary': {
					value: {
						base: colors.light['button-primary'],
						_dark: colors.dark['button-primary'],
					},
				},
				'button-primary-gradient': {
					value: {
						base: `linear-gradient(135deg, ${colors.light['button-primary-2']} 0%, ${colors.light['button-primary']} 100%)`,
						_dark: `linear-gradient(135deg, ${colors.dark['button-primary-2']} 0%, ${colors.dark['button-primary']} 100%)`,
					},
				},

				'button-secondary': {
					value: {
						base: colors.light['button-secondary'],
						_dark: colors.dark['button-secondary'],
					},
				},

				'button-secondary-gradient': {
					value: {
						base: `linear-gradient(135deg, ${colors.light['button-secondary-2']} 0%, ${colors.light['button-secondary']} 100%)`,
						_dark: `linear-gradient(135deg, ${colors.dark['button-secondary-2']} 0%, ${colors.dark['button-secondary']} 100%)`,
					},
				},

				'button-tertiary': {
					value: {
						base: colors.light['button-tertiary'],
						_dark: colors.dark['button-tertiary'],
					},
				},

				'button-tertiary-gradient': {
					value: {
						base: `linear-gradient(135deg, ${colors.light['button-tertiary-2']} 0%, ${colors.light['button-tertiary']} 100%)`,
						_dark: `linear-gradient(135deg, ${colors.dark['button-tertiary-2']} 0%, ${colors.dark['button-tertiary']} 100%)`,
					},
				},

				// бордеры
				border: {
					value: {
						base: colors.light['text-primary'],
						_dark: colors.dark['text-primary'],
					},
				},

				error: {
					value: {
						base: colors.light.error,
						_dark: colors.dark.error,
					},
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
export default system;
