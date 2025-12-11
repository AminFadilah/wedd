import { Inter } from "next/font/google";
import "./globals.css";
import ClientToaster from "./ClientToaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Evan & Dzihni",
  description: "Wedding Invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}

        {/* Toaster dipisah sebagai client component */}
        <ClientToaster />
      </body>
    </html>
  );
}
