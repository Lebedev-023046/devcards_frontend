import { CommonCard } from '@/shared/ui/commonCard';
import { Tooltip } from '@/shared/ui/tooltip';
import { Flex, Icon } from '@chakra-ui/react';
import CreateCardImg from '/card/create-card.svg';

export function CreateCard() {
	return (
		<CommonCard>
			<Flex alignItems='center' justifyContent='center' h={'250px'} w={'100%'}>
				<Tooltip
					lazyMount
					content='Создать карточки'
					positioning={{
						placement: 'top',
						offset: { mainAxis: 24, crossAxis: 4 },
					}}
					contentProps={{
						css: {
							'--tooltip-bg': 'var(--chakra-colors-button-primary)',
							fontSize: 'lg',
							padding: '0.5rem 1rem',
						},
					}}
				>
					<Icon w='8rem' h='8rem'>
						<img src={CreateCardImg} alt='create-card-icon' />
					</Icon>
				</Tooltip>
			</Flex>
		</CommonCard>
	);
}
