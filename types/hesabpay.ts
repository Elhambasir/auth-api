// types/hesabpay.ts
export interface WebhookItem {
    id: string | number;
    name: string;
    price: number;
  }
  
  export interface PaymentWebhookPayload {
    status_code: number;
    success: boolean;
    message: string;
    sender_account: string;
    transaction_id: string;
    amount: number;
    memo: string;
    signature: string;
    timestamp: string;
    transaction_date: string;
    items: WebhookItem[];
    email: string;
  }
  
  export interface SignatureVerificationResponse {
    status_code: number;
    success: boolean;
    message: string;
  }