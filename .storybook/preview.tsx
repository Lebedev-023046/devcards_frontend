import type { Preview } from '@storybook/react-vite';
import '../src/app/global.css';
import '../src/app/reset.css';
import { applyTheme, ThemeMode } from '../src/shared/styles/tokens';

applyTheme((localStorage.getItem('theme') as ThemeMode) || 'light');

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
};

export default preview;
