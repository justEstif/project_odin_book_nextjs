type Props = {
  params: {
    userId: string;
  };
};

const Page = ({ params: { userId } }: Props) => {
  return <div>User: {userId}</div>;
};

export default Page;
