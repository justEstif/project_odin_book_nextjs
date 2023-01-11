interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen leading-7">
      <main className="flex flex-col flex-1 justify-center items-center">
        {children}
      </main>
      <footer className="flex justify-end p-5">footer</footer>
    </div>
  );
};

export default AuthLayout;
