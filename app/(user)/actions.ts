"use server";
import { BranchType, RepoSearchRes, RepoType } from "@/constants/types";
import {
  GET_BRANCH,
  REPO_SEARCH,
  UPDATE_GITHUB,
  UPDATE_LEETCODE,
} from "@/constants/url";

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
      cache: "no-store",
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

export const getBranch = async ({
  github_username,
  repo,
  accessToken,
}: {
  github_username: string;
  repo: RepoType;
  accessToken: string;
}) => {
  try {
    const res = await fetch(`${GET_BRANCH}/${github_username}/${repo.name}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (!res.ok) {
      throw new Error("Error getting Branch");
    }
    const r = (await res.json()) as BranchType[];
    return r;
  } catch (error) {
    throw error;
  }
};

export const updateRepo = async (
  userId: string,
  token: string,
  repo: string,
  branch: string
) => {
  const body = {
    github_repo: repo,
    userId: userId,
    github_repo_branch: branch,
  };
  try {
    const res = await fetch(UPDATE_GITHUB, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to update Github Repo. Status: ${res.status}`);
    }
    const data = (await res.json()) as {
      github_repo: string;
      github_repo_branch: string;
    };
    return data;
  } catch (error) {
    console.error("Error updating Github:", error);
    throw error;
  }
};
