import { Edu_NSW_ACT_Foundation } from "@next/font/google";
import { cx } from "class-variance-authority";

const handFont = Edu_NSW_ACT_Foundation({ subsets: ["latin"] });

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className={cx(`${handFont.className}`)}>{children}</div>;
}
