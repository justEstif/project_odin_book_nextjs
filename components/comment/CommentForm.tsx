"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  commentsSchema,
  commentsIdSchema,
} from "@/lib-server/validations/posts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  functions: {
    trigger: Function;
  };
  ids: {
    commentId?: string;
    postId: string;
  };
};

const CommentForm = ({ ids, functions }: Props) => {
  type TForm = typeof ids.commentId extends string
    ? z.infer<typeof commentsIdSchema["post"]["body"]>
    : z.infer<typeof commentsSchema["post"]["body"]>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForm>({
    resolver: ids.commentId
      ? zodResolver(commentsIdSchema["post"]["body"])
      : zodResolver(commentsSchema["post"]["body"]),
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    const url = ids.commentId
      ? `/api/posts/${ids.postId}/comments/${ids.commentId}`
      : `/api/posts/${ids.postId}/comments`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      functions.trigger(); // get comments again
      reset(); // reset form
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
