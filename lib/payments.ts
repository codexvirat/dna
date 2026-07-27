/**
 * Payment gateway abstraction. Currently mocked — always "succeeds" after a short
 * simulated delay. Swap in the real `razorpay` SDK + Checkout.js here once
 * RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are available; callers (checkout page,
 * /api/orders, /api/orders/[id]/confirm) don't need to change.
 */

export interface PaymentOrder {
  paymentOrderId: string;
  amountInPaise: number;
}

export async function createPaymentOrder(amountInPaise: number): Promise<PaymentOrder> {
  return {
    paymentOrderId: `mock_order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    amountInPaise,
  };
}

export interface PaymentVerification {
  success: boolean;
  paymentId: string;
}

export async function verifyPayment(_paymentOrderId: string): Promise<PaymentVerification> {
  return {
    success: true,
    paymentId: `mock_pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  };
}
