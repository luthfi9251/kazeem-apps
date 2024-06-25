/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "kazeem.cloud",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "kazeem.cloud",
                port: "",
                pathname: "/**",
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
