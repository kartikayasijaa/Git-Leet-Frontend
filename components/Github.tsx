"use client";
import useSession from "@/hooks/useSession";
import SearchGithubRepo from "./SearchGithubRepo";
import { FaGithub } from "react-icons/fa";
import { Link } from "@nextui-org/react";

export const Github = () => {
  const {
    user: { github_repo, github_username },
  } = useSession();
  return (
    <>
      {github_repo && github_repo.length > 0 ? (
        <div className="flex items-center">
        <FaGithub color={`white`} />{" "}
        <Link
          target={`_blank`}
          size="lg"
          underline="focus"
          color={`foreground`}
          href={`https://github.com/${github_username}/${github_repo}`}
          className="ml-2"
        >
          {github_repo}
        </Link>
      </div>
      ) : (
        <SearchGithubRepo />
      )}
    </>
  );
};
