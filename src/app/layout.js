import { Inter } from "next/font/google";
import ReactQueryProvider from "./ReactQueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Kazeem - Web App",
    description: "Kazeem, aplikasi pondok pesantren online",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
