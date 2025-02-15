// type Config = {
//   [key: string]: string;
// };
const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || null,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || null,
  DATE_FORMAT: process.env.NEXT_PUBLIC_DATE_FORMAT || 'DD-MM-YYYY',
  SSO_LINK: process.env.NEXT_PUBLIC_SSO_LINK || null,
  LOGOUT_URL: process.env.NEXT_PUBLIC_SSO_LOGOUT_URL || null,
};

export default config;
