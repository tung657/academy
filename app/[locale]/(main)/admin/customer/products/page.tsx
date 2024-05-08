import { Product } from '@/components/admin/product/Product';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm',
};

export default async function ProductPage() {
	return (
		<>
			<Product />
		</>
	);
}
