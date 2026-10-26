import { BrowserRouter } from 'react-router-dom';
import ProductDashboard from './components/ProductDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <ProductDashboard />
    </BrowserRouter>
  );
}
