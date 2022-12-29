"use client";
import CommentForm from "./CommentForm";
import useSWRMutation from "swr/mutation";
import { TGetResponse } from "@/api/posts/[postId]/comments/[commentId]";
import { nanoid } from "nanoid";

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

  return (
    <div>
      <p>
        {comment.user.profile.name}: {comment.content}
      </p>

      <div>
        <button onClick={trigger}>Show More</button>
        {commentData?.childComments.map((childComment) => (
          <Comment key={nanoid()} trigger={trigger} comment={childComment} />
        ))}
        {/* <button>Reply(Show comment form)</button> */}
        <CommentForm
          ids={{
            postId: comment.postId,
            commentId: comment.id || undefined,
          }}
          functions={{ trigger }}
        />
      </div>
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
