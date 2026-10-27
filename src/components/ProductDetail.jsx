import { Link, useLocation, useParams } from 'react-router-dom';

import { products } from '../data/products';

export default function ProductDetail() {
    const { id } = useParams();
    const { search } = useLocation();
    const product = products.find((p) => p.id === Number(id));
    const back = { pathname: '/products', search };
    
    if (!product) {
        return (
            <div className="detail">
                <h1>Product Not Found</h1>
                <Link to={back}>Back to results</Link>
            </div>
        );
    }

    return (
        <div className="details">
            <Link to={back}>Back to results</Link>
            <h1>{product.name}</h1>
            <p>{product.brand} || {product.category} || {product.rating}</p>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
        </div>
    );
}
