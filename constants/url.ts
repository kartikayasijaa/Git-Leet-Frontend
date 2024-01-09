export const BASE_URL = process.env.BASE_URL || `http://localhost:5001/api`;


//Auth
export const AUTH_BASE_URL = `${BASE_URL}/auth`
export const GITHUB_AUTH_REDIRECT = `${AUTH_BASE_URL}/github`
export const REFRESH_TOKEN = `${AUTH_BASE_URL}/refresh`

//Leetcode
export const LEETCODE_BASE_URL = `${BASE_URL}/leetcode`
export const UPDATE_LEETCODE = `${LEETCODE_BASE_URL}/update`

//Github
export const GITHUB_BASE_URL = `${BASE_URL}/github`
export const REPO_SEARCH = `${GITHUB_BASE_URL}/repo`