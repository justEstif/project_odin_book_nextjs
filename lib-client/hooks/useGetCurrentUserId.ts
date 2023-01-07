"use client";
import { useSession } from "next-auth/react";

const useCurrentUserId = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return session.user.id;
  } else {
    // TODO: logout user and redirect
    return "";
  }
};

export default useCurrentUserId;
