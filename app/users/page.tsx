"use client";
import { nanoid } from "nanoid";
import useSwr from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/utils";
import type { TGet } from "@/lib/api/users";

type Props = {};

const Page = ({}: Props) => {
  // TODO: how to check if it is an error
  const { data, error, isLoading } = useSwr<TGet>("/api/users", fetcher);

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof data === "undefined") {
    return <div>Page has error</div>;
  }

  const users = data.users;
  const { friendsId, sentRequestsId, receivedRequestsId } = data.ids;

  if (friendsId && sentRequestsId && receivedRequestsId) {
    for (const user of data.users) {
      if (friendsId.includes(user.id)) {
        // something
      } else if (receivedRequestsId.includes(user.id)) {
        // something
      } else if (sentRequestsId.includes(user.id)) {
        // something
      }
      // if (user.id)
    }
  }
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Page;
