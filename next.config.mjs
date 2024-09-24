/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: `**.${process.env.REMOTE_PATTERN_URL_SUFFIX}`,
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: `**.${process.env.REMOTE_PATTERN_URL_SUFFIX}`,
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
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/mail",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
