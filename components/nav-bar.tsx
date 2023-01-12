"use client";
import SignOutBtn from "@/components/signout-btn";
type Props = {};

const NavBar = ({ }: Props) => {
  return (
    <header>
      <SignOutBtn />
    </header>
  );
};

export default NavBar;
