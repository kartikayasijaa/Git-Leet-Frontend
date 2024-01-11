"use client";
import { updateLeetcode } from "@/app/(user)/actions";
import { SiLeetcode } from "react-icons/si";
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
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export type res = {
  message: string;
  leetcode_username: string;
};

export default function LeetcodeModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const {
    accessToken,
    user: { userId, leetcode_username },
    setLeetcode,
  } = useSession();
  const [leetcode, setLeet] = useState("");
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = (await updateLeetcode(userId, accessToken, leetcode)) as res;
      if (res.leetcode_username) {
        setLeetcode(res.leetcode_username);
        onClose();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {leetcode_username.length > 0 ? (
        <div className="flex items-center">
          <SiLeetcode color={`white`} />{" "}
          <Link
            target={`_blank`}
            size="lg"
            underline="focus"
            color={`foreground`}
            href={`https://leetcode.com/${leetcode_username}`}
            className="ml-2"
          >
            {leetcode_username}
          </Link>
        </div>
      ) : (
        <Button className="w-[200px]" onPress={onOpen}>
          Connect your Leetcode
        </Button>
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
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={loading}
                >
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
