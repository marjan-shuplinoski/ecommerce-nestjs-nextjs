import ProductDetail from '../../../features/products/components/ProductDetail'

export default function ProductPage({ params }: { params: { id: string } }) {
    return <ProductDetail productId={params.id} />;
}
