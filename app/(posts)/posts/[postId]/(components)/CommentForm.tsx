"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  commentsSchema,
  commentsIdSchema,
} from "@/lib-server/validations/posts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  trigger: Function;
  commentId?: string;
  postId: string;
};

const CommentForm = ({ trigger, commentId, postId }: Props) => {
  type TForm = typeof commentId extends string
    ? z.infer<typeof commentsIdSchema["post"]["body"]>
    : z.infer<typeof commentsSchema["post"]["body"]>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForm>({
    resolver: commentId
      ? zodResolver(commentsIdSchema["post"]["body"])
      : zodResolver(commentsSchema["post"]["body"]),
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
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
      trigger();
      reset();
    } else {
      throw new Error("Error creating comment");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          New Comment
          <input {...register("content")} />
          {errors.content?.message && <p>{errors.content?.message}</p>}
        </label>
      </form>
    </div>
  );
};

export default CommentForm;
