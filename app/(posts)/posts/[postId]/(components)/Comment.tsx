"use client";
import CommentForm from "./CommentForm";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]/comments/[commentId]";
import { nanoid } from "nanoid";
import { useState } from "react";

type Props = {
  comment: {
    id: string;
    postId: string;
    userId: string;
    parentCommentId: string | null;
    content: string;
    user: {
      profile: {
        image: string;
        name: string;
      };
    };
  };
  trigger: Function;
};

const Comment = ({ comment }: Props) => {
  const {
    trigger,
    reset,
    data: commentData,
  } = useSWRMutation(
    `/api/posts/${comment.postId}/comments/${comment.id}`,
    getComments
  );

  const [replyForm, setReplyForm] = useState(true);

  return (
    <div style={{ paddingLeft: 30 }}>
      <div>
        <p>
          {comment.user.profile.name}: {comment.content}
        </p>
        <button
          onClick={() => {
            setReplyForm(!replyForm);
          }}
        >
          Reply
        </button>
        {!replyForm && (
          <CommentForm
            postId={comment.postId}
            commentId={comment.id}
            trigger={trigger}
          />
        )}
        <button onClick={!commentData ? trigger : reset}>
          {!commentData ? "Show More" : "Show Less"}
        </button>
      </div>

      {commentData?.childComments.map((childComment) => (
        <Comment key={nanoid()} trigger={trigger} comment={childComment} />
      ))}
    </div>
  );
};

export default Comment;

const getComments = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error with status code: ${res.status}`);
  }
  return (await res.json()) as Promise<TGetResponse>;
};
