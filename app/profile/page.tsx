import { getCurrentUser, getSession } from "@/lib/session";

type Props = {};

const Page = async ({}: Props) => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <div>Created a new user</div>
    </div>
  );
};

export default Page;
