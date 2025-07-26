import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type Handler = () => void;

/**
 * Хук следит за кликами вне корневого элемента ref и игнорирует клики по элементам из ignoredRefs.
 *
 * @param callback — что делать при клике вне
 * @param ignoredRefs — доп. элементы, клики по которым НЕ считаем «вне»
 * @returns ref — его нужно повесить на корневой контейнер
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
	callback: Handler,
	ignoredRefs: Array<RefObject<HTMLElement>> = [],
) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			const el = ref.current;
			if (!el) return;

			const target = event.target as Node;
			if (el.contains(target)) return;

			for (const ignoredRef of ignoredRefs) {
				const ignoredEl = ignoredRef.current;
				if (ignoredEl && ignoredEl.contains(target)) {
					return;
				}
			}
			callback();
		}

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [callback, ...ignoredRefs]);

	return ref;
}
