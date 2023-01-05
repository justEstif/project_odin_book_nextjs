import "style/global.css";
import SessionProvider from "./(components)/SessionProvider";
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
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <header className="bg-red-50">Header</header>
            <div className="flex flex-col flex-1 sm:flex-row">
              <main className="flex-1 bg-indigo-100">{children}</main>
              <nav className="order-first bg-purple-200 sm:w-32">Sidebar</nav>
              <aside className="bg-yellow-100 sm:w-32">Right Sidebar</aside>
            </div>
            <footer className="bg-gray-100">Footer</footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
