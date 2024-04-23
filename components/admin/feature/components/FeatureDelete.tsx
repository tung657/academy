'use client';

import { ButtonTrash } from '@/components/mantines/buttons/ButtonGroup';
import { ModalRender } from '@/components/mantines/modal/ModalRender';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { featureSelectedState } from '@/store/feature/atom';
import { userState } from '@/store/user/atom';
import { IBaseDelete } from '@/types';
import { CACHE_FEATURE, queryClient, useDeleteFeature } from '@/utils';
import { Box, Center, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useRecoilState, useRecoilValue } from 'recoil';

export const FeatureDelete = (): JSX.Element => {
	const [opened, { open, close }] = useDisclosure();
	const t = useTranslations();

	const [featureSelected, setFeatureSelected] =
		useRecoilState(featureSelectedState);
	const userProfile = useRecoilValue(userState);

	const deleteFeature = useDeleteFeature({
		config: {
			onSuccess: async (data) => {
				if (data.success === false) {
					getNotifications('error', t, data.message);
					return;
				}
				setFeatureSelected(undefined);
				getNotifications('success', t, data.message);
				await queryClient.invalidateQueries([CACHE_FEATURE.SEARCH]);
				handleCloseModal();
			},
			onError: (error) => {
				getNotifications('error', t, error.message);
			},
		},
	});

	const handleSubmit = () => {
		const dataPost: IBaseDelete = {
			list_json: [{ function_id: featureSelected?.key }],
			lu_user_id: userProfile.user_id,
		};

		deleteFeature.mutate(dataPost);
	};

	const handleOpenModal = () => {
		open();
	};

	const handleCloseModal = () => {
		close();
	};

	return (
		<>
			<ButtonTrash
				size="sm"
				onClick={handleOpenModal}
				disabled={!featureSelected}
			/>
			<ModalRender
				opened={opened}
				onClose={handleCloseModal}
				title={t('features.title_delete')}
				footer={{
					onOk: () => handleSubmit(),
					isConfirming: deleteFeature.isLoading,
					okText: t('global.btn_confirm'),
				}}
			>
				<Box>
					<Center>
						<Text fw={700} fz={18}>
							{t('messages.warning_delete')}{' '}
							<Text component="span" fw={700} fz={18} c="red">
								{featureSelected?.title}
							</Text>{' '}
							?
						</Text>
					</Center>
				</Box>
			</ModalRender>
		</>
	);
};
