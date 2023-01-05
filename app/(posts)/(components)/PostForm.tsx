"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postsSchema } from "@/lib-server/validations/users";
import { z } from "zod";
import { useSession } from "next-auth/react";

type Props = { mutate: Function };

const PostForm = ({ mutate }: Props) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof postsSchema["post"]["body"]>>({
    resolver: zodResolver(postsSchema["post"]["body"]),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof postsSchema["post"]["body"]>
  > = async (data) => {
    try {
      const res = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
        mutate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Create a post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Content
          <input {...register("content")} />
          {errors.content?.message && <p>{errors.content?.message}</p>}
        </label>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
