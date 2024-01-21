import { Button } from "@chakra-ui/react";
import { pushToGithub } from "../utils/apiCalls";
import { useAppSelector } from "../hooks/useAppSelector";
import { useState } from "react";

const PushButton = () => {
  const {
    accessToken,
    user: { userId },
  } = useAppSelector((s) => s.user);
  const [loading, setLoading] = useState(false);
  const handlePush = async () => {
    setLoading(true);
    try {
      const res = await pushToGithub({ accessToken, userId });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={"solid"}
        colorScheme="blue"
        size="md"
        width={"200px"}
        onClick={handlePush}
        isLoading={loading}
        loadingText={"Pushing"}
        spinnerPlacement="end"
      >
        Push
      </Button>
    </>
  );
};

export default PushButton;
