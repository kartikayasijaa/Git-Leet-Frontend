import { createSlice } from "@reduxjs/toolkit";
import { RepoSearchRes, RepoType, SetRepoSearchAction } from "../utils/types";
import { AppDispatch, RootState } from "./store";
import { REPO_SEARCH, UPDATE_GITHUB } from "../utils/url";
import { setLoading } from "./userSlice";

const repoSlice = createSlice({
  name: "repo",
  initialState: {
    repoSearchResult: {} as RepoSearchRes,
    repoSearchTerm: "",
    selectedRepo: {} as RepoType,
    selectedBranch: "",
  },
  reducers: {
    setRepoSearchResult: (state, action: SetRepoSearchAction) => {
      state.repoSearchResult = action.payload;
    },
    setSelectedRepo: (state, action) => {
      state.selectedRepo = action.payload;
    },
    setRepoSearchTerm: (state, action) => {
      state.repoSearchTerm = action.payload;
    },
    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
  },
});

export const {
  setRepoSearchResult,
  setSelectedRepo,
  setRepoSearchTerm,
  setSelectedBranch,
} = repoSlice.actions;
export default repoSlice.reducer;

//thunks
export const fetchRepoSearch =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      user: {
        user: { github_username },
        accessToken,
      },
      repo: { repoSearchTerm },
    } = getState();

    if (!repoSearchTerm || repoSearchTerm.length === 0) return;

    const searchQuery = `user:${github_username} ${repoSearchTerm}`;
    try {
      const res = await fetch(`${REPO_SEARCH}?q=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error fetching");
      }

      const repo = (await res.json()) as RepoSearchRes;
      if (!repo.items) {
        throw new Error("Error fetching Repos");
      }
      dispatch(setRepoSearchResult(repo));
    } catch (error) {
      console.log(error);
    }
  };

export const updateGithubRepo =
  (cb?: () => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      user: {
        user: { userId, github_repo },
        accessToken,
      },
      repo: { selectedBranch },
    } = getState();

    const body = {
      github_repo,
      userId,
      github_repo_branch: selectedBranch,
    };
    dispatch(setLoading(true))
    try {
      const res = await fetch(UPDATE_GITHUB, {
        method: "PATCH",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`Failed to update Github Repo. Status: ${res.status}`);
      }
      const data = (await res.json()) as {
        github_repo: string;
        github_repo_branch: string;
      };
      console.log(data);
      if (cb) cb();
    } catch (error) {
      console.error("Error updating Github:", error);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const closeModalCleanup = () => async (dispatch: AppDispatch) => {
  dispatch(setRepoSearchTerm(""));
  dispatch(setRepoSearchResult({} as RepoSearchRes));
  dispatch(setSelectedRepo({} as RepoType));
  dispatch(setSelectedBranch(""));
};
