"use client";
import { nanoid } from "nanoid";
import type { TGetUser, TGetUsers, TGetResponse } from "@/lib/api/users";
import useSwr from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/utils";

type Props = {};

const Page = ({}: Props) => {
  // TODO: how to check if it is an error
  const { data, error } = useSwr<TGetResponse>("/api/users", fetcher);
  const users = data?.users;
  const user = data?.user;

  if (user && users) {
    const friendsId = getFriendsId(user);
    const sentRequestsId = getSentRequestsId(user);
    const receivedRequestsId = getReceivedRequestsId(user);

    for (const otherUser of users) {
      if (friendsId.includes(otherUser.id)) {
        // something
        // TODO: show unfriend button
      } else if (sentRequestsId.includes(otherUser.id)) {
        // something
        // TODO: show cancel request button
      } else if (receivedRequestsId.includes(otherUser.id)) {
        // something
        // TODO: show accept request button
      } else {
        // something
        // TODO: show send request button
      }
    }
  } else {
    // something
  }

  return (
    <div>
      <h1>Users</h1>
      {users &&
        users.map((user) => (
          <div key={nanoid()}>
            <Link href={`/users/${user.id}`}>{user.profile.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default Page;

const getFriendsId = (user: TGetUser) => [
  ...user.friends.map((el) => el.id),
  ...user.friendsRelation.map((el) => el.id),
];
const getSentRequestsId = (user: TGetUser) =>
  user.sentRequests.map((el) => el.id);
const getReceivedRequestsId = (user: TGetUser) =>
  user.receivedRequests.map((el) => el.id);
