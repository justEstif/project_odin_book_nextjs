"use client";
import useSWR from "swr";
import type { TGetResponse } from "@/api/users";
import { fetcher } from "@/lib-client/swr/fetcher";
import { nanoid } from "nanoid";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import UserButton from "./UserButton";

type Props = {};

const Users = ({}: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<TGetResponse>("/api/users", fetcher );

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof users === "undefined" || users === null) {
    return <div>Page has error</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={nanoid()}
          className="grid grid-cols-1 gap-2 justify-items-center items-center py-4 px-1 border-2 border-dashed"
        >
          <Avatar.Root className="overflow-hidden relative p-2">
            <Avatar.Image
              src={user?.profile?.image || ""}
              alt={user?.profile?.name || "Profile image"}
              className="object-cover"
            />
            <Avatar.Fallback delayMs={600}>
              {user?.profile?.name || "Profile image"}
            </Avatar.Fallback>
          </Avatar.Root>
          <Link href={`/users/${user.id}`}>{user.profile.name}</Link>
          <UserButton relation={user.relation} id={user.id} />
        </div>
      ))}
    </div>
  );
};

export default Users;
