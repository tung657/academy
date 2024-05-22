import { apiClient } from '@/helpers';
import { BASE_URL, ERROR_TIMEOUT, ORIGIN_URL } from '../config';
import { IBaseResponse } from '@/types';

export async function fetchSearchData(
	url: string,
	params: any = {},
): Promise<IBaseResponse> {
	let data = (
		await apiClient.post(
			url,
			{ ...params },
			{
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
			},
		)
	).data;

	// DB sometimes returns error
	while (data.message === ERROR_TIMEOUT && !data.success) {
		data = (
			await apiClient.post(
				url,
				{ ...params },
				{
					baseURL: `${ORIGIN_URL}${BASE_URL}`,
				},
			)
		).data;
	}

	return data;
}

export async function fetchGetData(
	url: string,
	params: any = {},
): Promise<any> {
	let data = (
		await apiClient.get(url, {
			baseURL: `${ORIGIN_URL}${BASE_URL}`,
			params: { ...params },
		})
	).data;

	// DB sometimes returns error
	while (data.message === ERROR_TIMEOUT && !data.success) {
		data = (
			await apiClient.get(url, {
				baseURL: `${ORIGIN_URL}${BASE_URL}`,
				params: { ...params },
			})
		).data;
	}

	return data;
}
