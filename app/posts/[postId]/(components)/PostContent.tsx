type Props = {
  postContent?: string;
};

const PostContent = ({ postContent }: Props) => {
  if (!postContent) {
    return <div>No content</div>;
  } else {
    return <div>{postContent}</div>;
  }
};

export default PostContent;
