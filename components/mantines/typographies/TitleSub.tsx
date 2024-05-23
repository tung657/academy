import Image from 'next/image';

import { imgOthers } from '@/assets/images/others';

import classes from './scss/title-sub.module.scss';

interface Props {
	label: string;
}

export const TitleSub = ({ label }: Props): JSX.Element => {
	return (
		<span className={classes.title}>
			<Image
				alt="image"
				loading="lazy"
				width="32"
				height="34"
				decoding="async"
				data-nimg="1"
				src={imgOthers.starIcon}
				style={{ color: 'transparent' }}
			/>
			{label}
		</span>
	);
};
