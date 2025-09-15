import "./globals.css"
import Header from "./_components/Header"
import Footer from "./_components/Footer"
import { CartProvider } from "@/context/CartContext"

export const metadata = {
  title: "ModernMart",
  description: "Premium urban fashion store",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
