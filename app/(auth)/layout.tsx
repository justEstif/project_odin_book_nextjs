import styles from "./layout.module.css";
type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div className={styles.div}>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Demo</footer>
    </div>
  );
};

export default Layout;
