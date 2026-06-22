import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Raditya Arjun | Fullstack Developer",
  description: "Portfolio website of Raditya Arjun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
