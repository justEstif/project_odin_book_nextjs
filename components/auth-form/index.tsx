"use client";
import { AuthSchema, TAuthSchema } from "@/lib-client/validation/auth";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CircleNotch } from "phosphor-react";
import styles from "./authForm.module.css";

type Props = {
  intent: "sign-in" | "sign-up";
};

const AuthForm = ({ intent }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit: SubmitHandler<TAuthSchema> = async (data) => {
    const signInResult = await signIn("email", {
      email: data.email,
      redirect: false,
      callbackUrl: "/",
    });

    if (!signInResult?.ok) {
      setError("email", {
        type: "danger",
        message: "Your sign in request failed. Please try again.",
      });
    } else {
      setError("email", {
        type: "success",
        message: `We sent you a ${
          intent === "sign-in" ? "sign in " : "sign up "
        }link. Be sure to check your spam too.`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          {...register("email")}
          placeholder="Email address"
          className={styles.input}
        />
        {errors.email?.message && errors.email.type !== "success" && (
          <span className={styles.errorMessage}>{errors.email?.message}</span>
        )}
        {errors.email?.message && errors.email.type === "success" && (
          <span className={styles.successMessage}>{errors.email?.message}</span>
        )}

        <Button type="submit" disabled={isSubmitting ? true : false}>
          <span>
            {intent === "sign-in" ? "Sign in " : "Sign up "}with Email
          </span>
          {isSubmitting && <CircleNotch className={styles.submissionIcon} />}
        </Button>
      </form>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>or</legend>
        <Button intent={"secondary"} onClick={async () => signIn("facebook")}>
          {intent === "sign-in" ? "Sign in " : "Sign up "}with Facebook
        </Button>
      </fieldset>
    </>
  );
};

export default AuthForm;
