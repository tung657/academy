import { Box, Button, Flex, FocusTrap, Modal, ModalProps } from '@mantine/core';
import { TitleRender } from '../typographies/TitleRender';
import { useTranslations } from 'next-intl';

interface Props extends ModalProps {
	footer?: {
		hasContent?: boolean;
		okText?: string;
		cancelText?: string;
		onOk?: () => void;
		onCancel?: () => void;
		showOkButton?: boolean;
		showCancelButton?: boolean;
		isConfirming?: boolean;
	};
}

export const ModalRender = ({ footer, ...props }: Props): JSX.Element => {
	const t = useTranslations('global');

	footer = {
		hasContent: true,
		showCancelButton: true,
		showOkButton: true,
		isConfirming: false,
		...footer,
	};

	return (
		<Modal.Root
			yOffset={60}
			size={'lg'}
			transitionProps={{
				transition: 'fade-down',
			}}
			closeOnClickOutside={false}
			zIndex={1000}
			{...props}
		>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header bg={'primary'} mih={30} py={8}>
					<TitleRender order={4} tt={'uppercase'} c={'white'}>
						{props.title}
					</TitleRender>
					<Modal.CloseButton
						c="white"
						onClick={props.onClose}
						bg={'transparent'}
					/>
				</Modal.Header>
				<FocusTrap active={props.opened}>
					<Modal.Body pt={8}>{props.children}</Modal.Body>
					{footer.hasContent && (
						<Box
							pos={'sticky'}
							px={'md'}
							py={'sm'}
							bottom={0}
							bg={'var(--mantine-color-body)'}
						>
							<Flex pt={0} justify={'flex-end'} gap={10}>
								{footer.showCancelButton && (
									<Button
										variant="default"
										onClick={footer.onCancel || props.onClose}
									>
										{footer.cancelText || t('btn_cancel')}
									</Button>
								)}
								{footer.showOkButton && (
									<Button
										data-autofocus
										type="submit"
										loading={footer.isConfirming}
										loaderProps={{ type: 'dots' }}
										onClick={footer.onOk}
										onSubmit={footer.onOk}
									>
										{footer.okText || t('btn_save')}
									</Button>
								)}
							</Flex>
						</Box>
					)}
				</FocusTrap>
			</Modal.Content>
		</Modal.Root>
	);
};
