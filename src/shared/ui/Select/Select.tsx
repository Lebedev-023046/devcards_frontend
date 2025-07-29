// components/Select.tsx
import React, { forwardRef } from 'react';
import ReactSelect, {
	type GroupBase,
	type Props as ReactSelectProps,
	type StylesConfig,
} from 'react-select';

// 1) Ваши базовые стили
const defaultStyles: StylesConfig<any, boolean, GroupBase<any>> = {
	placeholder: provided => ({
		...provided,
		color: 'var(--color-text-primary)',
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: 'var(--color-text-primary)',
		'&:hover': { color: 'var(--color-text-primary)' },
	}),
	control: provided => ({
		...provided,
		background:
			'linear-gradient(to right, var(--color-button-primary-dark) 0%, var(--color-button-secondary-dark) 70%)',
		boxShadow: 'none',
		borderRadius: 'var(--radius-md)',
		border: 'none',
		padding: '2px',
	}),
	input: provided => ({
		...provided,
		color: 'var(--color-text-primary)', // например, белый
	}),

	singleValue: provided => ({
		...provided,
		color: 'var(--color-text-primary)',
	}),
	multiValue: provided => ({
		...provided,
		flex: '0 0 auto',
		margin: '2px',
		maxWidth: '100%',
	}),
	multiValueRemove: provided => ({
		...provided,
		color: 'var(--color-background)',
		cursor: 'pointer',
		':hover': {
			color: 'var(--color-text-primary)',
			backgroundColor: 'var(--color-button-primary)',
		},
	}),
	clearIndicator: provided => ({
		...provided,
		color: 'var(--color-text-primary)',
		padding: '4px',
		cursor: 'pointer',
		':hover': { color: 'var(--color-text-primary)' },
	}),
	valueContainer: provided => ({
		...provided,
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
	}),
	option: (provided, state) => ({
		...provided,
		background: state.isFocused ? 'var(--color-button-primary)' : 'transparent',
		color: 'var(--color-text-primary)',
		padding: '8px 12px',
		cursor: 'pointer',
	}),
	menu: provided => ({
		...provided,
		background: 'var(--color-button-primary-dark)',
		borderRadius: '8px',
		marginTop: '4px',
		overflow: 'hidden',
	}),
	noOptionsMessage: provided => ({
		...provided,
		color: 'var(--color-text-primary)',
	}),
};

// 2) Типы пропсов:
//    - Omit убирает `styles` из дефолтных, чтобы мы могли переопределить его
//    - DS = defaultStyles’ type
export type SelectProps<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, 'styles'> & {
	styles?: StylesConfig<Option, IsMulti, Group>;
};

// 3) Собственно сам универсальный компонент
export const Select = forwardRef(function Select<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(
	{
		styles, // ваши пользовательские стили
		...restProps // все остальные пропсы отправим в ReactSelect
	}: SelectProps<Option, IsMulti, Group>,
	ref: React.Ref<any>,
) {
	// Слияние стилей: дефолт + переопределения
	const mergedStyles = React.useMemo(() => {
		if (!styles) return defaultStyles;
		const result: StylesConfig<Option, IsMulti, Group> = {};
		for (const slot of Object.keys(defaultStyles) as Array<
			keyof typeof defaultStyles
		>) {
			result[slot] = (provided, state) => ({
				...defaultStyles[slot]!(provided, state as any),
				...(styles[slot]?.(provided, state as any) || {}),
			});
		}
		return result;
	}, [styles]);

	return (
		<ReactSelect<Option, IsMulti, Group>
			ref={ref}
			styles={mergedStyles as StylesConfig<Option, IsMulti, Group>}
			{...(restProps as ReactSelectProps<Option, IsMulti, Group>)}
		/>
	);
});
