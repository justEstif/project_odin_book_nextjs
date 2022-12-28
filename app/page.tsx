import PostForm from "@/components/PostForm";
import Posts from "@/components/Posts";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <PostForm />
      <Posts />
    </div>
  );
};

export default Page;
