import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = {};

const Page = async ({}: Props) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  } else {
    return (
      <div>
        <div>Home Page</div>
        <div>{user.name}</div>
      </div>
    );
  }
};

export default Page;
