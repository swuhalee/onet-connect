const rawBaseUrl = import.meta.env.VITE_APP_URL ?? 'https://onet-connect.com';
const BASE_URL = rawBaseUrl.replace(/\/+$/, '');
export const OG_IMAGE_URL = `${BASE_URL}/og-image.png`;
