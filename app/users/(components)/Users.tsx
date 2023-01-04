"use client";
import useSWR from "swr";
import type { TGetResponse } from "@/api/users";
import { fetcher } from "@/lib-client/swr/fetcher";
import { nanoid } from "nanoid";
import User from "./User";

type Props = {};

const Users = ({ }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<TGetResponse>("/api/users", fetcher);

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof users === "undefined" || users === null) {
    return <div>Page has error</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <User key={nanoid()} userData={user} />
      ))}
    </div>
  );
};

export default Users;
