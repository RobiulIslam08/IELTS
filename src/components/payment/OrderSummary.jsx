import React from 'react';

const OrderSummary = ({ buyType, itemName, amount, amountInUSD }) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50">
      <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
        <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
        Order Summary
      </h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">
            {buyType} Details
          </span>
          <h3 className="text-slate-900 font-bold leading-tight mt-1">{itemName}</h3>
        </div>

        <div className="flex justify-between items-center px-2">
          <span className="text-slate-500 font-bold">Subtotal</span>
          <span className="text-slate-900 font-black">{amount} SAR</span>
        </div>

        <div className="pt-6 border-t border-dashed border-slate-200">
          <span className="text-slate-400 text-xs font-bold uppercase">Total Payable (Approx USD)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black text-indigo-600">${amountInUSD}</span>
            <span className="text-slate-400 text-sm font-bold">USD</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">
            * Conversion rate: 1 USD ≈ 3.75 SAR. Exact amount depends on your bank.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;