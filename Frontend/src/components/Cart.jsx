import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import CheckoutModal from './CheckoutModal';

export default function Cart({ onClose, onUpdate }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await API.get('/cart');
      setItems(data.items);
      setTotal(data.total);
      onUpdate(data.count);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      toast.success('Item removed from cart');
      fetchCart();
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQty = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await API.patch(`/cart/${id}`, { qty: newQty });
      fetchCart();
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <p className="text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4" onClick={onClose}>
        <div className="bg-white rounded-4xl sm:rounded-[2.5rem] max-w-2xl w-full max-h-[95vh] sm:max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white p-4 sm:p-6 flex justify-between items-center border-b border-gray-100">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ff6b6b]"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
            >
              Your Cart
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-2xl sm:text-3xl font-light transition-all cursor-pointer">&times;</button>
          </div>

          {items.length === 0 ? (
            <div className="p-8 sm:p-16 text-center">
              <div className="text-5xl sm:text-6xl mb-4 opacity-40">🛍️</div>
              <p className="text-lg sm:text-xl font-bold text-gray-400">Cart is empty</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Start adding some items!</p>
            </div>
          ) : (
            <>
              <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(85vh-220px)]">
                {items.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row gap-3 sm:gap-5 bg-gray-50 p-3 sm:p-5 rounded-3xl sm:rounded-4xl hover:bg-gray-100 transition-all">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-base sm:text-lg text-gray-900">{item.product.name}</h4>
                      <p className="text-[#ff6b6b] font-bold text-base sm:text-lg mt-1">₹{item.product.price}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => handleUpdateQty(item._id, item.qty - 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white font-bold text-base sm:text-lg transition-all cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 sm:w-10 text-center font-bold text-base sm:text-lg">{item.qty}</span>
                        <button
                          onClick={() => handleUpdateQty(item._id, item.qty + 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white font-bold text-base sm:text-lg transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-all text-lg sm:text-xl cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white p-4 sm:p-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                  <span className="text-lg sm:text-xl font-bold text-gray-700">Total</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#ff6b6b]">₹{total}</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-[#ff6b6b] text-white py-3 sm:py-4 rounded-full hover:shadow-lg transition-all font-bold text-base sm:text-lg cursor-pointer"
                  style={{ boxShadow: '0 4px 14px rgba(255,107,107,0.4)' }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          onClose={() => {
            setShowCheckout(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
