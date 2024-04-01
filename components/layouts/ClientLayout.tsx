import { Footer } from '..';
import Header from '../shared/Header';

interface Props {
	children: React.ReactNode;
}

export default function ClientLayout({ children }: Props): JSX.Element {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
