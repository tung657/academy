import React from 'react';
import { Variants, motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import { VALUE_MOBILE } from '@/utils/config';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	isX?: boolean | number;
	isY?: boolean | number;
	once?: boolean;
	delay?: number;
	duration?: number;
}

export const ScrollMotion = ({
	children,
	isX,
	isY,
	once = false,
	delay = 0,
	duration = 0.5,
}: Props): JSX.Element => {
	const isMobile = useMediaQuery(VALUE_MOBILE);

	const getValue = (v?: boolean | number): number => {
		if (typeof v === 'number') return isY ? v : isX && isMobile ? 16 : v;
		return v ? (isMobile ? -16 : -50) : 0;
	};

	const variant: Variants = {
		visible: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: { duration, delay },
		},
		hidden: { x: getValue(isX), y: getValue(isY), opacity: 0 },
	};

	return (
		<motion.div
			// initial={{ x: getValue(isX), y: getValue(isY), opacity: 0 }}
			// whileInView={{ x: 0, y: 0, opacity: 1 }}
			// transition={{ duration, delay }}
			variants={variant}
			initial="hidden"
			whileInView="visible"
			viewport={{ once }}
		>
			{children}
		</motion.div>
	);
};
