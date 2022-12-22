"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, TPostSchema } from "@/lib-server/validations/post";

type Props = {};

const PostForm = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<TPostSchema> = async (data) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) console.log("Created post");
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
