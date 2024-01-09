"use client";
import { updateLeetcode } from "@/app/(user)/actions";
import useSession from "@/hooks/useSession";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export type res = {
  message: string;
  leetcode_username: string;
};

export default function LeetcodeModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    accessToken,
    user: { userId, leetcode_username },
    setLeetcode,
  } = useSession();
  const [leetcode, setLeet] = useState("");
  const handleSubmit = async () => {
    try {
      const res = (await updateLeetcode(userId, accessToken, leetcode)) as res;
      if (res.leetcode_username) {
        setLeetcode(res.leetcode_username);
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {leetcode_username.length > 0 ? (
        leetcode_username
      ) : (
        <Button onPress={onOpen}>Connect your Leetcode</Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enter your Leetcode ID
              </ModalHeader>
              <ModalBody>
                <Input
                  name="username"
                  type="text"
                  placeholder="Enter your Leetcode"
                  value={leetcode}
                  onChange={(e) => setLeet(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSubmit}>
                  Connect
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
