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
  const [postCommentCount, setPostCommentCount] = useState(0);
  const {
    data: post,
    error,
    isLoading,
    mutate,
  } = useSWR<TGetResponse>(`/api/posts/${postId}`, fetcher);

  useEffect(() => {
    setPostCommentCount(post?._count.comments || 0);
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
      <PostLikeBtn postId={postId} mutate={mutate} userLike={userLike} />
      <PostComments
        postId={postId}
        mutate={mutate}
        postCommentsCount={postCommentCount}
      />
    </div>
  );
};

export default Post;
