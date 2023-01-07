type TPostsLayout = {
  children: React.ReactNode;
};

const PostsLayout = ({ children }: TPostsLayout) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>Header</header>

      <div className="flex flex-col flex-1 sm:flex-row">
        <nav className="bg-purple-200 sm:w-32">Sidebar</nav>
        <main className="flex-1 bg-indigo-100">{children}</main>
        <aside className="hidden bg-yellow-100 sm:block sm:w-32">
          Right Sidebar
        </aside>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default PostsLayout;
