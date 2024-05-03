'use client';

import { useSearchFeatures } from '@/utils/query-loader/feature.loader';
import { Card, Flex, Grid, LoadingOverlay, ScrollArea } from '@mantine/core';
import Tree from 'rc-tree';
import classes from './scss/feature-tree.module.scss';
import { Key, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { featureSelectedState, roleState } from '@/store/feature/atom';
import { ActionTable } from './components/action/ActionTable';
import { ERROR_TIMEOUT, LOCAL_USER } from '@/utils/config';
import { useSearchRoles } from '@/utils/query-loader/role.loader';
import { userState } from '@/store/user/atom';
import {
	getFeatureByRole,
	getFeaturesByUser,
} from '@/utils/services/feature.service';
import {
	checkIfNotEnoughLeafs,
	filterNot,
	flattenTree,
	getFeatureTree,
} from '@/utils/array';
import _ from 'lodash';
import { useCreatePerFeaForRole } from '@/utils/query-loader/role-feature.loader';
import { getNotifications } from '@/components/mantines/notification/getNotifications';
import { useTranslations } from 'next-intl';
import { setCookie } from 'cookies-next';
import { SelectRender } from '@/components/mantines/inputs/SelectRender';
import { RoleTable } from './components/RoleTable';
import { TitleRender } from '@/components/mantines/typographies/TitleRender';

export const RoleTree = (): JSX.Element => {
	const [userRecoil] = useRecoilState(userState);
	const [roleId, setRoleId] = useRecoilState(roleState);

	// Get roles
	const {
		data: dataRoles,
		isFetching,
		refetch: refetchRole,
	} = useSearchRoles({
		params: {
			user_id: userRecoil.user_id,
		},
		config: {
			onSuccess: async (data) => {
				// Init role
				setRoleId((prev) => (prev ? prev : data?.data?.[0]?.role_id));
				if (data.message === ERROR_TIMEOUT) {
					refetchRole();
				}
			},
		},
	});

	const { data: featuresTree, isInitialLoading: isLoading } = useSearchFeatures(
		{
			params: {},
		},
	);

	return (
		<Grid>
			<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
				<Flex justify={'space-between'} gap={16}>
					<SelectRender
						onChange={(value) => setRoleId(+(value || -1))}
						value={roleId?.toString()}
						loading={isFetching}
						data={
							dataRoles?.data
								? dataRoles.data.map((role) => ({
										label: role.role_name,
										value: role.role_id.toString(),
									}))
								: []
						}
					/>
					<RoleTable />
				</Flex>
				{isLoading ? (
					<Card mih={200} shadow="sm">
						<LoadingOverlay
							visible={isLoading}
							loaderProps={{ type: 'bars' }}
						/>
					</Card>
				) : (
					<Card shadow="sm">
						<ScrollArea h={600} type="hover">
							<TreeRender featuresTree={featuresTree} roleId={roleId} />
						</ScrollArea>
					</Card>
				)}
			</Grid.Col>
			<Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
				<Card shadow="sm" pt={0}>
					<TitleRender order={3} pt={4} pb={8}>
						Chi tiết tính năng
					</TitleRender>
					<ActionTable />
				</Card>
			</Grid.Col>
		</Grid>
	);
};

function TreeRender({
	featuresTree,
	roleId,
}: {
	featuresTree: any;
	roleId?: number;
}) {
	const t = useTranslations();
	const [userRecoil, setUserRecoil] = useRecoilState(userState);
	const [dataChecked, setDataChecked] = useState<any>([]);
	const [featureSelected, setFeatureSelected] =
		useRecoilState(featureSelectedState);

	const createFuncPermissions = useCreatePerFeaForRole({
		config: {
			onSuccess: (data) => {
				if (!data.success && data.message) {
					getNotifications('error', t, data.message);

					return;
				}
				getNotifications(
					'success',
					t,
					'Vui lòng đăng nhập lại nếu không thấy thay đổi',
				);

				handleSetNewFeatures();
			},
			onError: () => {
				getNotifications('error', t);
			},
		},
	});

	useEffect(() => {
		if (roleId) {
			getFeatureByRole(roleId).then((role: any) => {
				const features = role.map((i: any) => i.function_id) || [];
				const parentToRemove =
					checkIfNotEnoughLeafs(featuresTree || [], features) || [];
				const result = _.difference(features, parentToRemove);
				setDataChecked(result);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roleId]);

	const handleSelectKeys = (_: Key[], { selectedNodes }: any) => {
		setFeatureSelected(selectedNodes?.[0]);
	};

	const handleSetNewFeatures = async () => {
		const newFeatures = await getFeaturesByUser(userRecoil.user_id);

		if (!newFeatures.success && newFeatures.message) return;

		const user = _.clone(userRecoil);
		user.features = getFeatureTree(newFeatures, 1, 0);

		setUserRecoil(user);
		setCookie(LOCAL_USER, JSON.stringify(user));
	};

	useEffect(() => {
		return () => setFeatureSelected(undefined);
	}, [setFeatureSelected]);

	const handleCheck = (checked: any, info: any) => {
		handleOk(checked, info.halfCheckedKeys);
	};

	// Handle save
	const handleOk = async (checked: any, halfCheckedKeys: any[] = []) => {
		const role_function_list = [
			...checked?.map((i: any) => ({
				role_function_id: '',
				function_id: i,
				role_id: roleId,
				active_flag: 1,
			})),
			...filterNot(flattenTree(featuresTree), checked, 'key').map((i) => ({
				role_function_id: '',
				function_id: i.key,
				role_id: roleId,
				active_flag: 0,
			})),
		];

		if (halfCheckedKeys.length > 0) {
			role_function_list.forEach((data) => {
				const haftIndex = halfCheckedKeys.findIndex(
					(key) => key === data.function_id,
				);
				if (haftIndex >= 0) data.active_flag = 1;
			});
		}

		const dataPost = {
			role_function_list,
			created_by_user_id: userRecoil.user_id || userRecoil.user_name,
		};

		const result = await createFuncPermissions.mutateAsync(dataPost);
		if (result.success) {
			setDataChecked(checked);
		}
	};

	return (
		<Tree
			className={classes.tree}
			autoExpandParent
			checkable
			checkedKeys={dataChecked}
			onCheck={handleCheck}
			treeData={featuresTree || []}
			selectedKeys={[featureSelected?.key || -1]}
			onSelect={handleSelectKeys}
			// expandAction="click"
			defaultExpandAll
			showIcon={false}
		/>
	);
}
