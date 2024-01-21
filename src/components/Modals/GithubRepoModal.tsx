import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Input,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  closeModalCleanup,
  fetchRepoSearch,
  setRepoSearchTerm,
  updateGithubRepo,
} from "../../Redux/repoSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import RepoSearchResult from "../RepoSearchResult";
import RepoBranch from "../RepoBranch";
import { FaGithub } from "react-icons/fa";

const GithubRepoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);
  const dispatch = useAppDispatch();
  const { repoSearchTerm, selectedRepo, selectedBranch } = useAppSelector(
    (s) => s.repo
  );
  const {
    isLoading,
    user: { github_repo, github_username },
  } = useAppSelector((s) => s.user);

  useEffect(() => {
    dispatch(setRepoSearchTerm(debouncedSearch));
  }, [debouncedSearch]);

  useEffect(() => {
    if (repoSearchTerm.length <= 0) return;
    dispatch(fetchRepoSearch());
  }, [repoSearchTerm]);

  const handleConnect = () => {
    dispatch(
      updateGithubRepo(() => {
        onClose();
      })
    );
  };

  return (
    <>
      {github_repo ? (
        <Flex alignItems={"center"} gap={2}>
          <Icon as={FaGithub} />
          <Link
            target={`_blank`}
            size="lg"
            href={`https://github.com/${github_username}/${github_repo}`}
          >
            <Text fontSize={"larger"}>{github_repo}</Text>
          </Link>
        </Flex>
      ) : (
        <>
          <Button onClick={onOpen} leftIcon={<Icon as={FaGithub} />} width={'200px'}>
            Connect Github
          </Button>
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            onCloseComplete={() => {
              setSearch("");
              dispatch(closeModalCleanup());
            }}
          >
            <DrawerOverlay />
            <DrawerContent height={"80vh"}>
              <DrawerHeader>Connect Repository</DrawerHeader>
              <DrawerCloseButton />
              <DrawerBody marginTop={3}>
                {selectedRepo && selectedRepo.id ? (
                  <RepoBranch />
                ) : (
                  <>
                    <Input
                      placeholder="Search Repo"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <RepoSearchResult />
                  </>
                )}
              </DrawerBody>
              <DrawerFooter marginY={5}>
                {selectedBranch && (
                  <Button
                    size={{ base: "sm", sm: "md" }}
                    variant={`solid`}
                    colorScheme="blue"
                    onClick={handleConnect}
                    isLoading={isLoading}
                    loadingText="Connect"
                    spinnerPlacement="end"
                  >
                    Connect
                  </Button>
                )}
                <Button
                  size={{ base: "sm", sm: "md" }}
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};

export default GithubRepoModal;
