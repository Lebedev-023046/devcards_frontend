import type { DeckRequest } from '@/entities/deck/model';
import { uploadsApi } from '@/shared/api/uploadsApi';
import { Box, Button, Stack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateDeck } from '../../hooks/useCreateDeck';
import { BgImageField } from './fields/BgImage';
import { DescriptionField } from './fields/Description';
import { IsPublicField } from './fields/IsPublic';
import { TagsSelect } from './fields/TagsSelect';
import { TitleField } from './fields/Title';

type SelectOption = {
	label: string;
	value: string;
};

type formValues = Omit<DeckRequest, 'tagIds'> & { tags: SelectOption[] };

function useUploadDeckCover() {
	return useMutation({
		mutationFn: (file: File) => uploadsApi.uploadDeckCover(file),
	});
}

export function CreateDeckForm() {
	const methods = useForm<formValues>({
		defaultValues: {
			title: '',
			description: '',
			isPublic: true,
			coverImageUrl: undefined,
			tags: [],
		},
	});

	const { mutate: createDeck } = useCreateDeck();
	const { mutateAsync: uploadDeckCover } = useUploadDeckCover();

	const onSubmit = async (data: formValues) => {
		let coverImageFile = data.coverImageUrl; // get coverImageUrl as File

		if (coverImageFile instanceof File) {
			const coverImageUrl = await uploadDeckCover(coverImageFile);
			coverImageFile = coverImageUrl;
		}

		// convert tags (selectOption Type) into tagIda
		const tagIds = data.tags.map(tag => tag.value);
		// remove tags from data
		const { tags, ...rest } = data;
		// create deck with required fields including tagIds
		createDeck({ ...rest, tagIds, coverImageUrl: coverImageFile });
	};

	return (
		<FormProvider {...methods}>
			<Box
				color='text-contrast'
				as='form'
				onSubmit={methods.handleSubmit(onSubmit)}
				role='form'
				mt={6}
				maxW={520}
				mx='auto'
			>
				<Stack gap={4}>
					{/* TITLE */}
					<TitleField />
					{/* DESCRIPTION */}
					<DescriptionField />
					{/* IS PUBLIC */}
					<IsPublicField />
					{/* BACKGROUND IMAGE */}
					<BgImageField />
					{/* TAGS */}
					<TagsSelect />
				</Stack>

				<Button mt={7} fontSize='1.25rem' bg='button-primary' type='submit'>
					Создать колоду
				</Button>

				{/* should be additional fields */}
				{/* <Input inputSize='lg' placeholder='Cards' /> */}
			</Box>
		</FormProvider>
	);
}
