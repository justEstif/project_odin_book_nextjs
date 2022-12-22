type Props = {
  params: {
    postId: string;
  };
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <section>{children}</section>;
};

export default Layout;
