"use client";
import useSwr from "swr";
import type { TGetResponse } from "@/api/users";
import { fetcher } from "@/lib-client/swr/fetcher";

type Props = {};

const Page = ({ }: Props) => {
  // TODO: how to check if it is an error
  const { data, error, isLoading } = useSwr<TGetResponse>(
    "/api/users",
    fetcher
  );

  if (isLoading) {
    return <div>Page is loading</div>;
  } else if (
    error ||
    typeof data === "undefined" ||
    data === null ||
    "message" in data
  ) {
    return <div>Page has error</div>;
  }

  // TODO: use loading file
  // create client side components but make the page server side
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Page;

/**
 * user index page
 * all the users in the website
 * some different between friends, sent requests, received requests, and non
 */
