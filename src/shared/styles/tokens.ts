export type ThemeMode = 'light' | 'dark';

export const tokens = {
	color: {
		light: {
			// Primary color: main brand hue for primary buttons, links, and highlights
			primary: '#6C5DD3',
			// Hover state for primary elements
			'primary-hover': '#5B4BC1',
			// Active/pressed state for primary elements
			'primary-active': '#4A3990',

			// Secondary color: for secondary buttons, badges, accents
			secondary: '#3F51B5',
			'secondary-hover': '#344494',
			'secondary-active': '#2A3573',

			// Page background (canvas)
			background: '#F5F7FF',
			// Surface background (cards, panels)
			surface: '#FFFFFF',

			// Main body text
			'text-primary': '#1F1F40',
			// Secondary text: subtitles, labels
			'text-secondary': '#55557A',
			// Muted text: placeholders, disabled text
			'text-muted': '#8888A0',
			// Inverse text on dark surfaces/buttons
			'text-inverse': '#FFFFFF',

			// Border lines, dividers
			border: '#E0E0F0',
			// Accent: sparing highlights, links, badges
			accent: '#9F7AEA',

			// Status colors
			error: '#E53E3E', // error messages, icons
			warning: '#DD6B20', // warnings, alerts
			success: '#2F855A', // confirmations, success states
		},

		dark: {
			// Primary color for dark mode
			primary: '#8E7EF3',
			// Hover state in dark mode
			'primary-hover': '#7B6CE3',
			// Active state in dark mode
			'primary-active': '#594AB0',

			// Secondary color
			secondary: '#6B5AC5',
			'secondary-hover': '#5A48A8',
			'secondary-active': '#49368A',

			// Dark page background
			background: '#1A1A2E',
			// Dark surface (cards, panels)
			surface: '#242444',

			// Main text on dark bg
			'text-primary': '#EDEDED',
			// Secondary text
			'text-secondary': '#B5B5DC',
			// Muted text
			'text-muted': '#8A8ABF',
			// Inverse text on light surfaces
			'text-inverse': '#1A1A2E',

			// Borders/dividers in dark mode
			border: '#3B3B5A',
			// Accent highlights
			accent: '#A78BFA',

			// Status colors in dark
			error: '#FF6B6B',
			warning: '#FFA94D',
			success: '#51CF66',
		},
	},

	// These tokens apply to both themes
	spacing: {
		0: '0px',
		1: '4px',
		2: '8px',
		3: '12px',
		4: '16px',
		5: '24px',
		6: '32px',
		8: '48px',
		10: '64px',
	},
	radius: {
		none: '0px',
		sm: '4px',
		md: '8px',
		lg: '16px',
		rounded: '9999px',
	},
	shadow: {
		sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px rgba(0, 0, 0, 0.10)',
		lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
	},
	font: {
		'family-sans': "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif",
		'family-mono': "Menlo, Monaco, Consolas, 'Courier New', monospace",
		'size-xs': '12px',
		'size-sm': '14px',
		'size-md': '16px',
		'size-lg': '20px',
		'size-xl': '24px',
		'weight-regular': '400',
		'weight-medium': '500',
		'weight-bold': '700',
	},
	size: {
		spinner: '16px',
		icon: '1em',
	},
};

function setVars(map: Record<string, string>) {
	const root = document.documentElement;
	Object.entries(map).forEach(([key, val]) => {
		root.style.setProperty(key, val);
	});
}

export function applyTheme(mode: ThemeMode) {
	// 1) common
	const commonVars: Record<string, string> = {};
	Object.entries(tokens.spacing).forEach(
		([k, v]) => (commonVars[`--spacing-${k}`] = v),
	);
	Object.entries(tokens.radius).forEach(
		([k, v]) => (commonVars[`--radius-${k}`] = v),
	);
	Object.entries(tokens.shadow).forEach(
		([k, v]) => (commonVars[`--shadow-${k}`] = v),
	);
	Object.entries(tokens.font).forEach(
		([k, v]) => (commonVars[`--font-${k}`] = v),
	);
	setVars(commonVars);

	// 2) theme-specific colors
	const colorVars: Record<string, string> = {};
	Object.entries(tokens.color[mode]).forEach(([k, v]) => {
		colorVars[`--color-${k}`] = v;
	});
	setVars(colorVars);
}
