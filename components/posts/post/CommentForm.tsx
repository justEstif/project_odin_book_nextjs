"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  commentsSchema,
  commentsIdSchema,
} from "@/lib-server/validations/posts";

type Props = {
  postId: string;
  trigger: Function;
  mutate: Function;
  commentId?: string;
};

const CommentForm = ({ postId, commentId, trigger, mutate }: Props) => {
  type TForm = typeof commentId extends string
    ? z.infer<typeof commentsSchema["post"]["body"]>
    : z.infer<typeof commentsIdSchema["post"]["body"]>;

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
