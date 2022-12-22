"use client";
import type { TGetResponse } from "@/api/posts";
import useSwr from "swr";
import { nanoid } from "nanoid";
import Link from "next/link";
import { fetcher } from "@/lib-client/swr/fetcher";

type Props = {};

const Posts = ({}: Props) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSwr<TGetResponse>("/api/posts", fetcher);
  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof posts === "undefined") {
    return <div>Page has error</div>;
  }
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Link key={nanoid()} href={`/posts/${post.id}`}>
            <p>{post.user.profile.name}</p>
            <h3>{post.content}</h3>
          </Link>
        ))}
    </div>
  );
};

export default Posts;