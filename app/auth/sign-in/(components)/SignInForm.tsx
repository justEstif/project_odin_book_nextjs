"use client";
import { AuthSchema, TAuthSchema } from "@/lib/nextAuth/validation/auth";
import { signIn } from "next-auth/react";
import { FormEvent, Reducer, useReducer } from "react";
import { z } from "zod";
type Props = {};

const SignInForm = ({}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateFieldValue =
    (field: keyof TAuthSchema) => (event: FormEvent<HTMLInputElement>) => {
      dispatch({
        type: "UPDATE_FIELD_VALUE",
        field,
        value: event.currentTarget.value,
      });
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      AuthSchema.parse(state);
      await signIn("email", { email: state.email, callbackUrl: "/" });
      dispatch({ type: "CLEAR_FORM" });
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.log(e.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            value={state.email}
            type="email"
            onChange={updateFieldValue("email")}
          />
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

const initialState: TAuthSchema = {
  email: "",
};

type Action =
  | { type: "UPDATE_FIELD_VALUE"; field: string; value: string }
  | { type: "CLEAR_FORM" };

const reducer: Reducer<TAuthSchema, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD_VALUE":
      return { ...state, [action.field]: action.value };
    case "CLEAR_FORM":
      return initialState;
    default:
      return state;
  }
};
