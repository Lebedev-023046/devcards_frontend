import { Box, Button, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { BgImageField } from './fields/BgImage';
import { DescriptionField } from './fields/Description';
import { IsPublicField } from './fields/IsPublic';
import { TagsSelect } from './fields/TagsSelect';
import { TitleField } from './fields/Title';

interface CreateDeckFormValues {
	title: string;
	description: string;
	isPublic: boolean;
	backgroundImage: File | null;
	tags: string[];
}

export function CreateDeckForm() {
	const methods = useForm<CreateDeckFormValues>({
		defaultValues: {
			title: '',
			description: '',
			isPublic: true,
			backgroundImage: null,
			tags: [],
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
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
