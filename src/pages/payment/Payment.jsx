import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLayout from '../user/UserLayout'; 
import api from '../../api';
import OrderSummary from '../../components/payment/OrderSummary';
import OrderPayment from '../../components/payment/OrderPayment';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // ডাটা রিসিভ করা (state থেকে)
    const { itemId, itemName, amount, buyType } = location.state || {};
    
    const [paymentStatus, setPaymentStatus] = useState(null); 
    const [paymentMethod, setPaymentMethod] = useState('paypal'); 
    const [loading, setLoading] = useState(false);

    // SAR থেকে USD কনভারশন
    const amountInUSD = amount ? (amount / 3.75).toFixed(2) : "0.00"; 

    // পেমেন্ট সাকসেস হ্যান্ডলার
    const handlePayPalSuccess = async (details) => {
        setLoading(true);
        try {
            const response = await api.post('/payments/verify', {
                transaction_id: details.id,
                item_id: itemId,
                item_type: buyType,
                amount: amount,
                currency: 'SAR',
                payment_method: 'PayPal',
                payer_email: details.payer.email_address,
                status: 'completed'
            });

            if (response.status === 200 || response.status === 201) {
                setPaymentStatus('success');
                setTimeout(() => navigate('/user/dashboard'), 3500);
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };

    // অফিস/ম্যানুয়াল পেমেন্ট হ্যান্ডলার
    const handleOfficePayment = async () => {
        setLoading(true);
        
        // আপনার লোকাল স্টোরেজ বা স্টেট থেকে ইউজার আইডি নিন
        const userData = JSON.parse(localStorage.getItem('user')); // যদি 'user' নামে সেভ থাকে
        const userId = userData?.id; 

        try {
            const response = await api.post('/paymentsOfficeRequest', {
                user_id: userId, 
                item_id: itemId,
                item_type: buyType,
                amount: amount,
                payment_method: 'Office/ATM',
                status: 'pending'
            });

            if (response.status === 200 || response.status === 201) {
                setPaymentStatus('pending_office');
            }
        } catch (error) {
            console.error("Office request error:", error);
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };
    // যদি সরাসরি লিঙ্কে ঢুকে পড়ে বা ডাটা না থাকে
    if (!itemId) {
        return (
            <UserLayout>
                <div className="text-center py-24">
                    <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="text-red-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">No item selected for payment.</h2>
                    <p className="text-slate-500 mt-2">Please select a course or test to proceed.</p>
                    <button onClick={() => navigate(-1)} className="mt-8 inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-full font-bold">
                        <ArrowLeft size={18} className="mr-2"/> Go Back
                    </button>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    <div className="lg:col-span-1">
                        <OrderSummary 
                            buyType={buyType} 
                            itemName={itemName} 
                            amount={amount} 
                            amountInUSD={amountInUSD} 
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <OrderPayment 
                            paymentStatus={paymentStatus}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            loading={loading}
                            amountInUSD={amountInUSD}
                            itemId={itemId}
                            itemName={itemName}
                            buyType={buyType}
                            navigate={navigate}
                            handlePayPalSuccess={handlePayPalSuccess}
                            handleOfficePayment={handleOfficePayment}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Payment;