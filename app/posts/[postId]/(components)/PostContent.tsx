"use client";
import useSwr from "swr";
import { TGetResponse } from "@/api/posts/[postId]";

type Props = {
  postId: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PostContent = ({ postId }: Props) => {
  const {
    data: post,
    error,
    isLoading,
  } = useSwr<TGetResponse>(`/api/posts/${postId}`, fetcher);
  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof post === "undefined") {
    return <div>Page has error</div>;
  }
  return (
    <div>
      <div>{post?.content}</div>
      <div>Like</div>
    </div>
  );
};

export default PostContent;
