type Props = {
  postCommentsCount?: number;
};

const PostComments = ({ postCommentsCount }: Props) => {
  if (!postCommentsCount) {
    return <div>No comment count</div>;
  } else {
    return <div>{postCommentsCount} comments</div>;
  }
};

export default PostComments;
