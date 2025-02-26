// app/lib/paymentStore.ts
import { PaymentWebhookPayload } from '@/types/hesabpay';

// In-memory store (replace with a database in production)
const paymentStore: PaymentWebhookPayload[] = [];

export { paymentStore };