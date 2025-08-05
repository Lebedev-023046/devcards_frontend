import { ConfirmDialog } from '@/shared/ui/сonfirmDialog';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useDeleteDeck } from './useDeleteDeck';

export const useDeleteDeckView = () => {
	const { open, onOpen, onClose } = useDisclosure();

	const { mutate: removeDeck, isPending } = useDeleteDeck();
	const [targetDeckId, setTargetDeckId] = useState<string | null>(null);

	const handleDeleteDeck = async () => {
		if (targetDeckId) {
			removeDeck(targetDeckId);
		}
		onClose();
	};

	const renderRemoveIcon = (deckId: string) => (
		<IconButton aria-label='Remove deck' unstyled disabled={isPending}>
			<Trash
				cursor='pointer'
				size='1.5rem'
				onClick={() => {
					setTargetDeckId(deckId);
					onOpen();
				}}
			/>
		</IconButton>
	);

	const renderConfirmDeckDeletionDialog = () => (
		<ConfirmDialog
			isOpen={open}
			onClose={onClose}
			onConfirm={handleDeleteDeck}
			title='Удалить колоду?'
			description='Вы уверены, что хотите удалить эту колоду? Это действие нельзя отменить.'
			confirmText='Удалить'
			cancelText='Отмена'
			isLoading={isPending}
		/>
	);

	return {
		renderConfirmDeckDeletionDialog,
		renderRemoveIcon,
	};
};
