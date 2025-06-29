import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import {IdleTimerProvider} from "@/components/auth/IdleTimeProvider";
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>

        <ThemeProvider>
          <IdleTimerProvider>
          <SidebarProvider>{children}</SidebarProvider>
          </IdleTimerProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
