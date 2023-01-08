"use client";
import type { TGetResponse } from "@/api/posts";
import useSWR from "swr";
import { nanoid } from "nanoid";
import Link from "next/link";
import { fetcher } from "@/lib-client/swr/fetcher";
import PostForm from "./post-form";
import { useState } from "react";

type Props = {};

const Posts = ({ }: Props) => {
  const [pageIndex, setPageIndex] = useState(1);

  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR<TGetResponse>(`/api/posts?page=${pageIndex}`, fetcher);

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof posts === "undefined") {
    return <div>Page has error</div>;
  }

  return (
    <div>
      <PostForm mutate={mutate} />
      {posts &&
        posts.map((post) => (
          <div key={nanoid()}>
            <p>{post.user.profile.name}</p>
            <Link href={`/posts/${post.id}`}>
              <h3>{post.content}</h3>
            </Link>
          </div>
        ))}
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
};

export default Posts;
