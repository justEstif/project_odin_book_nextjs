"use client";
import useSWRMutation from "swr/mutation";
import useGetCurrentUserId from "@/lib-client/hooks/useGetCurrentUserId";

type Props = {
  relation: "user" | "received-request" | "sent-request" | "friend" | "none";
  id: string;
};

const UserButton = ({ relation, id }: Props) => {
  const currentUserId = useGetCurrentUserId();

  const { trigger: sendRequest } = useSWRMutation(
    {
      url: `/api/users/${currentUserId}/sent-requests/${id}`,
      method: "POST",
    },
    request
  );

  const { trigger: acceptReceived } = useSWRMutation(
    {
      url: `/api/users/${currentUserId}/received-requests/${id}`,
      method: "POST",
    },
    request
  );

  const { trigger: deleteSent } = useSWRMutation(
    {
      url: `/api/users/${currentUserId}/sent-requests/${id}`,
      method: "DELETE",
    },
    request
  );

  const { trigger: deleteFriend } = useSWRMutation(
    {
      url: `/api/users/${currentUserId}/friends/${id}`,
      method: "DELETE",
    },
    request
  );

  const { trigger: deleteReceived } = useSWRMutation(
    {
      url: `/api/users/${currentUserId}/received-requests/${id}`,
      method: "DELETE",
    },
    request
  );

  return (
    <>
      {relation === "friend" && (
        <div className="grid grid-rows-2 gap-2 justify-items-center items-center">
          <button>Friends</button>
          <button onClick={deleteFriend}>Remove Friend</button>
        </div>
      )}
      {relation === "none" && (
        <div className="grid grid-rows-2 gap-2 justify-items-center items-center">
          <button onClick={sendRequest}>Add Friend</button>
          <button>Remove Recommendation</button>
        </div>
      )}
      {relation === "received-request" && (
        <div className="grid grid-rows-2 gap-2 justify-items-center items-center">
          <button onClick={acceptReceived}>Accept Request</button>
          <button onClick={deleteSent}>Cancel Request</button>
        </div>
      )}
      {relation === "sent-request" && (
        <div className="grid grid-rows-2 gap-2 justify-items-center items-center">
          <button disabled>Pending Request</button>
          <button onClick={deleteReceived}>Delete Request</button>
        </div>
      )}
    </>
  );
};

export default UserButton;

async function request({ url, method }: { url: string; method: string }) {
  const res = await fetch(url, { method });
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Error");
  }
}
