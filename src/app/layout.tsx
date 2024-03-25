
import Providers from "./Providers";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className="w-screen h-[90vh]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
