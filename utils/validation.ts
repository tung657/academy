import { UseFormInput } from '@mantine/form';

export const getRuleForms = (): UseFormInput<
	Record<string, unknown>,
	(values: Record<string, unknown>) => Record<string, unknown>
> => {
	return {
		validateInputOnChange: false,
		validateInputOnBlur: true,
	};
};
