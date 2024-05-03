import { Loader, Select, SelectProps } from '@mantine/core';
import classes from './scss/select.module.scss';

interface Props extends SelectProps {
	loading?: boolean;
}

export const SelectRender = ({ loading, ...props }: Props): JSX.Element => {
	return (
		<Select
			classNames={classes}
			rightSection={loading ? <Loader size={'sm'} /> : null}
			disabled={loading ? true : false}
			{...props}
		/>
	);
};
