import "style/global.css";
import SessionProvider from "@/components/SessionProvider";
import { cx } from "class-variance-authority";
import { Quicksand } from "@next/font/google";

const quickSand = Quicksand({
  variable: "--font-quick",
  subsets: ["latin"],
});

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html lang="en" className={cx(`${quickSand.className}`)}>
      <head />
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
