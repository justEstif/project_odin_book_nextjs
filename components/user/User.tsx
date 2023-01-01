"use client";
import { useSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";
type Props = {
  userData: {
    relation: "user" | "received-request" | "sent-request" | "friend" | "none";
    profile: {
      name: string;
      image: string;
    };
    id: string;
  };
};

const User = ({ userData }: Props) => {
  const { data: session } = useSession();
  const { trigger: deleteFriend } = useSWRMutation(
    `/api/users/${session?.user.id}/friends/${userData.id}`,
    deleteRequest
  );
  const { trigger: deleteSentFriendRequest } = useSWRMutation(
    `/api/users/${session?.user.id}/sent-requests/${userData.id}`,
    deleteRequest
  );
  const { trigger: deleteReceivedFriendRequest } = useSWRMutation(
    `/api/users/${session?.user.id}/received-requests/${userData.id}`,
    deleteRequest
  );
  const { trigger: acceptFriendRequest } = useSWRMutation(
    `/api/users/${session?.user.id}/received-requests/${userData.id}`,
    postRequest
  );
  const { trigger: sendFriendRequest } = useSWRMutation(
    `/api/users/${session?.user.id}/sent-requests/${userData.id}`,
    postRequest
  );

  return (
    <div>
      <p>{userData.profile.name}</p>
      <div>
        <button>Go to user page</button>
      </div>
      {userData.relation === "none" && (
        <button onClick={sendFriendRequest}>send friend request</button>
      )}
      {userData.relation === "friend" && (
        <button onClick={deleteFriend}>unfriend</button>
      )}
      {userData.relation === "received-request" && (
        <button onClick={deleteSentFriendRequest}>delete friend request</button>
      )}
      {userData.relation === "sent-request" && (
        <button onClick={acceptFriendRequest}>accept friend request</button>
      )}
      {userData.relation === "sent-request" && (
        <button onClick={deleteReceivedFriendRequest}>
          delete friend request
        </button>
      )}
    </div>
  );
};

export default User;

async function postRequest(url: string) {
  const res = await fetch(url, { method: "POST" });
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Error sending friend request");
  }
}

async function deleteRequest(url: string) {
  const res = await fetch(url, { method: "DELETE" });
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Error sending friend request");
  }
}
