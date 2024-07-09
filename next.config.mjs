/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9999/api',
  },

  // dev environment
  // env: {
  //   API_URL: 'https://api.vk169.net/api',

  // },

  // Production environment
  // env: {
  //   API_URL: 'https://api.ku3933d.net/api',

  // },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;
