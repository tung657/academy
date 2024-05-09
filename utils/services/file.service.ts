import { apiClient } from '@/helpers';
import { IBaseResponse } from '@/types';

const prefix = '/file';

export const uploadFile = async (
	data: FormData,
): Promise<{
	fileName: string;
	size: number;
	lastModified: Date;
	url: string;
	preview?: string;
}> => {
	const result = await apiClient.post(`${prefix}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return result.data;
};

export const deleteFile = async (
	filePath: string | string[],
): Promise<IBaseResponse> => {
	const result = await apiClient.post(`${prefix}/delete`, { paths: filePath });

	return result.data;
};
