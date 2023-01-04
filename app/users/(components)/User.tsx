"use client";
import useGetCurrentUserId from "@/lib-client/hooks/useGetCurrentUserId";
import Link from "next/link";
import Image from "next/image";
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
  const currentUserId = useGetCurrentUserId();
  const { trigger: deleteFriend } = useSWRMutation(
    `/api/users/${currentUserId}/friends/${userData.id}`,
    deleteRequest
  );
  const { trigger: deleteSentFriendRequest } = useSWRMutation(
    `/api/users/${currentUserId}/sent-requests/${userData.id}`,
    deleteRequest
  );
  const { trigger: sendFriendRequest } = useSWRMutation(
    `/api/users/${currentUserId}/sent-requests/${userData.id}`,
    postRequest
  );

  const { trigger: acceptFriendRequest } = useSWRMutation(
    `/api/users/${currentUserId}/received-requests/${userData.id}`,
    postRequest
  );
  const { trigger: deleteReceivedFriendRequest } = useSWRMutation(
    `/api/users/${currentUserId}/received-requests/${userData.id}`,
    deleteRequest
  );

  return (
    <div className="bg-gray-400">
      <div className="block relative bg-red-500 rounded-full">
        <Image
          src={userData?.profile?.image || ""}
          alt={userData?.profile?.name || "Profile image"}
          fill={true}
          // className="w-10 h-10"
        />
      </div>
      <div>
        <div>Name</div>
        <div>Bio</div>
        <div>
          <div>Button 1</div>
          <div>Button 2</div>
        </div>
      </div>

      {/* <p>{userData.profile.name}</p> */}
      {/* <div> */}
      {/*   <Link href={`/users/${userData.id}`}>Go to user page</Link> */}
      {/* </div> */}
      {/* {userData.relation === "none" && ( */}
      {/*   <button onClick={sendFriendRequest}>send friend request</button> */}
      {/* )} */}
      {/* {userData.relation === "friend" && ( */}
      {/*   <button onClick={deleteFriend}>unfriend</button> */}
      {/* )} */}
      {/* {userData.relation === "received-request" && ( */}
      {/*   <button onClick={deleteSentFriendRequest}>delete friend request</button> */}
      {/* )} */}
      {/* {userData.relation === "sent-request" && ( */}
      {/*   <button onClick={acceptFriendRequest}>accept friend request</button> */}
      {/* )} */}
      {/* {userData.relation === "sent-request" && ( */}
      {/*   <button onClick={deleteReceivedFriendRequest}> */}
      {/*     delete friend request */}
      {/*   </button> */}
      {/* )} */}
      {/* <Image */}
      {/*   src={userData?.profile?.image || ""} */}
      {/*   alt={userData?.profile?.name || "Profile image"} */}
      {/*   width={200} */}
      {/*   height={200} */}
      {/* /> */}
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
