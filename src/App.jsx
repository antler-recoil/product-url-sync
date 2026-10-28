import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductDashboard from './components/ProductDashboard';
import ProductDetail from './components/ProductDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductDashboard />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
