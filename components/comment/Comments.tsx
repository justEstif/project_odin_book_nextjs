"use client";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]/comments";
import { nanoid } from "nanoid";
import Comment from "./Comment";

type Props = {
  postId: string;
};

const Comments = ({ postId }: Props) => {
  const {
    trigger,
    reset,
    data: comments,
  } = useSWRMutation(`/api/posts/${postId}/comments`, getComments);

  return (
    <div>
      {/* TODO Add comment form here */}
      {/* <button onClick={comments ? reset : trigger}>Show all comments</button> */}
      <button onClick={trigger}>Show all comments</button>
      {comments?.map((comment) => (
        <Comment key={nanoid()} trigger={trigger} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

const getComments = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error with status code: ${res.status}`);
  }
  return (await res.json()) as Promise<TGetResponse>;
};
