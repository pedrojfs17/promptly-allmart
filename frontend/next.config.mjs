/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: (process.env.BACKEND_URL || "http://localhost:3000") + '/:path*', // Proxy to Backend
            },
        ];
    },
}
  
export default nextConfig;
