import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Raditya Arjun",
  description: "Raditya Arjun's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
