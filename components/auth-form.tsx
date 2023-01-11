"use client";
import { AuthSchema, TAuthSchema } from "@/lib-client/validation/auth";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

type Props = {};

const AuthForm = ({}: Props) => {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <Button type="submit">Sign in with email</Button>
      </form>
      <fieldset className="border-t border-secondary-300">
        <legend className="px-4 mx-auto mb-4 text-xs uppercase text-secondary-500">
          or
        </legend>
        <Button
          intent={"secondary"}
          onClick={async () => await signIn("facebook")}
        >
          Sign in with Facebook
        </Button>
      </fieldset>
    </>
  );
};

export default AuthForm;
