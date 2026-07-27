import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, Building2, CheckCircle2, Wallet, CalendarClock } from 'lucide-react';

import api from '../../api';

const OrderPayment = ({ 
  paymentStatus, 
  paymentMethod, 
  setPaymentMethod, 
  loading, 
  handlePayPalSuccess, 
  handleOfficePayment, 
  amountInUSD, 
  itemId, 
  itemName, 
  buyType,
  navigate 
}) => {

  const paymentOptions = [
    { id: 'paypal', label: 'Debit / Credit Card', icon: <CreditCard size={20}/> },
    { id: 'office', label: 'Office / ATM', icon: <Building2 size={20}/> },
    { id: 'tabby', label: 'Installment', icon: <CalendarClock size={20}/> },
    
  ];

  return (
    <div className="bg-white p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/20 min-h-[550px] flex flex-col">
      
      {paymentStatus === 'success' ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900">Payment Successful!</h3>
          <p className="text-slate-500 mt-3 font-medium">Redirecting you to dashboard...</p>
        </div>
      ) : paymentStatus === 'pending_office' ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Building2 size={40} />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900">Request Received!</h3>
          <p className="text-slate-500 mt-4 px-6 md:px-10 leading-relaxed font-medium">
            Please visit our office or complete the ATM transfer to activate your <b>{buyType}</b> Or Waiting For Review.
          </p>
          <button 
            onClick={() => navigate('/user/dashboard')} 
            className="mt-10 cursor-pointer  bg-slate-900 text-white w-full md:w-auto px-10 py-4 rounded-2xl font-black transition-transform active:scale-95 shadow-lg shadow-slate-200"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Secure Checkout</h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">Select your preferred payment method</p>
          </div>

          {/* Payment Method Selector - Optimized for all devices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-[1.5rem] md:rounded-[2rem] mb-10">
            {paymentOptions.map((option) => (
              <button 
                key={option.id}
                onClick={() => setPaymentMethod(option.id)}
                className={`flex cursor-pointer items-center justify-center gap-3 py-3.5 md:py-4 px-4 rounded-[1.2rem] md:rounded-[1.5rem] font-black text-sm transition-all duration-300 ${
                  paymentMethod === option.id 
                  ? 'bg-white text-indigo-600 shadow-md scale-[1.02]' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow flex flex-col justify-center">
            {/* {paymentMethod === 'paypal' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 text-center">
                  <p className="text-slate-500 text-sm font-medium">Pay securely via Credit Card or PayPal</p>
                </div>
                <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID", currency: "USD" }}>
                  <PayPalButtons
                    style={{ layout: "vertical", shape: "pill", color: "blue", height: 50 }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          custom_id: itemId.toString(),
                          description: `${buyType}: ${itemName}`,
                          amount: { currency_code: "USD", value: amountInUSD }
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      handlePayPalSuccess(details);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )} */}

            {paymentMethod === 'tabby' && (
              <div className="text-center p-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-indigo-50/30 animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Wallet size={32} />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">Installment Plans</h4>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                  Buy now and pay later in 4 interest-free installments with Tabby or Tamara.
                </p>
                <button 
                  className="w-full cursor-pointer bg-slate-900 text-white py-4 rounded-2xl font-black text-lg transition-all hover:bg-slate-800"
                  onClick={() => alert('Tabby/Tamara integration coming soon for your region.')}
                >
                  Pay with Installments
                </button>
              </div>
            )}

            {paymentMethod === 'office' && (
  <div className="text-center p-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50 animate-in slide-in-from-bottom-4 duration-500">
    <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
      <Building2 size={32} />
    </div>
    <p className="text-slate-600 mb-8 font-bold text-sm md:text-base px-4">
      Confirm your request and visit our office to pay in cash or via ATM transfer.
    </p>
    
    <button 
      disabled={loading}
      onClick={() => handleOfficePayment()} // 
      className={`w-full cursor-pointer py-4 rounded-2xl font-black text-lg transition-all shadow-lg 
        ${loading 
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 active:scale-[0.98]'
        }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        "Confirm Office Request"
      )}
    </button>
  </div>
)}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Secure 256-bit SSL Encrypted Connection</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPayment;