"use client";
import PostForm from "./(components)/PostForm";
import useSwr from "swr";
import { TResponse } from "@/api/posts";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Page = ({}: Props) => {
  const { data, error, isLoading } = useSwr<TResponse>("/api/posts", fetcher);

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof data === "undefined" || data === null) {
    return <div>Page has error</div>;
  }

  return (
    <div>
      <div>Create post</div>
      <PostForm />
    </div>
  );
};

export default Page;
