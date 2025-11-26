"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import AuthHeader from "@/components/organisms/header/AuthHeader";
import Header from "@/components/organisms/header/Header";
import Footer from "@/components/organisms/footer/Footer";
import CookieModal from "@/components/organisms/cookie-modal/cookieModal";

import "./globals.css";

const theme = createTheme({
  typography: {
    fontFamily: `"Sky Text", sans-serif`,
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: `""Sky Text", sans-serif`,
        },
        input: {
          fontFamily: `""Sky Text", sans-serif`,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `""Sky Text", sans-serif`,
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define pages that use the Auth header
  const authRoutes = ["/login", "/signup", "/enter-password", "/verify-email", "/update-email"];

  // Choose which header to render
  const isAuthPage = authRoutes.some(route => pathname.startsWith(route));
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" type="image/ico" href="https://id.sky.com/favicon.ico"></link>
      <body className={`antialiased`}>
        {isAuthPage ? <AuthHeader /> : <Header />}
        <main>
          {/* Main content goes here */}
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </main>
        <Footer />
        <CookieModal />
      </body>
    </html>
  );
}
