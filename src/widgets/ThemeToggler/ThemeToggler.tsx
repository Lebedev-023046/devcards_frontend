import { useTheme } from '@/shared/styles/useTheme';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import styles from './ThemeToggler.module.css';
import Moon from '/header/moon.svg';
import Sun from '/header/sun.svg';

export function ThemeToggler() {
	const { theme, setTheme } = useTheme();

	const isDark = theme === 'dark';

	const onClick = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Button
			variant='ghost'
			size='xs'
			iconOnly
			aria-label='Toggle theme'
			startIcon={
				<img
					className={cn(styles.toggleIcon, !isDark && styles.rotate)}
					src={isDark ? Moon : Sun}
					alt='toggle theme'
				/>
			}
			onClick={onClick}
		>
			Toggle Theme
		</Button>
	);
}
