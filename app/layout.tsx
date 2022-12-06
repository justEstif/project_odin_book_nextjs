import "./globals.css";
import SessionProvider from "./(components)/sessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head /> {/* nearest head el*/}
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
