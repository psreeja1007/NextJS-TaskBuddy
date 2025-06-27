import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext"; // 👈 Add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Buddy",
  description:
    "Task Buddy is your place to manage your tasks, sort and edit them however you want and it helps you manage your stuff easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider> {/* 👈 wrap app in ThemeProvider */}
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
