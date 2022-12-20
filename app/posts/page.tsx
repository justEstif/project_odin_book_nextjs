"use client";
import PostForm from "./(components)/PostForm";
import useSwr from "swr";
import type { TGetResponse } from "@/api/posts";
import { nanoid } from "nanoid";
import Link from "next/link";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Page = ({}: Props) => {
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
      <div>Create post</div>
      <PostForm />
      <div>
        {posts &&
          posts.map((post) => (
            <div key={nanoid()}>
              <Link href={`/posts/${post.id}`}>Link</Link>
              <button
                onClick={async () => {
                  await fetch(`/api/posts/${post.id}/likes`, {
                    method: "POST",
                  });
                }}
              >
                Like
              </button>
              <h3>{post.content}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
