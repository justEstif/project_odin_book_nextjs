import "style/global.css";
import SessionProvider from "@/components/session-provider";
import { cx } from "class-variance-authority";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html
      lang="en"
      className={cx(
        `${quicksand.variable}`,
        "font-sans bg-secondary-50 text-secondary-900"
      )}
    >
      <head />
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
