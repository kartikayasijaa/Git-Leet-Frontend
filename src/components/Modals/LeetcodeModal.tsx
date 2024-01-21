import {
  Button,
  Flex,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateLeetcode } from "../../Redux/userSlice";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SiLeetcode } from "react-icons/si";

const LeetcodeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    user: { leetcode_username },
  } = useAppSelector((s) => s.user);
  const [leetcode, setLeetcode] = useState<string>("");
  const handleConnect = () => {
    if (leetcode.length <= 0) return;
    dispatch(
      updateLeetcode(leetcode, () => {
        onClose();
      })
    );
  };
  return (
    <>
      {leetcode_username ? (
        <Flex alignItems={"center"} gap={2}>
          <Icon as={SiLeetcode} />
          <Link
            target={`_blank`}
            size="lg"
            color={`foreground`}
            href={`https://leetcode.com/${leetcode_username}`}
          >
            <Text fontSize={"larger"}>{leetcode_username}</Text>
          </Link>
        </Flex>
      ) : (
        <>
          <Button onClick={onOpen} leftIcon={<Icon as={SiLeetcode} />} width={'200px'}>
            Connect Leetcode
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            size={{ base: "xs", sm: "sm", md: "xl" }}
          >
            <ModalOverlay />
            <ModalContent padding={3}>
              <ModalHeader>Connect Leetcode</ModalHeader>
              <ModalCloseButton />
              <ModalBody marginTop={3}>
                <Input
                  value={leetcode}
                  onChange={(e) => setLeetcode(e.target.value)}
                  placeholder="Enter your Leetcode username"
                />
              </ModalBody>
              <ModalFooter marginY={5}>
                <Button
                  size={{ base: "sm", sm: "md" }}
                  colorScheme="blue"
                  mr={3}
                  onClick={handleConnect}
                  isLoading={isLoading}
                  loadingText="Connect"
                  spinnerPlacement="end"
                >
                  Connect
                </Button>
                <Button size={{ base: "sm", sm: "md" }} variant="ghost">
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default LeetcodeModal;
