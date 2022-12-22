"use client";
import useSWR from "swr";
import { TGetResponse } from "@/api/posts/[postId]";
import { fetcher } from "@/lib-client/swr/fetcher";
import PostContent from "./PostContent";
import PostComments from "./PostComments";
import PostLikeBtn from "./PostLikeBtn";
import { useEffect, useState } from "react";

type Props = {
  postId: string;
};

const Post = ({ postId }: Props) => {
  const [userLike, setUserLike] = useState(false);
  const {
    data: post,
    error,
    isLoading,
    mutate,
  } = useSWR<TGetResponse>(`/api/posts/${postId}`, fetcher);

  useEffect(() => {
    post?.likes.map((like) => like.id).length
      ? setUserLike(true)
      : setUserLike(false);
  }, [post]);

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (error || typeof post === "undefined") {
    return <div>Page has error</div>;
  }

  return (
    <div>
      <PostContent postContent={post?.content} />
      <PostComments postCommentsCount={post?._count.comments} />
      <PostLikeBtn postId={postId} mutate={mutate} userLike={userLike} />
    </div>
  );
};

export default Post;
