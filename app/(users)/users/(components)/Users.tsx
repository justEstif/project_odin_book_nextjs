"use client";
import useSWR from "swr";
import type { TGetResponse } from "@/api/users";
import { fetcher } from "@/lib-client/swr/fetcher";
import { nanoid } from "nanoid";
import Link from "next/link";
import UserButton from "./UserButton";
import Image from "next/image";

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <div
          key={nanoid()}
          className="flex flex-col max-w-sm bg-white rounded-lg shadow"
        >
          <div className="overflow-hidden relative w-full h-56">
            <Image
              src={user?.profile?.image || ""}
              alt={user?.profile?.name || "Profile image"}
              className="object-cover w-full h-56"
              fill={true}
            />
          </div>

          <div className="flex-1 py-4 px-6">
            <Link className="mb-2 text-xl font-bold" href={`/users/${user.id}`}>
              {user.profile.name}
            </Link>

            <p className="text-base text-gray-700">{user.profile?.bio}</p>
          </div>

          <div className="flex gap-4 py-4 px-6 bg-gray-100">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none"
            >
              Action
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg border border-transparent hover:bg-red-700 focus:outline-none"
            >
              Action
            </button>
            <UserButton relation={user.relation} id={user.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
