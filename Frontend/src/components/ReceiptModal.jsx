export default function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-70 p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-4xl sm:rounded-[2.5rem] max-w-md w-full p-6 sm:p-10 shadow-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4ecdc4] rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-bold mb-2 text-[#ff6b6b]"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
          >
            Order Confirmed!
          </h2>
          <p className="text-gray-600 font-medium text-base sm:text-lg">Thanks for shopping with KART</p>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-3xl mb-4 sm:mb-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-4 sm:mb-6">
            <div className="text-gray-500 font-semibold">Order ID:</div>
            <div className="font-mono text-xs font-bold text-gray-900 break-all">{receipt.id}</div>
            
            <div className="text-gray-500 font-semibold">Date:</div>
            <div className="font-bold text-gray-900">{new Date(receipt.timestamp).toLocaleDateString()}</div>
            
            <div className="text-gray-500 font-semibold">Time:</div>
            <div className="font-bold text-gray-900">{new Date(receipt.timestamp).toLocaleTimeString()}</div>
          </div>

          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <h3 className="font-bold mb-2 sm:mb-3 text-base sm:text-lg text-gray-900">Items:</h3>
            <div className="space-y-2">
              {receipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs sm:text-sm bg-white p-2.5 sm:p-3 rounded-2xl">
                  <span className="font-semibold text-gray-900">{item.name} × {item.qty}</span>
                  <span className="font-bold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between items-center">
            <span className="text-lg sm:text-xl font-bold text-gray-900">Total:</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#ff6b6b]">₹{receipt.total}</span>
          </div>
        </div>

        <div className="bg-[#4ecdc4]/10 p-3 sm:p-4 rounded-3xl mb-4 sm:mb-6 border border-[#4ecdc4]/20">
          <p className="text-xs sm:text-sm text-gray-700 font-medium text-center">
            Confirmation sent to <strong className="font-bold text-gray-900">{receipt.email}</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#ff6b6b] text-white py-3 sm:py-4 rounded-full hover:shadow-lg font-bold text-base sm:text-lg transition-all cursor-pointer"
          style={{ boxShadow: '0 4px 14px rgba(255,107,107,0.4)' }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
