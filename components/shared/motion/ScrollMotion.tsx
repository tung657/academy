import React from 'react';
import { motion } from 'framer-motion';

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
	const getValue = (v?: boolean | number): number => {
		if (typeof v === 'number') return v;
		return v ? -50 : 0;
	};

	return (
		<motion.div
			initial={{ x: getValue(isX), y: getValue(isY), opacity: 0 }}
			whileInView={{ x: 0, y: 0, opacity: 1 }}
			transition={{ duration, delay }}
			viewport={{ once }}
		>
			{children}
		</motion.div>
	);
};
