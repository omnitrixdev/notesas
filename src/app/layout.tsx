import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { Navbar } from "~/components/Navbar";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "NoteSaas",
  description:
    "NoteSaas is a note taking app that allows you to create, edit, and share notes.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await api.user.getColorScheme();
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${theme?.colorScheme ?? "theme-auto"} `}
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
