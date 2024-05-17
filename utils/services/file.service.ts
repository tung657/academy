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

export const downloadFile = async (filePath: string) => {
	const response = await apiClient.get(`/`, {
		baseURL: filePath,
		responseType: 'blob',
	});

	if (response?.data) {
		const href = URL.createObjectURL(response.data);
		const link = document.createElement('a');
		link.href = href;
		const [nameEncode] = filePath.split('/')?.reverse(); // get file encoded
		const [fileName] = atob(nameEncode).split('/').reverse(); // decode and get name (2024-12-12/name_file.pdf)
		link.setAttribute('download', `${fileName}`); //or any other extension
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	}
};
