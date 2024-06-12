import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import MobileMenu from "@/components/Navbar/MobileMenu/MobileMenu";

export const metadata = {
  title: "The Furious Garden",
  description:
    "Carnivorous and exotic plant supplier located in Brevard County, FL. Specialize in rare and exotic plants. A hub for enthusiasts to come together and share their knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <MobileMenu />
        {children}
      </body>
    </html>
  );
}
