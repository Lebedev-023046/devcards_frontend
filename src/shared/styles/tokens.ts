export type ThemeMode = 'light' | 'dark';

export const tokens = {
	color: {
		light: {
			// Primary color: main brand hue for primary buttons, links, and highlights
			primary: '#6C5DD3',
			// Hover state for primary elements
			'primary-hover': '#3A4994',
			// Active/pressed state for primary elements
			'primary-active': '#2B3770',

			// Secondary color: for secondary buttons, badges, accents
			secondary: '#122C5C',
			'secondary-hover': '#1A4086',
			'secondary-active': '#2254B1',

			background: '#FFFFFF',
			'background-hover': '#6565FA',
			'background-active': '#4848f9',

			surface: '#4c4c8b',

			'button-primary': '#FEB47B',
			'button-secondary': '#FF7E5F',

			// Main body text
			'text-primary': '#f3f2f2',
			// Secondary text: subtitles, labels
			'text-secondary': '#55557A',
			// Muted text: placeholders, disabled text
			'text-muted': '#bebebe',
			// Inverse text on dark surfaces/buttons
			'text-inverse': '#000000',

			// Border lines, dividers
			border: '#E0E0F0',
			// Accent: sparing highlights, links, badges
			accent: '#FFDAF4',
			'accent-hover': '#FFA7E4',
			'accent-active': '#FF74D5',

			// Status colors
			error: '#E53E3E', // error messages, icons
			warning: '#DD6B20', // warnings, alerts
			success: '#2F855A', // confirmations, success states
		},

		dark: {
			// Primary color
			primary: '#1A1A2E',
			'primary-hover': '#7B6CE3',
			'primary-active': '#594AB0',

			// Secondary color
			secondary: '#6B5AC5',
			'secondary-hover': '#5A48A8',
			'secondary-active': '#49368A',

			// Dark page background
			background: '#2A2855',
			// Dark surface (cards, panels)
			surface: '#242444',

			'button-primary': '#4FD1C5',
			'button-secondary': '#38B2AC',

			// Main text on dark bg
			'text-primary': '#dddddd',
			// Secondary text
			'text-secondary': '#B5B5DC',
			// Muted text
			'text-muted': '#8A8ABF',
			// Inverse text on light surfaces
			'text-inverse': '#FFFFFF',

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
		0: '0rem',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '1.75rem',
		10: '2rem',
		12: '2.5rem',
		13: '2.75rem',
		14: '3rem',
		15: '3.25rem',
		16: '4rem',
		20: '5rem',
		24: '6rem',
		32: '8rem',
		40: '10rem',
		48: '12rem',
		56: '14rem',
		64: '16rem',
	},
	radius: {
		none: '0px',
		sm: '4px',
		md: '8px',
		lg: '16px',
		rounded: '9999px',
	},
	shadow: {
		sm: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)',
		md: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.10)',
		lg: '0 0.625rem 0.9375rem rgba(0, 0, 0, 0.15)',
	},
	font: {
		'family-heading': 'Poppins, sans-serif',
		'family-body': 'Roboto, sans-serif',
		'size-xs': '0.75rem',
		'size-sm': '0.875rem',
		'size-md': '1rem',
		'size-lg': '1.25rem',
		'size-xl': '1.5rem',
		'size-2xl': '2rem',
		'size-3xl': '4rem',
		'size-title': '6rem',
		'size-subtitle': '2.5rem',
		'weight-regular': '400',
		'weight-medium': '500',
		'weight-bold': '700',
	},
	size: {
		spinner: '1em',
		icon: '1em',
		logo: '4rem',
		logoMobile: '3rem',
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
	Object.entries(tokens.size).forEach(
		([k, v]) => (commonVars[`--size-${k}`] = v),
	);
	setVars(commonVars);

	// 2) theme-specific colors
	const colorVars: Record<string, string> = {};
	Object.entries(tokens.color[mode]).forEach(([k, v]) => {
		colorVars[`--color-${k}`] = v;
	});
	setVars(colorVars);
}
