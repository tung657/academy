'use client';

import { useSearchFeatures } from '@/utils/query-loader/feature.loader';
import {
	Button,
	Card,
	Flex,
	Grid,
	LoadingOverlay,
	ScrollArea,
} from '@mantine/core';
import Tree from 'rc-tree';
import classes from './scss/feature-tree.module.scss';
import { FeatureModal } from './components/FeatureModal';
import { Key, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { featureSelectedState } from '@/store/feature/atom';
import { FeatureDelete } from './components/FeatureDelete';
import { InputSearch } from '../../mantines/inputs/InputSearch';
import { useSearchParams } from 'next/navigation';
import { ActionTable } from './components/action/ActionTable';
import { SEARCH_CONTENT } from '@/utils/config';
import { TitleRender } from '@/components/mantines/typographies/TitleRender';

export const FeatureTree = (): JSX.Element => {
	const searchParams = useSearchParams();
	const [featureSelected, setFeatureSelected] =
		useRecoilState(featureSelectedState);

	const { data: featuresTree, isInitialLoading: isLoading } = useSearchFeatures(
		{
			params: {
				search_content: searchParams.get(SEARCH_CONTENT),
			},
		},
	);

	const handleSelectKeys = (_: Key[], { selectedNodes }: any) => {
		setFeatureSelected(selectedNodes?.[0]);
	};

	useEffect(() => {
		return () => setFeatureSelected(undefined);
	}, [setFeatureSelected]);

	return (
		<Grid>
			<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
				<Flex justify={'space-between'} gap={16} mb={8}>
					<InputSearch />
					<Button.Group>
						<FeatureModal isCreate treeData={featuresTree} />
						<FeatureModal treeData={featuresTree} />
						<FeatureDelete />
					</Button.Group>
				</Flex>
				{isLoading ? (
					<Card mih={200} shadow="sm">
						<LoadingOverlay visible={isLoading} />
					</Card>
				) : (
					<Card shadow="sm">
						<ScrollArea h={600} type="hover">
							<Tree
								className={classes.tree}
								autoExpandParent
								treeData={featuresTree || []}
								selectedKeys={[featureSelected?.key || -1]}
								onSelect={handleSelectKeys}
								// expandAction="click"
								defaultExpandAll
								showIcon={false}
							/>
						</ScrollArea>
					</Card>
				)}
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
				<Card shadow="sm">
					<TitleRender order={3} pt={8} pb={8}>
						Chi tiết tính năng
					</TitleRender>
					<ActionTable />
				</Card>
			</Grid.Col>
		</Grid>
	);
};
