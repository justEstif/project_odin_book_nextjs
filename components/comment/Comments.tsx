"use client";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]/comments";
import { nanoid } from "nanoid";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

type Props = {
  postId: string;
  postCommentsCount?: number;
  mutate: Function;
};

const Comments = ({ postCommentsCount, postId, mutate }: Props) => {
  const {
    trigger,
    reset,
    data: comments,
  } = useSWRMutation(`/api/posts/${postId}/comments`, getComments);
  if (!postCommentsCount) {
    return <div>No comment count</div>;
  } else {
    return (
      <div>
        {/* TODO Add comment form here */}
        <button onClick={comments ? reset : trigger}>
          {postCommentsCount}-Show all comments
        </button>
        {comments?.comments.map((comment) => (
          <div key={nanoid()}>
            <Comment key={nanoid()} comment={comment} />
            {comment.childComments.length
              ? comment.childComments.map((childComment) => (
                  <Comment key={nanoid()} comment={childComment} />
                ))
              : null}
          </div>
        ))}
      </div>
    );
  }
};

export default Comments;

const getComments = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error with status code: ${res.status}`);
  }
  return (await res.json()) as Promise<TGetResponse>;
};
