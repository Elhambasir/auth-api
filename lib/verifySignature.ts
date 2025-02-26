// app/lib/verifySignature.ts
import { SignatureVerificationResponse } from '@/types/hesabpay';

export async function verifySignature(
  signature: string,
  timestamp: string
): Promise<boolean> {
  const url = 'https://api-sandbox.hesab.com/api/v1/hesab/webhooks/verify-signature';
  const apiKey = 'ZTUyNTg4MTYtNDU2MS00MmIzLTg0NzQtYzlmNGM4ODA0N2MzX181MjcwYjc1YjA4MzkwZjFiMmJlYg==';

  const headers: HeadersInit = {
    'Authorization': `HesabPay ${apiKey}`, // Changed to "HesabPay" as per HesabPay docs
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    signature,
    timestamp,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Signature verification failed with status: ${response.status}`);
    }

    const data = await response.json() as SignatureVerificationResponse;
    
    // Check if the request was successful
    return response.status === 200 && data.success === true;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false; // Return false on error, mimicking Python's error handling
  }
}