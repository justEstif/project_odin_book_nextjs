"use client";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]/comments";
import { nanoid } from "nanoid";
import CommentForm from "./CommentForm";

type Props = {
  postId: string;
  postCommentsCount?: number;
  mutate: Function;
};

const PostComments = ({ postCommentsCount, postId, mutate }: Props) => {
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
        <CommentForm postId={postId} trigger={trigger} mutate={mutate} />
        <button onClick={comments ? reset : trigger}>
          {postCommentsCount} comments
        </button>
        {comments?.comments.map((comment) => (
          <div key={nanoid()}>
            {/* TODO: add child comment */}
            <p>{comment.content}</p>
            <CommentForm
              commentId={comment.id}
              postId={postId}
              trigger={trigger}
              mutate={mutate}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default PostComments;

const getComments = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error with status code: ${res.status}`);
  }
  return (await res.json()) as Promise<TGetResponse>;
};
