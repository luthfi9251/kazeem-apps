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
        ],
    },
};

export default nextConfig;
