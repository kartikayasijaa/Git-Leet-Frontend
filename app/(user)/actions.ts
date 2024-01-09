"use server";
import { RepoSearchRes, RepoType } from "@/constants/types";
import { REPO_SEARCH, UPDATE_LEETCODE } from "@/constants/url";

export const updateLeetcode = async (
  userId: string,
  token: string,
  username: string
) => {
  const body = {
    leetcode_username: username,
    userId: userId,
  };
  try {
    const res = await fetch(UPDATE_LEETCODE, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to update Leetcode. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating Leetcode:", error);
    throw error;
  }
};

export const searchRepo = async ({
  github_username,
  search,
  accessToken,
}: {
  github_username: string;
  search: string;
  accessToken: string;
}) => {
  try {
    const res = await fetch(`${REPO_SEARCH}/${github_username}/${search}`, {
      headers: {
        Authorization: accessToken,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error("Error fetching");
    }

    const repo = (await res.json()) as RepoSearchRes;
    if (!repo.items) return { items: [] };
    return repo;
  } catch (error) {
    throw error;
  }
};
