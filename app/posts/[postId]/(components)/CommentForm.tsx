"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TCommentSchema,
  commentSchema,
} from "@/lib-server/validations/comment";

type Props = {
  postId: string;
  trigger: Function;
  mutate: Function;
  commentId?: string;
};

const CommentForm = ({ postId, commentId, trigger, mutate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<TCommentSchema> = async (data) => {
    try {
      const url = commentId
        ? `/api/posts/${postId}/comments/${commentId}`
        : `/api/posts/${postId}/comments`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        trigger(); // trigger fetch
        mutate(); // mutate count
        reset(); // reset form
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        New Comment
        <input {...register("content")} />
        {errors.content?.message && <p>{errors.content?.message}</p>}
      </label>
    </form>
  );
};

export default CommentForm;
