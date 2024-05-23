import { Title, TitleProps } from '@mantine/core';

import classes from './scss/title.module.scss';

export const TitleRender = ({ ...props }: TitleProps): JSX.Element => {
	return <Title className={classes.title} {...props}></Title>;
};
