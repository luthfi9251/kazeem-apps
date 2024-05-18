/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "awsimages.detik.net.id",
                port: "",
                pathname: "/community/media/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/api/**",
            },
        ],
    },
};

export default nextConfig;
