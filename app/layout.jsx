import "./globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ready Book",
  description: "Ready Book",
  keywords: "Ready Book",
};

const montserrat = Montserrat({
  weight: ["200", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${montserrat.variable} bg-floral-white text-dim-gray bg-[url('/noise.png')] bg-repeat bg-[length:75px_75px]`}
      >
        {children}
      </body>
    </html>
  );
}
