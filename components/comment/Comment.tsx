import CommentForm from "./CommentForm";

type Props = {
  comment: {
    id: string;
    postId: string;
    parentCommentId: string | null;
    content: string;
    user: {
      id: string;
      profile: {
        name: string;
        image: string;
      };
    };
  };
};

const Comment = ({ comment }: Props) => {
  return (
    <div>
      <p>
        {comment.user.profile.name}: {comment.content}
      </p>
      <CommentForm
        ids={{
          postId: comment.postId,
          commentId: comment.id,
        }}
        functions={{ mutate: () => "", trigger: () => "" }}
      />
    </div>
  );
};

export default Comment;
