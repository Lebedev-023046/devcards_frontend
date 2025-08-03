import { tagsApi } from '@/entities/tag/api';
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import styles from './CreateDeckForm.module.css';

export function TagsSelect() {
	const [fetchError, setFetchError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function loadOptions(inputValue: string, __: any, { page }: any) {
		try {
			const { data: response } = await tagsApi.getAllTags({
				page: +page,
				limit: 10,
				search: inputValue,
			});
			return {
				options: response.data.map(tag => ({
					value: tag.id,
					label: tag.name,
				})),
				hasMore: response.page < response.lastPage,
				additional: {
					page: response.page + 1,
				},
			};
		} catch (e) {
			setFetchError(true);
			return {
				options: [],
				hasMore: false,
				additional: { page },
			};
		} finally {
			setIsLoading(false);
		}
	}
	function noOptionsMessage({ inputValue }: { inputValue: string }) {
		if (isLoading) return 'Загрузка тегов...';
		if (fetchError) return 'Не удалось загрузить теги.';

		if (inputValue && !isLoading) return 'Нет совпадений';
		return 'Нет тегов';
	}

	const placeholder = fetchError
		? 'Ошибка загрузки'
		: isLoading
		? 'Загрузка...'
		: 'Выберите теги';

	return (
		<div className={styles.selectWrapper}>
			<label className={styles.selectLabel} htmlFor='tags'>
				Теги колоды
			</label>
			<AsyncPaginate
				isMulti
				id='tags'
				placeholder={placeholder}
				loadOptions={loadOptions}
				noOptionsMessage={noOptionsMessage}
				additional={{ page: 1 }}
				closeMenuOnSelect={false}
			/>
		</div>
	);
}
