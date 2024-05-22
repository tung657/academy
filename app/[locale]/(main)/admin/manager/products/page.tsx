import { Metadata } from 'next';

import { Product } from '@/components/admin/product/Product';

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
