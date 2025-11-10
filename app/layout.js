import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Mock Interview - Ace Your Next Interview",
  description: "Practice with AI-powered mock interviews and get personalized feedback to land your dream job",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20">
              {children}
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                classNames: {
                  toast: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100',
                  description: 'text-gray-600 dark:text-gray-400',
                  actionButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                  cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white',
                  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
                  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
                  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
                  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}