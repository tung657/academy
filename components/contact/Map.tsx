export const Map = (): JSX.Element => {
	return (
		<>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.719256579702!2d105.80055287606746!3d21.04391638060922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba9b3f6f2ef%3A0xa6625bd2b260a9c5!2sAI%20Academy%20Vietnam!5e0!3m2!1sen!2s!4v1712548556428!5m2!1sen!2s"
				width="100%"
				height="450"
				style={{ border: '0' }}
				allowFullScreen={true}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			></iframe>
		</>
	);
};
