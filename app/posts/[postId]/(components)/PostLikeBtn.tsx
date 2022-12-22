"use client";
import { TGetResponse } from "@/api/posts/[postId]";
import { KeyedMutator } from "swr";
type Props = {
  postId: string;
  mutate: KeyedMutator<TGetResponse>;
  userLike: boolean;
};

const PostLikeBtn = ({ postId, userLike, mutate }: Props) => {
  const handleClick = () => {
    likeUnlikePost(`/api/posts/${postId}/likes`).then(() => mutate());
  };

  return <button onClick={handleClick}>{userLike ? "Unlike" : "Like"}</button>;
};

export default PostLikeBtn;

const likeUnlikePost = async (url: string) => {
  await fetch(url, {
    method: "POST",
  });
};
