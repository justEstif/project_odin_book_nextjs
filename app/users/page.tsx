"use client";
import { nanoid } from "nanoid";
import type { TGetRes } from "@/api/users";

import useSwr from "swr";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = ({}: Props) => {
  const { data, error } = useSwr<TGetRes[]>("/api/users", fetcher);
  return (
    <div>
      <h1>Users</h1>
      {data && data.map((d) => <p key={nanoid()}>{d.profile.name}</p>)}
    </div>
  );
};

export default Page;
