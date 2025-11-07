import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { sendOrderConfirmationEmail } from '../utils/emailService';
import ReceiptModal from './ReceiptModal';

export default function CheckoutModal({ onClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const { data } = await API.post('/checkout', formData);
      
      const emailResult = await sendOrderConfirmationEmail(data.receipt);
      
      if (emailResult.success) {
        toast.success('🎉 Order placed! Check your email for confirmation');
      } else {
        toast.success('🎉 Order placed successfully!');
      }
      
      setReceipt(data.receipt);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Checkout failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return <ReceiptModal receipt={receipt} onClose={onClose} />;
  }

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-100 p-3 sm:p-4">
          <div className="bg-white rounded-4xl sm:rounded-[2.5rem] p-8 sm:p-12 text-center max-w-xs sm:max-w-sm w-full shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-[#ff6b6b] border-t-transparent mx-auto mb-4 sm:mb-6"></div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-[#ff6b6b]" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              Processing...
            </h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base">Confirming your order</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-60 p-3 sm:p-4" onClick={onClose}>
        <div className="bg-white rounded-4xl sm:rounded-[2.5rem] max-w-md w-full p-6 sm:p-10 shadow-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <h2 
            className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-[#ff6b6b]"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            Checkout
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all font-medium bg-gray-50 text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all font-medium bg-gray-50 text-sm sm:text-base"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-2.5 sm:py-3 rounded-3xl text-xs sm:text-sm font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff6b6b] text-white py-3 sm:py-4 rounded-full hover:shadow-lg disabled:bg-gray-400 disabled:hover:shadow-none font-bold text-base sm:text-lg transition-all mt-4 sm:mt-6 cursor-pointer"
              style={{ boxShadow: loading ? 'none' : '0 4px 14px rgba(255,107,107,0.4)' }}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
