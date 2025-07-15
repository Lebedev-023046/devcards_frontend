import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
	content: string;
	children: ReactNode;
	delay?: number;
}

export function Tooltip({ content, children, delay = 50 }: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const show = () => {
		timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
	};
	const hide = () => {
		if (timeoutRef.current === null) return;
		clearTimeout(timeoutRef.current);
		setVisible(false);
	};

	useEffect(
		() => () => {
			if (timeoutRef.current === null) return;
			clearTimeout(timeoutRef.current);
		},
		[],
	);

	return (
		<span
			className={styles.wrapper}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocus={show}
			onBlur={hide}
		>
			{children}
			{visible && (
				<span role='tooltip' className={styles.tooltip}>
					{content}
				</span>
			)}
		</span>
	);
}
