import { PUSH_URL } from "./url";

export const pushToGithub = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  try {
    const res = await fetch(`${PUSH_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const result = await res.json()
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
};
