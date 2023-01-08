"use client";
import { AuthSchema, TAuthSchema } from "@/lib-client/validation/auth";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <input className="border-2 border-black" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <button type="submit" className="bg-gray-300">
          Sign in with email
        </button>
      </form>
      <fieldset className="border-t border-slate-300">
        <legend className="px-4 mx-auto text-sm uppercase">
          or continue with
        </legend>
        <div className="flex justify-center items-center pt-4">
          <button
            className="flex justify-center items-center bg-gray-300"
            onClick={async () => await signIn("facebook")}
          >
            <svg
              role="img"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <title>Facebook</title>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default AuthForm;
