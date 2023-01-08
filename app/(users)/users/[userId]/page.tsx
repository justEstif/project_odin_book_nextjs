import User from "@/components/user";
type Props = {
  params: {
    userId: string;
  };
};

const Page = ({ params: { userId } }: Props) => {
  return (
    <div>
      <User userId={userId} />
    </div>
  );
};

export default Page;
