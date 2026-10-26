import { useState } from 'react';
import { products } from '../data/products';

const categories = [...new Set(products.map((p) => p.category))];

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export default function ProductDashboard() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');

    const filteredProducts = products.filter((product) => {
        const term = query.toLowerCase();
        const matchesQuery =
            product.name.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term);
        const matchesCategory = category === '' || product.category === category;
        return matchesQuery && matchesCategory;
    });

    const hasFilters = query !== '' || category !== '';

    const resetFilters = () => {
        setQuery('');
        setCategory('');
    };

    return (
        <div className="app">
            <header className="topbar">
                <div className="topbar-inner">
                    <div className="logo">
                        <span className="logo-mark">V</span>
                        Voltix
                    </div>
                    <span className="topbar-tag">Consumer Electronics</span>
                </div>
            </header>

            <main className="container">
                <section className="page-head">
                    <h1>Products</h1>
                    <p>Browse our catalog of audio, computing, mobile and wearable devices.</p>
                </section>

                <section className="toolbar" aria-label="Product filters">
                    <div className="search">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search by name or brand"
                            aria-label="Search products"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <select
                        aria-label="Filter by category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {hasFilters && (
                        <button type="button" className="btn-reset" onClick={resetFilters}>
                            Reset
                        </button>
                    )}
                </section>

                <p className="results-count">
                    Showing <strong>{filteredProducts.length}</strong> of {products.length} products
                </p>

                {filteredProducts.length > 0 ? (
                    <ul className="grid">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="card">
                                <div className="card-media" data-category={product.category}>
                                    <span>{product.brand.slice(0, 2).toUpperCase()}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card-meta">
                                        <span className="badge">{product.category}</span>
                                        <span className="rating">★ {product.rating.toFixed(1)}</span>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p className="brand">{product.brand}</p>
                                    <p className="price">{currency.format(product.price)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">
                        <h2>No products found</h2>
                        <p>Try adjusting your search or clearing the filters.</p>
                        <button type="button" className="btn-reset" onClick={resetFilters}>
                            Clear filters
                        </button>
                    </div>
                )}
            </main>

            <footer className="footer">© 2026 Voltix. All rights reserved.</footer>
        </div>
    );
}
