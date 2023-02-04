type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <footer className="flex justify-end p-5">Demo</footer>
    </div>
  );
};

export default Layout;
