import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success(`Welcome back!`);
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success(`Welcome, ${formData.name}!`);
      }
      onClose();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-4xl sm:rounded-[2.5rem] max-w-md w-full p-6 sm:p-10 shadow-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 
            className="text-2xl sm:text-3xl font-bold text-[#ff6b6b]"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            {isLogin ? 'Welcome Back' : 'Join KART'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 text-2xl sm:text-3xl font-light transition-colors cursor-pointer">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all font-medium bg-gray-50 text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>
          )}

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

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-200 rounded-3xl focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all font-medium bg-gray-50 text-sm sm:text-base"
              placeholder="Min 6 characters"
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
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 font-medium">
          {isLogin ? "New here? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#ff6b6b] hover:text-[#4ecdc4] font-bold transition-colors cursor-pointer"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
