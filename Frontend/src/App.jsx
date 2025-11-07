import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Products from './components/Products';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';

function AppContent() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogoClick = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '30px',
            padding: '16px 24px',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md text-gray-900 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLogoClick}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight hover:scale-105 transition-transform text-[#ff6b6b]"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
            >
              KART
            </button>
            
            <nav className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {user ? (
                <>
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline text-gray-600 font-medium">
                    Hey, <strong className="text-[#ff6b6b]">{user.name.split(' ')[0]}</strong>
                  </span>
                  <button
                    onClick={() => setShowCart(true)}
                    className="bg-[#ff6b6b] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full hover:shadow-lg transition-all font-semibold relative cursor-pointer text-sm sm:text-base"
                    style={{ boxShadow: '0 4px 14px rgba(255,107,107,0.25)' }}
                  >
                    <span className="mr-1">🛒</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#4ecdc4] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 px-2 sm:px-4 py-2 rounded-full hover:bg-gray-100 transition-all text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-[#ff6b6b] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full hover:shadow-lg transition-all font-semibold cursor-pointer text-sm sm:text-base"
                  style={{ boxShadow: '0 4px 14px rgba(255,107,107,0.25)' }}
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Products
          onAuthRequired={() => setShowAuth(true)}
          onCartUpdate={(count) => setCartCount(count)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-8 sm:py-10 mt-12 sm:mt-20 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#ff6b6b]" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              KART
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">Your Gen Z Fashion Destination</p>
            <p className="text-gray-400 text-xs">&copy; 2025 KART. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          onUpdate={(count) => setCartCount(count)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
