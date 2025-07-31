import { useColorMode } from '@/shared/styles/color-mode';

import { IconButton } from '@chakra-ui/react';
import cn from 'clsx';
import styles from './ThemeToggler.module.css';
import Moon from '/header/moon.svg';
import Sun from '/header/sun.svg';

export function ThemeToggler() {
	const { colorMode, toggleColorMode } = useColorMode();

	const isDark = colorMode === 'dark';

	return (
		<IconButton
			variant='ghost'
			size='xs'
			bg='transparent'
			aria-label='Toggle theme'
			onClick={toggleColorMode}
		>
			<img
				className={cn(styles.toggleIcon, !isDark && styles.rotate)}
				src={isDark ? Moon : Sun}
				alt='toggle theme'
			/>
		</IconButton>
	);
}
