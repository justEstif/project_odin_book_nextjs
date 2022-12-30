type Props = {
  user: {
    relation: string;
    profile: {
      name: string;
      image: string;
    };
    id: string;
  };
};

const User = ({ user }: Props) => {
  return (
    <div>
      <p>{user.profile.name}</p>
      <p>{user.relation}</p>
    </div>
  );
};

export default User;
