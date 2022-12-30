"use client";
import useSWR from "swr";
import type { TGetResponse } from "@/api/users";
import { fetcher } from "@/lib-client/swr/fetcher";
import { nanoid } from "nanoid";
import Image from "next/image";

type Props = {};

const Users = ({}: Props) => {
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
console.log(users)
  return (
    <div>
      <div>
        <h3>Friends</h3>
        {users.friends.map((friend) => (
          <div key={nanoid()}>{friend.profile.name}</div>
        ))}
      </div>
      <div>
        <h3>Sent Requests</h3>
        {users.sentRequests.map((request) => (
          <div key={nanoid()}>
            <p>{request.profile.name}</p>
            <Image
              src={request.profile.image}
              width={100}
              height={100}
              alt={request.profile.name}
            />
          </div>
        ))}
      </div>
      <div>
        <h3>Received Requests</h3>
        {users.receivedRequests.map((request) => (
          <div key={nanoid()}>{request.profile.name}</div>
        ))}
      </div>
      <div>
        <h3>Others</h3>
        {users.others.map((other) => (
          <div key={nanoid()}>{other.profile.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Users;
