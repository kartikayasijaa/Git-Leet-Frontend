import { Button, useToast } from "@chakra-ui/react";
import { pushToGithub } from "../utils/apiCalls";
import { useAppSelector } from "../hooks/useAppSelector";
import { useState } from "react";

const PushButton = () => {
  const toast = useToast();
  const {
    accessToken,
    user: { userId },
  } = useAppSelector((s) => s.user);
  const [loading, setLoading] = useState(false);
  const handlePush = async () => {
    setLoading(true);
    try {
      const res = await pushToGithub({ accessToken, userId });
      toast({
        title: "Pushed to Github",
        description: res.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      if(error instanceof Error){
        toast({
          title: "Failed to Push",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
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
