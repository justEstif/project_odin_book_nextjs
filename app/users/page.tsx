"use client";
import useSwr from "swr";
type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type User = {
  id: number;
  name?: string;
};

const Page = ({}: Props) => {
  const { data, error } = useSwr<User[]>("/api/users", fetcher);
  console.log(data)
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Page;
