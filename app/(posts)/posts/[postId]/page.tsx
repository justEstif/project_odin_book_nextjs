import Post from "./(components)/Post";

type Props = {
  params: {
    postId: string;
  };
};

const Page = async ({ params: { postId } }: Props) => {
  return <Post postId={postId} />;
};

export default Page;