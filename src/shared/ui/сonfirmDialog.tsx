import { Button, Dialog, Flex, Text } from '@chakra-ui/react';

export interface ConfirmDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
}

export function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title = 'Подтвердите действие',
	description = 'Вы уверены, что хотите продолжить?',
	confirmText = 'Да',
	cancelText = 'Отмена',
	isLoading = false,
}: ConfirmDialogProps) {
	return (
		<Dialog.Root
			placement='center'
			motionPreset='slide-in-top'
			open={isOpen}
			onOpenChange={v => !v && onClose()}
			lazyMount
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content bg={'bg-accent'} color={'text-primary'}>
					<Dialog.CloseTrigger />
					<Dialog.Header>
						<Dialog.Title>{title}</Dialog.Title>
					</Dialog.Header>
					<Dialog.Body>
						<Text>{description}</Text>
					</Dialog.Body>
					<Dialog.Footer>
						<Flex gap={2} w='100%' justify='flex-end'>
							<Button bg='red.400' onClick={onClose}>
								{cancelText}
							</Button>
							<Button bg='green.600' onClick={onConfirm} loading={isLoading}>
								{confirmText}
							</Button>
						</Flex>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
