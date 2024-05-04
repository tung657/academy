import { apiClient } from '@/helpers';

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

export const deleteFile = async (data: { filePath: string }): Promise<any> => {
	const result = await apiClient.post(`${prefix}/delete-file`, data);

	return result.data;
};
