import Posts from "@/components/post/Posts";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <h1 className="text-2xl">Posts</h1>
      <Posts />
    </div>
  );
};

export default Page;
