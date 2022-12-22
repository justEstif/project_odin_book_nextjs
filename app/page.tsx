import PostForm from "./(components)/PostForm";
import Posts from "./(components)/Posts";

type Props = {};

const Page = ({}: Props) => {
  return (
    <div>
      <div>
        <h4>Create a post</h4>
        <PostForm />
      </div>
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Page;
