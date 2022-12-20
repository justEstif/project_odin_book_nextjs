type Props = {
  params: {
    postId: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <div>{params.postId}</div>
    </div>
  );
};

export default Page;
