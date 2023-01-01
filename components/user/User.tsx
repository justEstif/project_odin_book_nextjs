type Props = {
  user: {
    relation: "user" | "received-request" | "sent-request" | "friend" | "other";
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
      {user.relation === "other" && <button>send friend request</button>}
      {user.relation === "received-request" && (
        <button>accept friend request</button>
      )}
      {user.relation === "sent-request" && (
        <button>delete pending request</button>
      )}
      {user.relation === "friend" && <button>unfriend</button>}
      {user.relation === "user" && <button>go to page</button>}
    </div>
  );
};

export default User;
