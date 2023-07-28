import "./globals.css";
import "./chrome-bug.css";
// import 'nprogress.css'
import styles from "./layout.module.css";
import cn from "classnames";
import { Inter } from "next/font/google";
import Providers from "../redux/provider";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ className, children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="antialiased max-w-4xl min-h-screen flex flex-col mx-4 lg:mx-auto">
            <div className={cn(styles.full, className)}>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "var(--accents-7)",
                    color: "var(--accents-1)",
                  },
                }}
              />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
