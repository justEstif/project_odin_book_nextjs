"use client";
import useSWRMutation from "swr/mutation";
import useCurrentUserId from "@/lib-client/hooks/useGetCurrentUserId";

type Props = {
  relation: "user" | "received-request" | "sent-request" | "friend" | "none";
  id: string;
};

const UserButton = ({ relation, id }: Props) => {
  const currentUserId = useCurrentUserId();

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
        <div className="flex gap-4 py-4 px-6 bg-gray-100">
          <button
            type="button"
            className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none"
          >
            Friends
          </button>
          <button
            type="button"
            onClick={deleteFriend}
            className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg border border-transparent hover:bg-red-700 focus:outline-none"
          >
            Unfriend
          </button>
        </div>
      )}
      {relation === "none" && (
        <div className="flex gap-4 py-4 px-6 bg-gray-100">
          <button
            type="button"
            onClick={sendRequest}
            className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none"
          >
            Add Friend
          </button>
          <button
            type="button"
            onClick={deleteFriend}
            className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg border border-transparent hover:bg-red-700 focus:outline-none"
          >
            Remove Recommendation
          </button>
        </div>
      )}
      {relation === "received-request" && (
        <div className="flex gap-4 py-4 px-6 bg-gray-100">
          <button
            type="button"
            onClick={acceptReceived}
            className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none"
          >
            Accept Request
          </button>
          <button
            type="button"
            onClick={deleteSent}
            className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg border border-transparent hover:bg-red-700 focus:outline-none"
          >
            Cancel Request
          </button>
        </div>
      )}
      {relation === "sent-request" && (
        <div className="flex gap-4 py-4 px-6 bg-gray-100">
          <button
            type="button"
            className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none"
          >
            Pending Request
          </button>
          <button
            type="button"
            onClick={deleteReceived}
            className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg border border-transparent hover:bg-red-700 focus:outline-none"
          >
            Delete Request
          </button>
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
