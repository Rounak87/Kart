import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Products({ onAuthRequired, onCartUpdate, currentPage, setCurrentPage }) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const productsPerPage = 8;

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products?page=${page}&limit=${productsPerPage}`);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load products');
      toast.error('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const { data } = await API.get('/cart');
      onCartUpdate(data.count);
    } catch {
      onCartUpdate(0);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      return onAuthRequired();
    }

    try {
      await API.post('/cart', { productId, qty: 1 });
      fetchCartCount();
      toast.success('Added to cart! 🔥', {
        icon: '🛒',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#ff6b6b] border-t-transparent mx-auto"></div>
          <p className="text-xl font-semibold text-gray-600">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-13">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-3">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#ff6b6b]"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            New Drops
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium">
            Fresh styles that speak your language
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white rounded-4xl sm:rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-square bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <h3 className="font-bold text-lg sm:text-xl leading-snug text-gray-900">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center pt-2 sm:pt-3">
                  <span className="text-xl sm:text-2xl font-bold text-[#ff6b6b]">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-[#ff6b6b] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:shadow-lg transition-all font-semibold text-xs sm:text-sm cursor-pointer"
                    style={{ boxShadow: '0 4px 14px rgba(255,107,107,0.25)' }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-12 md:mt-16">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-[#ff6b6b] disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-all cursor-pointer text-sm sm:text-base"
            >
              Previous
            </button>
            
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[...Array(pagination.totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold transition-all shrink-0 ${
                    currentPage === idx + 1
                      ? 'bg-[#ff6b6b] text-white shadow-lg scale-110'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNext}
              className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-[#ff6b6b] disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-all cursor-pointer text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
