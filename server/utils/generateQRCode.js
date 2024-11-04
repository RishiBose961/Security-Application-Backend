import QRCode from 'qrcode';

export async function generateQRCode(data) {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Error generating QR Code:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}