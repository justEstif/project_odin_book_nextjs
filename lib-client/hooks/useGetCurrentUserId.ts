import { useSession } from "next-auth/react";

const useCurrentUserId = () => {
  const { data: session } = useSession();
  return session?.user.id || "";
};

export default useCurrentUserId
