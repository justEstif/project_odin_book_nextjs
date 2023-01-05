"use client";
import { fetcher } from "@/lib-client/swr/fetcher";
import { TGetResponse } from "@/api/users/[userId]";
import useSWR from "swr";
import Image from "next/image";
type Props = {
  userId: string;
};

const User = ({ userId }: Props) => {
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<TGetResponse>(`/api/users/${userId}`, fetcher);
  if (isLoading || error) {
    return <div>Page is loading</div>;
  } else {
    return (
      <div>
        <p>{user?.id}</p>
        <p>{user?.profile?.name}</p>
        <p>{user?.profile?.bio}</p>
        <p>{user?.profile?.image}</p>
        <p>{user?.relation}</p>
        <Image
          src={user?.profile?.image || ""}
          alt={user?.profile?.name || "Profile image"}
          width={200}
          height={200}
        />
      </div>
    );
  }
};

export default User;
