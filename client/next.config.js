/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
}
