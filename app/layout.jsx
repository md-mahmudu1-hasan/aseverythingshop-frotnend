import "./globals.css";
import "@/components/SecondaryNavbar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Providers from "./providers";
import { Plus_Jakarta_Sans, Noto_Sans_Bengali } from "next/font/google";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata = {
  title: "AS Wear",
  description: "AS Everything Shop clothing store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${bengali.variable}`}>
      <body className={sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
