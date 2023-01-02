import { useSession } from "next-auth/react";

const useGetCurrentUserId = () => {
  const { data: session } = useSession();
  return session?.user.id || "";
};

export default useGetCurrentUserId
