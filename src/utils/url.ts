export const env = import.meta.env;
export const BASE_URL = env.VITE_APP_BASE_URL || "http://localhost:5001/api"

//Auth
export const AUTH_BASE_URL = `${BASE_URL}/auth`
export const GITHUB_AUTH_REDIRECT = `${AUTH_BASE_URL}/github`
export const REFRESH_TOKEN = `${AUTH_BASE_URL}/refresh`
export const REFRESH_COOKIE_NAME = env.VITE_APP_REFRESH_COOKIE_NAME!

//Leetcode
export const LEETCODE_BASE_URL = `${BASE_URL}/leetcode`
export const UPDATE_LEETCODE = `${LEETCODE_BASE_URL}/update`

//Github
export const GITHUB_BASE_URL = `${BASE_URL}/github`
export const REPO_SEARCH = `https://api.github.com/search/repositories`
export const GET_BRANCH = `${GITHUB_BASE_URL}/branch`
export const UPDATE_GITHUB = `${GITHUB_BASE_URL}/repo/update`

//Push
export const PUSH_URL = `${BASE_URL}/push`