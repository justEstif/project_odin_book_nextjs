import { nanoid } from "nanoid";
import { getProviders } from "next-auth/react";
import SignInBtn from "./(components)/SignInBtn";

type Props = {};

const Page = async ({}: Props) => {
  const providers = await getProviders();

  return (
    <div>
      <h1>Sign in Page</h1>
      <div>Add signin form here</div>
      <div>
        {providers &&
          Object.values(providers).map((provider) => (
            <SignInBtn id={provider.id} name={provider.name} key={nanoid()} />
          ))}
      </div>
    </div>
  );
};

export default Page;
