"use client";
import { AuthSchema, TAuthSchema } from "@/lib-client/validation/auth";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const SignInForm = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit: SubmitHandler<TAuthSchema> = async (data) => {
    await signIn("email", { email: data.email, callbackUrl: "/" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <input {...register("email")} />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </label>
        <button type="submit">Sign in with email</button>
      </form>
      <button onClick={async () => await signIn("facebook")}>
        Sign in with facebook
      </button>
    </div>
  );
};

export default SignInForm;
