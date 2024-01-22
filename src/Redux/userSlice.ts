import { createSlice } from "@reduxjs/toolkit";
import { LeetcodeResponse, SetLeetcodeAction, SetRefreshTokenAction, UserType } from "../utils/types";
import { AppDispatch, RootState } from "./store";
import { UPDATE_LEETCODE } from "../utils/url";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    isLoading: false,
    isAuthenticated: false,
    user: {
      userId: "",
      email: "",
      name: "",
      leetcode_username: "",
      leetcode_prev_submission: 0,
      github_username: "",
      github_repo: "",
      github_avatar_url: "",
    } as UserType,
  },
  reducers: {
    setRefreshToken: (state, action: SetRefreshTokenAction) => {
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
      if (action.payload.access_token) {
        state.isAuthenticated = true;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLeetcode: (state, action: SetLeetcodeAction) => {
      state.user.leetcode_username = action.payload.leetcode_username;
      state.user.leetcode_prev_submission = action.payload.leetcode_prev_submission;
    }
  },
});

export const { setRefreshToken, setLoading, setLeetcode } = userSlice.actions;
export default userSlice.reducer;

export const updateLeetcode =
  (leetcode: string, cb ?: ()=>void) => async (dispatch: AppDispatch, getState: ()=>RootState) => {
    if(leetcode.length <= 0) return;
    const {
      user: {
        accessToken,
        user: { userId },
      },
    } = getState();

    const body = {
      leetcode_username: leetcode,
      userId,
    };

    dispatch(setLoading(true))
    try {
      const res = await fetch(UPDATE_LEETCODE, {
        method: "PATCH",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Failed to update Leetcode. Status: ${res.status}`);
      }
      const data = await res.json() as LeetcodeResponse;
      dispatch(setLeetcode(data))
      if(cb) cb();
    } catch (error) {
      console.error("Error updating Leetcode:", error);
    } finally {
      dispatch(setLoading(false))
    }
  };
