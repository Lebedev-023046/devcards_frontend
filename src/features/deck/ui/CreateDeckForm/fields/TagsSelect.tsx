import { tagsApi } from "@/entities/tag/api";
import { Field, FieldLabel } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { GroupBase } from "react-select";
import { AsyncPaginate, type LoadOptions } from "react-select-async-paginate";

interface TagOption {
	value: string;
	label: string;
}

interface TagsAdditional {
	page: number;
}

export function TagsSelect() {
	const { control } = useFormContext();

	const [fetchError, setFetchError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const loadOptions: LoadOptions<
		TagOption,
		GroupBase<TagOption>,
		TagsAdditional
	> = async (inputValue, _loadedOptions, additional) => {
		const page = additional?.page ?? 1;

		try {
			const tagsInfo = await tagsApi.getAllTags({
				page,
				limit: 10,
				search: inputValue,
			});

			return {
				options: tagsInfo.data.map((tag) => ({
					value: tag.id,
					label: tag.name,
				})),
				hasMore: tagsInfo.page < tagsInfo.lastPage,
				additional: {
					page: tagsInfo.page + 1,
				},
			};
		} catch {
			setFetchError(true);
			return {
				options: [] as TagOption[],
				hasMore: false,
				additional: { page },
			};
		} finally {
			setIsLoading(false);
		}
	};

	function noOptionsMessage({ inputValue }: { inputValue: string }) {
		if (isLoading) return "Загрузка тегов...";
		if (fetchError) return "Не удалось загрузить теги.";

		if (inputValue && !isLoading) return "Нет совпадений";
		return "Нет тегов";
	}

	const placeholder = fetchError
		? "Ошибка загрузки"
		: isLoading
			? "Загрузка..."
			: "Выберите теги";

	return (
		<Controller
			name="tags"
			control={control}
			defaultValue={[]}
			render={({ field }) => (
				<Field.Root
					width={"100%"}
					display={"flex"}
					flexDirection={"column"}
					gap={"0.2rem"}
					color={"text-secondary"}
				>
					<FieldLabel
						fontSize={"0.875rem"}
						fontWeight={500}
						color={"text-contrast"}
						htmlFor="tags"
					>
						Теги колоды
					</FieldLabel>
					<AsyncPaginate<TagOption, GroupBase<TagOption>, TagsAdditional, true>
						styles={{ container: () => ({ width: "100%" }) }}
						isMulti
						id="tags"
						placeholder={placeholder}
						loadOptions={loadOptions}
						noOptionsMessage={noOptionsMessage}
						additional={{ page: 1 }}
						closeMenuOnSelect={false}
						value={field.value}
						onChange={(selected) => field.onChange(selected)}
					/>
				</Field.Root>
			)}
		/>
	);
}
