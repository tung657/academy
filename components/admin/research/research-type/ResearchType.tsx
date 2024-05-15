import { useDisclosure } from '@mantine/hooks';
import { ResearchTypeTable } from './components/ResearchTypeTable';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconNotebook } from '@tabler/icons-react';
import { ModalRender } from '@/components/mantines/modal/ModalRender';

export const ResearchType = (): JSX.Element => {
	const t = useTranslations();
	const [opened, { close, open }] = useDisclosure();

	return (
		<>
			<Button
				bg={'red'}
				leftSection={<IconNotebook size={20} />}
				onClick={open}
			>
				{t('research_types.heading')}
			</Button>
			<ModalRender
				title={t('research_types.heading')}
				closeOnEscape={false}
				size={'80%'}
				onClose={close}
				opened={opened}
				footer={{ hasContent: false }}
			>
				<ResearchTypeTable />
			</ModalRender>
		</>
	);
};
