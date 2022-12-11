import Image from "next/image";
import { getCurrentUser, getSession } from "@/lib/session";

type Props = {};

const Page = async ({}: Props) => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <div>Created a new user</div>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <Image
          width={100}
          height={100}
          src={user?.image || ""}
          alt="No image"
        />
      </div>
    </div>
  );
};

export default Page;
