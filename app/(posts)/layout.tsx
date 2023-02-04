import NavBar from "@/components/nav-bar";

type TPostsLayout = {
  children: React.ReactNode;
};

const PostsLayout = ({ children }: TPostsLayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 bg-indigo-100">{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default PostsLayout;
