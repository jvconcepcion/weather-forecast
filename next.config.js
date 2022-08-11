/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    API_KEY: "5354b1044c74bfa5f0866f3a3f0a06b7"
  },
}

module.exports = nextConfig
