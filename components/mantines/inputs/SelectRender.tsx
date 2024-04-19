import { Select, SelectProps } from '@mantine/core';
import classes from './scss/select.module.scss';

interface Props extends SelectProps {}

export const SelectRender = ({ ...props }: Props): JSX.Element => {
	return <Select classNames={classes} {...props} />;
};
