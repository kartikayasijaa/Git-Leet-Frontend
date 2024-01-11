"use client";
import { pushToGithub } from "@/app/(user)/actions";
import useSession from "@/hooks/useSession";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function PushButton() {
  const {
    accessToken,
    user: { userId, leetcode_username, github_repo },
  } = useSession();
  const [loading, setLoading] = useState(false);
  const push = async () => {
    if (leetcode_username.length <= 0 || github_repo.length <= 0) {
      //add toast
      return;
    }
    try {
      setLoading(true);
      const res = await pushToGithub({ accessToken, userId });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-[120px]"
      variant={`bordered`}
      color={`primary`}
      isLoading={loading}
      onPress={push}
    >
      Push Now
    </Button>
  );
}
