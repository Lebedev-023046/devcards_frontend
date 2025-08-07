import { Checkbox } from '@/shared/ui/checkbox';
import { Radio, RadioGroup } from '@/shared/ui/radio';
import { CheckboxGroup, Heading, Stack } from '@chakra-ui/react';

type OptionType = {
	value: string;
	label: string;
};

type QuestionProps = {
	question?: string;
	options: OptionType[];
	type: 'SINGLE_CHOICE' | 'MULTI_CHOICE';
	disabled?: boolean;
	defaultValue?: string | string[];
	onChange?: (value: any) => void;
};

export function Question({
	question,
	options,
	type,
	disabled = false,
	defaultValue,
	onChange,
}: QuestionProps) {
	return (
		<Stack fontSize='2xl' h='100%' gap={4}>
			{question && <Heading>{question}</Heading>}
			{type === 'SINGLE_CHOICE' ? (
				<RadioGroup
					display='flex'
					flexDirection='column'
					mt={6}
					gap={4}
					boxShadow='xmd'
					overflow='auto'
					disabled={disabled}
					defaultValue={defaultValue as string}
					onChange={onChange}
				>
					{options.map(option => (
						<Radio key={option.value} value={option.value} fontSize='1rem'>
							{option.label}
						</Radio>
					))}
				</RadioGroup>
			) : (
				<CheckboxGroup
					display='flex'
					flexDirection='column'
					mt={6}
					gap={4}
					boxShadow='xmd'
					overflow='auto'
					disabled={disabled}
					defaultValue={defaultValue as string[]}
					onChange={onChange}
				>
					{options.map(option => (
						<Checkbox key={option.value} value={option.value} fontSize='1rem'>
							{option.label}
						</Checkbox>
					))}
				</CheckboxGroup>
			)}
		</Stack>
	);
}
