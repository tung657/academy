import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconNotebook } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { ModalRender } from '@/components/mantines/modal/ModalRender';

import { ResearchTypeTable } from './components/ResearchTypeTable';

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
