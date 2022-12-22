import env from "@/lib-server/env";
import Link from "next/link";
import authOptions from "@/lib-server/nextAuth/authOptions";
import PostContent from "./(components)/PostContent";

type Props = {
  params: {
    postId: string;
  };
  children: React.ReactNode;
};

// const getPost = async (postId: string) => {
//   const req = new Request(`${env.NEXTAUTH_URL}/api/posts/${postId}`);
//   // const res = await fetch(`${env.BASE_FETCH_URL}/api/posts/${postId}`, {});
//   // if (!res.ok) throw new Error("Failed to fetch data");
//   // return res.json();
// };

const Page = async ({ params: { postId } }: Props) => {
  return (
    <div>
      <Link href={`${env.NEXTAUTH_URL}/api/posts/${postId}`}>Api</Link>
      <PostContent postId={postId} />
    </div>
  );
};

export default Page;
