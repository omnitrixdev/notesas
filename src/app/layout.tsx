import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { Navbar } from "~/components/Navbar";

export const metadata: Metadata = {
  title: "NoteSaas",
  description:
    "NoteSaas is a note taking app that allows you to create, edit, and share notes.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer />
            <Navbar />
            <section className="container mx-auto">{children}</section>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
