export type AccessTokenType = {
  access_token: string;
  user: UserType;
};

export type ErrorType = {
  error: string;
};

export type UserType = {
  userId: string;
  email: string;
  name: string;
  leetcode_username: string;
  leetcode_prev_submission: number;
  github_username: string;
  github_repo: string;
  github_avatar_url: string;
};

export const initialUser: UserType = {
  userId: "",
  email: "",
  name: "",
  leetcode_username: "",
  leetcode_prev_submission: 0,
  github_username: "",
  github_repo: "",
  github_avatar_url: "",
};

export type AuthContextType = {
  accessToken: string;
  setAuth: (r: AccessTokenType) => void;
  clearAuth: () => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  isAuthenticated: boolean;
  user: UserType;
  setLeetcode: (s: string) => void;
  setGithub: (g: string) => void;
};

export type RepoSearchRes = {
  items: RepoType[];
  total_count: number;
};

export type RepoType = {
  id: string;
  name: string;
  html_url: string;
  default_branch: string;
  branches_url: string;
};

export type BranchType = {
  name: string;
};

export interface ActionType {
  type: string;
}

export interface SetRefreshTokenAction extends ActionType {
  payload: {
    access_token: string;
    user: UserType;
  };
}

export interface SetRepoSearchAction extends ActionType {
  payload: RepoSearchRes;
}

export interface SetLeetcodeAction extends ActionType {
  payload: LeetcodeResponse;
}
export type LeetcodeResponse = {
  message: string;
  leetcode_username: string;
  leetcode_prev_submission: number;
};
