import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "./globals.css";

import { Roboto } from "next/font/google";
import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import Footer from "./components/Footer";
import Header from "./components/Header";

const siteName = "ENDROIT.NET";
const title = "Astrapi - Network File System";
const description = "Welcome to Astrapi Network File System for ENDROIT.NET";
const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    site: "@ARGI_BERRI",
    creator: "@ARGI_BERRI",
  },
};

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={roboto.className}>
        <MantineProvider>
          <Container size={"xs"}>
            <main>
              <Header />
              {children}
              <Footer />
            </main>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
